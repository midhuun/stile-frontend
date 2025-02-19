// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../context/appContext";
import { getCart } from "../../utils/getItems";
import { useDispatch, useSelector } from "react-redux";
import { setcart } from "../../store/reducers/cartReducer";
import { RootState } from "../../store/store"; 
import {  BsCashCoin } from "react-icons/bs";
import {load} from "@cashfreepayments/cashfree-js";
import { Slide, ToastContainer,toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import './cart.css';
const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state:RootState)=>state.Cart);
  const [paymentMethod, setPaymentMethod] = useState('CashFree');
  const [address,setAddress] = useState<any>({});
  const [pincode,setpincode] = useState<any>(null);
  const [isupdated,setisupdated] = useState(false);
  const [verifyOrder,setVerifyOrder] = useState(false);
  const navigate = useNavigate();
  const [email,setmail] = useState("");
  const [sessionId,setsessionId] = useState("");
  const [orderId,setOrderId] = useState("");
  const {user,isAuthenticated} = useContext(HeaderContext);
  const shippingCharge = paymentMethod === 'cod' ? 100 : 0;
  const [paymentStatus,setpaymentStatus] = useState("");
  const [processing,setprocessing] = useState(false);
  const [response,setresponse] = useState(false);
  useEffect(() => {
    getCart().then((data) => dispatch(setcart(data)));
  },[isAuthenticated]);
  let cashfree:any;
  var initializeSDK = async function(){
    cashfree = await load({
      mode:'production',
    })
  };

  initializeSDK();

  const calculateTotal = () => {
    return cart?.reduce(
      (total: any, item: any) =>
        total + item?.product?.discountedPrice! * item.quantity,
      0
    );
  };
  const total = calculateTotal();
