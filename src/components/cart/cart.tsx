import { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../context/appContext";
import { getCart } from "../../utils/getItems";
import { useDispatch, useSelector } from "react-redux";
import { setcart } from "../../store/reducers/cartReducer";
import { RootState } from "../../store/store";
import { SiRazorpay } from "react-icons/si";
import {  BsCashCoin } from "react-icons/bs";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state:RootState)=>state.Cart);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
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
 
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("login page mounted")
   if(isAuthenticated){
    getCart().then((data) => dispatch(setcart(data)));
   }
  },[isAuthenticated]);
  const handlePaymentChange = (e:any) => {
    setPaymentMethod(e.target.value);
  };
  function handlePayment(e:any){
    e.preventDefault();
    if(paymentMethod === 'cod'){
     setVerifyOrder(true);
     console.log("cooo")
    }
  }
  return (
    <div className=" min-h-screen p-4">
      
      {verifyOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Order</h2>
            <p className="text-gray-700">You will receive a call shortly to confirm your order. </p>
            <p className=" pt-5 font-semibold">Confirm Order?</p>
            <div className="flex justify-between mt-4">
            <button
                onClick={()=>setVerifyOrder(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={()=>setVerifyOrder(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-lg text-center font-bold pb-4 md:text-2xl uppercase">Checkout</h1>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Address Form Section */}
        <div className="flex-1 p-4 bg-white rounded-lg border-2 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1>
          <form className=" text-sm">
            <label className="px-2 font-semibold">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter your  Name"
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Address<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter your Address"
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Apartment No<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Apartment, Suite, etc."
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
            />
            <label className="px-2 font-semibold">City<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter your City Name"
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">State <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter your State Name"
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
            <label className="px-2 font-semibold">Pincode<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Pin Code"
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
              required
            />
             <label className="px-2 font-semibold">Alternate Mobile</label>
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full my-3 p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
            />
          </form>
        </div>

        {/* Cart Summary Section */}
        <div className="flex-1 p-4 bg-white rounded-lg border-2 shadow-md">
          <h1 className="text-xl  font-semibold border-b pb-2 uppercase">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">
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
                        className="w-[60px] h-[60px] object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-medium">
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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
      
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
          <label className={`block p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out 
            ${paymentMethod === 'razorpay' ? ' border-blue-500' : 'bg-white border-gray-300'}`}>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="razorpay" 
              checked={paymentMethod === 'razorpay'} 
              onChange={handlePaymentChange} 
              className="hidden"
            />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
              <SiRazorpay />
              </div>
              <span className="text-sm md:text-lg  font-medium">Razorpay</span>
            </div>
          </label>
          
          <label className={`block p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out 
            ${paymentMethod === 'cod' ? ' border-blue-500' : ' border-gray-300'}`}>
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
      <button onClick={handlePayment} className={`mt-6 w-full py-2  bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200`}>
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
