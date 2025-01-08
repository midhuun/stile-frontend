import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addtoCart, deleteFromCart } from "../../store/reducers/cartReducer";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.Cart || []);
  const dispatch = useDispatch();
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.discountedPrice! * item.quantity, 0);
  };

  return (
    <div className=" flex justify-center items-center">
    <div className=" p-4 flex w-full md:w-[80%]  flex-col justify-center md:flex-row">
      {/* Address Form Section */}
      <div className="md:w-1/2 p-4">
        <h1 className="text-2xl font-semibold mb-6">Shipping Address</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Apartment, Suite, etc."
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Pin Code"
            className="w-full p-2 border rounded-md"
            required
          />
          
          {/* Shipping Method Dropdown */}
          <select className="w-full p-2 border rounded-md" required>
            <option value="">Select Shipping Method</option>
            <option value="razorpay">Razorpay</option>
            <option value="cod">Cash on Delivery</option>
          </select>

          {/* Cash on Delivery Description */}
          <p className="text-sm text-gray-600 mt-2">
            Cash on Delivery orders will be confirmed after the order. Extra charges will be applicable.
          </p>
        </form>
      </div>

      {/* Cart Summary Section */}
      <div className="md:w-1/2 p-4 bg-[#f2f1f1]">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add some products to proceed!</p>
        ) : (
          <>
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4"
              >
                {/* Product Details */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-[70px] h-[70px] object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm">
                      Price: Rs. {item.discountedPrice} x {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => dispatch(deleteFromCart(item))}
                    className="px-3 py-1 border rounded-md hover:bg-gray-200"
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => dispatch(addtoCart(item))}
                    className="px-3 py-1 border rounded-md hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Summary Section */}
            <div className="mt-6 p-4 border rounded-lg shadow-sm">
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
              <button className="w-full mt-4 py-3 bg-black text-white rounded-md hover:opacity-90">
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default CartPage;