async function paymentCheck(orderid:any) {
  const res = await fetch(`https://stile-backend.vercel.app/payment/status/${orderid}`,{method:'POST'});
  const data = await res.json();
  return data;
}
async function verifyPayment(orderId: string) {
  console.log(orderId);
  let pollCount = 0;
  const pollInterval = 5000;
  // Function to poll payment status
  const pollTimeout = setInterval(async () => {
    if (pollCount >= 10) {
      setprocessing(false);
      toast.error("Payment did not Fetch!!.Try again")
      clearInterval(pollTimeout);
      return;
    }
    try {
      const status = await paymentCheck(orderId); // Await inside an async function'
      if(status.length >0){
        setresponse(true);
        setprocessing(false);
        setpaymentStatus(status.message);
        if(status[0].paymentStatus === 'SUCCESS'){
          setTimeout(() => {
            toast.success("Order Successfull ✔️");
          }, 1500);
          // const res = await fetch("https://stile-backend.vercel.app/user/order", {
          //       credentials: 'include',
          //       method: 'POST',
          //       headers: { "Content-Type": "application/json" },
          //       body: JSON.stringify({
          //         products: cart,
          //         totalAmount: total,
          //         paymentMethod,
          //         address,
          //         pincode,
          //         orderId,
          //         email,
          //         alternateMobile:address.alternateMobile
          //       })
          //     });
          //     const data = await res.json(); // Await the response
              navigate(`/checkout/${orderId}`);// Ensure `navigate` is defined
        }
       else if(status[0].paymentStatus === 'FAILED'){
          setTimeout(() => {
            toast.error("Payment Failed. Try again ❌");
            setisupdated(false);
            navigate(`/checkout/${orderId}`);
            // window.location.href ='/payment/status/?&txStatus=FAILED';
          }, 1500);
          
       }
        toast.error("Payment Failed!! Try again");
        navigate(`/checkout/${orderId}`);
        // window.location.href ='/payment/status/?&txStatus=FAILED';
        setisupdated(false)
        clearInterval(pollTimeout);
      }
      setpaymentStatus(status.message); // Assuming setPaymentStatus is a state setter function
      pollCount++;
       
    } catch (error) {
      console.error("Error fetching payment status:", error);

    }
  }, pollInterval);

  // try {
  //   const res = await fetch("https://stile-backend.vercel.app/user/order", {
  //     credentials: 'include',
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       products: cart,
  //       totalAmount: total,
  //       paymentMethod,
  //       address,
  //       pincode,
  //       orderId,
  //       email
  //     })
  //   });
  //   const data = await res.json(); // Await the response
  //   console.log(data);
  //   navigate(`/payment/status/?&txStatus=SUCCESS`); // Ensure `navigate` is defined
  // } catch (error) {
  //   console.error("Error processing order:", error);
  // }
}
  const handlePaymentChange = (e:any) => {
    setPaymentMethod(e.target.value);
  };
  const doPayment = async (token,orderid) => {
    let checkoutOptions = {
      paymentSessionId: token,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions).then(function(result){
      // console.log(result);
      if(result.error){
        console.log(result.error);
      }
      if(result.redirect){
        console.log("redirection")
      }
    });
    verifyPayment(orderid);
  };
  async function handlePayment(e:any){
    e.preventDefault();
    // console.log(user);
    if(!isupdated){
      toast.warning("Please Enter your address to proceed!!")
      return
    }
    if(paymentMethod === 'cod'){
     setVerifyOrder(true);
     return
    }
    setprocessing(true);
    const res = await fetch("https://stile-backend.vercel.app/user/payment",{credentials:'include',method:'POST',headers:{
      "Content-Type": "application/json"},
      body:JSON.stringify({name:address.name,email:email|| "",amount:total,phone:address?.alternateMobile})
    })
    const data = await res.json();
    setOrderId(data.order_id)
    setsessionId(data.token);
    doPayment(data.token,data.order_id);
    await fetch("https://stile-backend.vercel.app/user/order", {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: cart,
        totalAmount: total,
        paymentMethod,
        address,
        pincode,
        orderId:data.order_id,
        email
      })
    });
    await res.json(); // Await the response
    // console.log(orderdata);
  }
 async function handleOrder(){
    setVerifyOrder(false);
  //  console.log(address);
    if(!isupdated){
      toast.warn("Please update Address !!!");
      return
    }
    if(paymentMethod === 'cod'){
    const orderId = `ORDER_${new Date().getTime()}`;
    const res = await fetch("https://stile-backend.vercel.app/user/order",{credentials:'include',method:'POST',headers:{ "Content-Type": "application/json"},body:JSON.stringify({orderId,products:cart,totalAmount:total,paymentMethod,address:address,pincode:pincode,email})});
    const data = await res.json();
    console.log(data);
    navigate(`/checkout/${orderId}`);
    }
    
  }

 function handleAddress(e:any){
   e.preventDefault();
   setisupdated(true);
   toast.success("Address Updated 🎉");
  
 }
  if(cart.length<1){
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
  <img
    src="/cart.png" // Replace with an actual image or an icon
    alt="Empty Cart"
    className="w-20 h-20 md:w-40 md:h-40"
  />
  <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-800">
    Your Cart is Empty
  </h2>
  <p className="mt-2 text-gray-500 text-sm md:text-base">
    Looks like you haven't added anything to your cart yet.
  </p>
  <Link to='/' className="mt-6 px-4 md:px-6 md:py-3 py-2 bg-blue-600 text-white text-sm md:text-base rounded-lg shadow-md hover:bg-blue-700 transition">
    Start Shopping
  </Link>
</div>

    )
  }
  if(processing){
    return(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 flex flex-col items-center space-y-6 animate-fadeIn">
        {/* Loader with Animated Blue Border */}
        <div className="relative flex items-center justify-center h-16 w-16">
          <div className="absolute h-16 w-16  rounded-full"></div>
          <div class="spinner"></div>
        </div>
    
        {/* Processing Message */}
        <p className="text-lg md:text-xl font-semibold text-gray-700 text-center">
          Processing your payment, please wait...
        </p>
    
        {/* Additional Info */}
        <div className="text-center text-sm md:text-base text-gray-500">
          <p>Do not close this window until the process is complete.</p>
          <p>If it takes too long, please check your transaction history.</p>
        </div>
      </div>
    </div>
    
    )
  }
  return (
    <div className=" min-h-screen p-4 mt-7 ">
    <ToastContainer position="top-left" autoClose={3000} theme="light" transition={Slide} />
      {verifyOrder && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white   shadow-lg p-6 sm:p-8 w-[90%] max-w-md mx-auto">
      {/* Modal Header */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center sm:text-left">
        Order Confirmation
      </h2>
      
      {/* Modal Message */}
      <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
        Thank you for shopping with us! We’ll call you shortly to confirm your order. Please ensure your phone is reachable.
      </p>
      
      {/* Action Prompt */}
      <p className="mt-6 font-medium text-gray-700 text-base sm:text-lg text-center sm:text-left">
        Would you like to proceed with this order?
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <button
          onClick={()=>handleOrder()}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white   font-semibold text-sm sm:text-base hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Yes, Confirm Order
        </button>
        <button
          onClick={() => setVerifyOrder(false)}
          className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700   font-semibold text-sm sm:text-base hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          No, Cancel
        </button>
      </div>
    </div>
  </div>
)}

      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Address Form Section */}
        <div className="flex-1  p-4 bg-white   border-2 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1>
          <form autoComplete="on" onSubmit={handleAddress} className=" text-sm">
            <label className="px-2 font-semibold">Full Name <span className="text-red-500">*</span></label>
            <input
              disabled={isupdated}
              type="text"
              onChange={(e:any)=>setAddress((prev:any)=>({...prev,name:e.target.value}))
              }
              placeholder="Enter your  Name"
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
             <label className="px-2 font-semibold">Email</label>
            <input
            disabled={isupdated}
              type="text"
              onChange={(e:any)=>setmail(e.target.value)}
              placeholder="Enter your Email "
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
             
            />
            <label className="px-2 font-semibold">Address<span className="text-red-500">*</span></label>
            <input
             disabled={isupdated}
              type="text"
              autoComplete="street-address"
              placeholder="Enter your Address"
              onChange={(e:any)=>setAddress((prev:any)=>({...prev,location:e.target.value}))}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Apartment No<span className="text-red-500">*</span></label>
            <input
            disabled={isupdated}
              type="text"
              placeholder="Apartment, Suite, etc."
              onChange={(e:any)=>setAddress((prev:any)=>({...prev,Apartment:e.target.value}))}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
            />
            <label className="px-2 font-semibold">City<span className="text-red-500">*</span></label>
            <input
            disabled={isupdated}
              type="text"
              autocomplete="address-level2"
              placeholder="Enter your City Name"
              onChange={(e:any)=>setAddress((prev:any)=>({...prev,city:e.target.value}))}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">State <span className="text-red-500">*</span></label>
            <input
            disabled={isupdated}
              type="text"
              autocomplete="address-level1"
              onChange={(e:any)=>setAddress((prev:any)=>({...prev,city:e.target.value}))}
              placeholder="Enter your State Name"
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Pincode<span className="text-red-500">*</span></label>
            <input
            disabled={isupdated}
              type="text"
              placeholder="Pin Code"
              onChange={(e:any)=>setpincode(e.target.value)}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
             <label className="px-2 font-semibold">Alternate Mobile</label>
            <input
            disabled={isupdated}
              type="text"
              autoComplete="tel"
              placeholder="Mobile Number"
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              onChange={(e:any)=>setAddress((prev:any)=>({...prev,alternateMobile:e.target.value}))}
            />
            <div className="flex w-full justify-center">
            {
               isupdated?<p onClick={()=>setisupdated(false)} className={`px-3 ${isupdated?"block":"hidden"} w-full bg-[#070b2a] text-white border text-center cursor-pointer  py-2`}>Edit Address</p>:<button type="submit" className={`px-3 ${isupdated?"hidden":"block"} w-full bg-[#070b2a] text-white border  py-2`}>Update</button>
            }
         
            </div>
          
          </form>
        </div>

        {/* Cart Summary Section */}
        <div className="flex-1 p-4 order-1 md:order-none bg-white   border-2 shadow-md">
          <h1 className="text-lg md:text-xl  font-semibold border-b pb-2 ">Order Summary</h1>
          {cart.length === 0 ? (
            <p className="text-center text-[12px] md:text-md text-gray-500">
              Your cart is empty. Add some products to proceed!
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pt-2 pb-4"
                  >
                    {/* Product Details */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={item?.product?.images[0]}
                        alt={item?.product?.name}
                        className="w-[60px] h-[60px] object-top object-cover"
                      />
                      <div>
                        <h2 className="md:text-lg text-md font-medium">
                          {item?.product?.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Size: {item?.selectedSize}
                        </p>
                        <p className="text-sm text-gray-700">
                          Rs. {item?.product?.discountedPrice} x {item?.quantity}
                        </p>
                      </div>
                    </div>
                  
                  </div>
                ))}
              </div>

            {/* Order Summary Section */}
<div className="mt-6  bg-white  w-full">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Cost</h2>
  
  <div className="flex justify-between text-sm text-gray-600 mb-3">
    <p>Subtotal</p>
    <p className="font-medium text-gray-800">Rs. {calculateTotal()}</p>
  </div>

  <div className="flex justify-between text-sm text-gray-600 mb-3">
    <p>Shipping</p>
    <p className={`font-medium ${shippingCharge === 0 ? 'text-green-600' : 'text-red-600'}`}>
      {shippingCharge === 0 ? 'Free' : `Rs. ${shippingCharge}`}
    </p>
  </div>

  <div className="mb-6">
  <p className="text-sm font-medium text-gray-700 uppercase">Payment Options</p>

  <div className=" mt-3">
    {/* UPI */}
    <label className={`block p-4 border shadow-sm cursor-pointer transition duration-150 ease-in-out 
      ${paymentMethod === 'upi' ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
      <input 
        type="radio" 
        name="paymentMethod" 
        value="upi" 
        checked={paymentMethod === 'upi'} 
        onChange={handlePaymentChange} 
        className="hidden"
      />
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 border text-white flex items-center justify-center rounded-full">
         <img className="h-6 w-6 object-contain" src="/upi.svg" alt="" />
        </div>
        <span className="text-sm md:text-lg font-medium">UPI</span>
      </div>
    </label>

    {/* Card */}
    <label className={`block p-4 border   shadow-sm cursor-pointer transition duration-150 ease-in-out 
      ${paymentMethod === 'card' ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
      <input 
        type="radio" 
        name="paymentMethod" 
        value="card" 
        checked={paymentMethod === 'card'} 
        onChange={handlePaymentChange} 
        className="hidden"
      />
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 border text-white flex items-center justify-center rounded-full">
        <img className="h-6 w-6 object-contain" src="/card.png" alt="" />
        </div>
        <span className="text-sm md:text-lg font-medium">Credit / Debit Card</span>
      </div>
    </label>

    {/* Net Banking */}
    <label className={`block p-4 border   shadow-sm cursor-pointer transition duration-150 ease-in-out 
      ${paymentMethod === 'netbanking' ? 'border border-blue-700 bg-blue-100' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
      <input 
        type="radio" 
        name="paymentMethod" 
        value="netbanking" 
        checked={paymentMethod === 'netbanking'} 
        onChange={handlePaymentChange} 
        className="hidden"
      />
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 border text-white flex items-center justify-center rounded-full">
        <img className="h-6 w-6 object-contain" src="/net.png" alt="" />
        </div>
        <span className="text-sm md:text-lg font-medium">Net Banking</span>
      </div>
    </label>
    <label className={`block p-4 border   shadow-sm cursor-pointer transition duration-150 ease-in-out 
      ${paymentMethod === 'cod' ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
      <input 
        type="radio" 
        name="paymentMethod" 
        value="cod" 
        checked={paymentMethod === 'cod'} 
        onChange={handlePaymentChange} 
        className="hidden"
      />
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 border text-white flex items-center justify-center rounded-full">
        <img className="h-6 w-6 object-contain" src="/cash.png" alt="" />
        </div>
        <span className="text-sm md:text-lg font-medium">Cash on Delivery</span>
      </div>
    </label>
  </div>
</div>

  <hr className="my-4 border-gray-300" />
  
  <div className="flex justify-between text-lg font-bold text-gray-900">
    <p>Total</p>
    <p>Rs. {calculateTotal() + shippingCharge}</p>
  </div>

  <div className="mt-4 flex items-center space-x-2 text-green-600 text-sm">
    <span role="img" aria-label="secure">🔒</span>
    <p>Your payment is secure and encrypted.</p>
  </div>

  <button onClick={handlePayment} className={`mt-6 w-full py-2 bg-[#070b2a] text-white   hover:bg-gray-800 transition duration-200`}>
    {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
  </button>

  <p className="text-sm text-gray-500 mt-2">
    <strong>Note:</strong> Cash on Delivery orders may incur additional charges.
  </p>
</div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
