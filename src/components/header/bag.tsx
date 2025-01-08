import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { HeaderContext } from "../../context/appContext";
import { addtoCart, deleteFromCart, removeFromCart } from "../../store/reducers/cartReducer";

const Bag = () => {
  const cart = useSelector((state: RootState) => state.Cart || []);
  const dispatch = useDispatch();
  const { iscartOpen, setiscartOpen } = useContext(HeaderContext);
  
  return (
    <div
      className={`!top-0 right-0 min-h-screen w-full fixed duration-200 sm:w-[350px] bg-white z-[500] overflow-y-auto shadow-lg rounded-lg ${
        iscartOpen ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      {cart.length > 0 ? (
        <div className="px-4 relative mt-5 max-h-[calc(100vh-160px)] mb-5 border-b border-gray-300 overflow-y-scroll">
          <TfiClose onClick={() => setiscartOpen(false)} size={18} className="absolute cursor-pointer text-md md:text-2xl right-4 top-4" />
          <h2 className="text-2xl mt-2 font-bold text-gray-900">Your Bag</h2>
          <div className="flex mt-5 text-gray-500 uppercase justify-between w-full text-[10px]">
            <p>Product</p>
            <p>Total</p>
          </div>
          <hr />
          <div className="space-y-4 mt-5">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg shadow-sm">
                <div className="flex w-2/3 gap-4">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-[70px] h-[100px] md:w-[100px] md:h-[150px] border rounded-md object-cover" 
                  />
                  <div className="desc w-full flex flex-col justify-between h-full text-gray-700 text-sm">
                    <div>
                      <h1 className="text-sm md:text-md font-semibold hover:underline">{item.name.slice(0, 15)}{item.name.length > 15 && "..."}</h1>
                      <p className="text-gray-700 text-sm md:text-md font-light">Rs.{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex w-full items-center justify-between mt-2">
                      <div className="flex w-[90px] justify-between items-center gap-2 border border-gray-600  rounded-full py-1 px-2 md:py-[6px]  shadow-md">
                        <button onClick={() => dispatch(removeFromCart(item))} className="text-gray-600 flex  hover:text-gray-800 transition duration-200">−</button>
                        <p className="text-gray-800 font-semibold">{item.quantity}</p>
                        <button onClick={() => dispatch(addtoCart(item))} className="text-gray-600 hover:text-gray-800 transition duration-200">+</button>
                      </div>
                      <button onClick={() => dispatch(deleteFromCart(item))} className="mx-3 text-lg  transition duration-200"><RiDeleteBinLine /></button>
                    </div>
                  </div>
                </div>
                <div className=" text-sm  md:text-md">Rs.{(item.quantity * item.price).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-5 px-4 relative">
          <TfiClose onClick={() => setiscartOpen(false)} size={16} className="absolute cursor-pointer right-4 top-1" />
          <h2 className="text-lg md:text-xl font-light text-gray-900">Your Bag</h2>
          <hr />
          <div className="space-y-10 flex flex-col items-center justify-center">
            <p>Oops....Your Cart is Empty</p>
            <Link to='/'>
              <button className="p-3 w-full font-light text-xs border bg-black text-white rounded-lg transition duration-200 hover:bg-gray-800">Shop Now</button>
            </Link>
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div className={`fixed h-[130px]  text-gray-500 bottom-2 w-full bg-white shadow-lg rounded-lg p-3`}>
          <hr />
          <div className="flex pt-2 justify-between text-black">
            <p className="py-1">Subtotal</p>
            {/* Calculate subtotal dynamically */}
            <p>Rs.{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>
          <p className="text-[12px] md:text-sm py-2">Tax included. Shipping calculated at checkout.</p>
          <Link to='/checkout'>
            <button onClick={() => setiscartOpen(false)} className="bg-black text-white w-full m-auto py-2 rounded-lg transition duration-200 hover:bg-gray-800">Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bag;
