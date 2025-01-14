import { useContext, useEffect } from "react";
import { HeaderContext } from "../../context/appContext";
import { getCart } from "../../utils/getItems";

const CartPage = () => {
  const calculateTotal = () => {
    return cart?.reduce(
      (total: any, item: any) =>
        total + item?.product?.discountedPrice! * item.quantity,
      0
    );
  };

  const { cart, setcart } = useContext<any>(HeaderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCart().then((data) => setcart(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Address Form Section */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
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

            <p className="text-sm text-gray-500 mt-2">
              <strong>Note:</strong> Cash on Delivery orders may incur additional charges.
            </p>
          </form>
        </div>

        {/* Cart Summary Section */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
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
                    className="flex justify-between items-center border-b pb-4"
                  >
                    {/* Product Details */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={item?.product?.images[0]}
                        alt={item?.product?.name}
                        className="w-[60px] h-[60px] object-cover rounded-md"
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
              <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm">
                  <p>Subtotal</p>
                  <p>Rs. {calculateTotal()}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-4">
                  <p>Total</p>
                  <p>Rs. {calculateTotal()}</p>
                </div>
              </div>

              {/* Secure Checkout Section */}
              <div className="mt-4 flex items-center space-x-2 text-green-600 text-sm">
                <span>🔒</span>
                <p>Your payment is secure and encrypted.</p>
              </div>

              <button className="w-full mt-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
                Proceed to Buy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
