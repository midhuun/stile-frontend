import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../context/appContext";
import { getCart } from "../../utils/getItems";
import { useDispatch, useSelector } from "react-redux";
import { setcart } from "../../store/reducers/cartReducer";
import { RootState } from "../../store/store";
import {  BsCashCoin } from "react-icons/bs";
import { Slide, ToastContainer,toast } from "react-toastify";
const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state:RootState)=>state.Cart);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [address,setAddress] = useState({});
  const [pincode,setpincode] = useState<any>(null);
  const [isupdated,setisupdated] = useState(false);
  const [verifyOrder,setVerifyOrder] = useState(false);
  const shippingCharge = paymentMethod === 'cod' ? 100 : 0;
  console.log("Reducer",cart);
  const calculateTotal = () => {
    return cart?.reduce(
      (total: any, item: any) =>
        total + item?.product?.discountedPrice! * item.quantity,
      0
    );
  };
  const { isAuthenticated } = useContext(HeaderContext);
  const total = calculateTotal();
  useEffect(() => {
    getCart().then((data) => dispatch(setcart(data)));
  },[isAuthenticated]);
  const handlePaymentChange = (e:any) => {
    setPaymentMethod(e.target.value);
  };
  function handlePayment(e:any){
    e.preventDefault();
    if(!isupdated){
      toast.warning("Please Enter your address to proceed!!")
      return
    }
    if(paymentMethod === 'cod'){
     setVerifyOrder(true);
     console.log("cooo")
    }
  }
 async function handleOrder(){
    setVerifyOrder(false);
  
    if(!isupdated){
      toast.warn("Please update Address !!!");
      return
    }
    const res = await fetch("http://localhost:3000/user/order",{credentials:'include',method:'POST',headers:{ "Content-Type": "application/json"},body:JSON.stringify({products:cart,totalAmount:total,paymentMethod,address:address,pincode:pincode})});
    const data = await res.json();
    console.log(data);
  }
 function handleAddress(e:any){
   e.preventDefault();
   setisupdated(true);
   toast.success("Address Updated 🎉");
  
 }
  return (
    <div className=" min-h-screen p-4 mt-7 ">
    <ToastContainer position="top-left" autoClose={3000} theme="light" transition={Slide} />
      {verifyOrder && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-[90%] max-w-md mx-auto">
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
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Yes, Confirm Order
        </button>
        <button
          onClick={() => setVerifyOrder(false)}
          className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          No, Cancel
        </button>
      </div>
    </div>
  </div>
)}

      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Address Form Section */}
        <div className="flex-1  p-4 bg-white rounded-lg border-2 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1>
          <form onSubmit={handleAddress} className=" text-sm">
            <label className="px-2 font-semibold">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              onChange={(e:any)=>setAddress((prev)=>({...prev,name:e.target.value}))
              }
              placeholder="Enter your  Name"
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Address<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter your Address"
              onChange={(e:any)=>setAddress((prev)=>({...prev,Location:e.target.value}))}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Apartment No<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Apartment, Suite, etc."
              onChange={(e:any)=>setAddress((prev)=>({...prev,Apartment:e.target.value}))}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
            />
            <label className="px-2 font-semibold">City<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter your City Name"
              onChange={(e:any)=>setAddress((prev)=>({...prev,city:e.target.value}))}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">State <span className="text-red-500">*</span></label>
            <input
              type="text"
              onChange={(e:any)=>setAddress((prev)=>({...prev,city:e.target.value}))}
              placeholder="Enter your State Name"
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Pincode<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Pin Code"
              onChange={(e:any)=>setpincode(e.target.value)}
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
             <label className="px-2 font-semibold">Alternate Mobile</label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full md:my-3 my-2 md:p-3 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              onChange={(e:any)=>setAddress((prev)=>({...prev,alternateMobile:e.target.value}))}
            />
            <div className="flex w-full justify-center">
            <button type="submit" className="px-3 w-full bg-[#070b2a] text-white border  py-2">Update</button>
            </div>
          
          </form>
        </div>

        {/* Cart Summary Section */}
        <div className="flex-1 p-4 order-1 md:order-none bg-white rounded-lg border-2 shadow-md">
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
              <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-white shadow-xl w-full">
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
        
        <div className="space-y-4 mt-3 ">
          <label className={`block p-4 border text-white bg-violet-500 rounded-lg shadow-sm cursor-pointer hover:bg-violet-600 transition duration-150 ease-in-out 
            ${paymentMethod === 'cashfree' ? ' border-violet-700 bg-violet-700' : 'bg-violet-700 border-gray-300'}`}>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="cashfree" 
              checked={paymentMethod === 'Razorpay'} 
              onChange={handlePaymentChange} 
              className="hidden"
            />
            <div className="flex items-center  space-x-3">
              <div className="h-4 w-9 bg-violet-700 text-white flex items-center justify-center ">
             <img src="/cashfree.png" className="h-6 w-full object-contain" alt="" />
              </div>
              <span className="text-sm md:text-lg  font-medium">Cashfree</span>
            </div>
          </label>
          
          <label className={`block p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out 
            ${paymentMethod === 'cod' ? ' border-violet-500' : ' border-gray-300'}`}>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="cod" 
              checked={paymentMethod === 'cod'} 
              onChange={handlePaymentChange} 
              className="hidden"
            />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full">
              <BsCashCoin />
              </div>
              <span className="text-sm md:text-lg font-medium">Cash on Delivery</span>
            </div>
          </label>
        </div>
      </div>

      <hr className="my-4" />
      
      <div className="flex justify-between text-lg font-bold text-gray-900">
        <p>Total</p>
        <p>Rs. {calculateTotal() + shippingCharge}</p>
      </div>
      <div className="mt-4 flex items-center space-x-2 text-green-600 text-sm">
                <span>🔒</span>
                <p>Your payment is secure and encrypted.</p>
              </div>
      <button onClick={handlePayment} className={`mt-6 w-full py-2  bg-[#070b2a] text-white rounded-lg hover:bg-gray-800 transition duration-200`}>
      {paymentMethod === 'cod' ? ' Place Order' : 'Pay Now'}
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
