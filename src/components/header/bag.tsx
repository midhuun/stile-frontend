import { useContext, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { HeaderContext } from '../../context/appContext';
import { getCart } from '../../utils/getItems';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addtoCart,
  deleteFromCart,
  removeFromCart,
  setcart,
} from '../../store/reducers/cartReducer';
const Bag = () => {
  const { iscartOpen, setiscartOpen, setisUserOpen, isAuthenticated } = useContext(HeaderContext);
  const cart = useSelector((state: RootState) => state.Cart);
  const dispatch = useDispatch();
  async function fetchCart() {
    const cartItems = await getCart();
    // console.log("csrt",cartItems);
    dispatch(setcart(cartItems));
  }
  useEffect(() => {
    // console.log("Bag mounted");
    fetchCart();
  }, [dispatch]);
  function handlelogin() {
    setisUserOpen(true);
    setiscartOpen(false);
  }
  const handleCart = async (value: any) => {
    // console.log(value.item)
    if (value.value === 'addToCart') {
      dispatch(addtoCart({ ...value.item, selectedSize: value.size }));
    }
    if (value.value === 'removeFromCart') {
      dispatch(removeFromCart({ ...value.item, selectedSize: value.size }));
    }
    if (value.value === 'deleteFromCart') {
      dispatch(deleteFromCart({ ...value.item, selectedSize: value.size }));
    }
    const token = localStorage.getItem('token');
    const res = await fetch(`https://stile-backend-rvmk.vercel.app/user/${value.value}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Send token in header
      },
      body: JSON.stringify({ productdata: value.item, selectedSize: value.size }),
    });
    const data: any = await res.json();
    console.log(data);
  };
  return (
    <>
      <div
        className={`!top-0 right-0 min-h-screen w-full fixed duration-200 sm:w-[380px] bg-white z-[998] overflow-y-auto shadow-lg rounded-lg ${
          iscartOpen ? 'translate-x-0' : 'translate-x-[100%]'
        }`}
      >
        {cart && cart?.length > 0 ? (
          <div className="px-4 relative mt-2 md:mt-5 max-h-[calc(100vh-160px)] mb-5 border-b border-gray-300 overflow-y-scroll">
            <TfiClose
              onClick={() => setiscartOpen(false)}
              size={18}
              className="absolute cursor-pointer text-md md:text-2xl right-4 top-4"
            />
            <h2 className="text-xl md:text-2xl mt-2 font-light upper text-gray-900">Your Bag</h2>
            <div className="flex mt-5 text-gray-500 uppercase justify-between w-full text-[10px]">
              <p>Product</p>
              <p>Total</p>
            </div>
            <hr />
            <div className="space-y-4 mt-5">
              {cart.length > 0 &&
                cart?.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-start bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex w-2/3 gap-4">
                      <img
                        src={item?.product?.images[0]}
                        alt={item?.product?.name}
                        className="w-[70px] h-[100px] md:w-[100px] md:h-[150px] border rounded-md object-cover"
                      />

                      <div className="desc w-full flex flex-col justify-between h-full text-gray-700 text-sm">
                        <div>
                          <Link to={`/product/${item.product.slug}`}>
                            <h1 className="text-sm md:text-md font-semibold hover:underline">
                              {item?.product?.name.slice(0, 15)}
                              {item?.product?.name?.length > 15 && '...'}
                            </h1>
                          </Link>
                          <p className="text-gray-700 text-sm md:text-md font-light">
                            Rs.{item?.product?.price?.toFixed(2)}
                          </p>
                          <div className="flex gap-3 p-1">
                            <p className="text-gray-700 text-sm md:text-md font-semibold">Size</p>
                            <p className="text-gray-700 text-sm md:text-md font-light ">
                              {item?.selectedSize}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-between mt-2">
                          <div className="flex w-[90px] justify-between items-center gap-2 border border-gray-600  rounded-full py-1 px-2 md:py-[6px]  shadow-md">
                            <button
                              onClick={() =>
                                handleCart({
                                  value: 'removeFromCart',
                                  item: item?.product,
                                  size: item?.selectedSize,
                                })
                              }
                              className="text-gray-600 flex  hover:text-gray-800 transition px-2 duration-200"
                            >
                              −
                            </button>
                            <p className="text-gray-800 font-semibold">{item?.quantity}</p>
                            <button
                              onClick={() =>
                                handleCart({
                                  value: 'addToCart',
                                  item: item?.product,
                                  size: item?.selectedSize,
                                })
                              }
                              className="text-gray-600 px-2 hover:text-gray-800 transition duration-200"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              handleCart({
                                value: 'deleteFromCart',
                                item: item?.product,
                                size: item?.selectedSize,
                              })
                            }
                            className="mx-3 text-lg  transition duration-200"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className=" text-sm  md:text-md">
                      Rs.{(item?.quantity * item?.product?.price).toFixed(2)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 px-4 relative">
            <TfiClose
              onClick={() => setiscartOpen(false)}
              size={16}
              className="absolute cursor-pointer right-4 top-1"
            />
            <h2 className="text-lg md:text-xl font-light text-gray-900">Your Bag</h2>
            <hr />
            <div className="space-y-10 flex flex-col items-center justify-center">
              <p>
                {!isAuthenticated ? 'Please Login to view your Bag' : 'Oops....Your Bag is Empty'}
              </p>
              {isAuthenticated ? (
                <Link to="/">
                  <button className="p-3 w-full font-light text-xs border bg-black text-white rounded-lg transition duration-200 hover:bg-gray-800">
                    Shop Now
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handlelogin}
                  className="p-3 w-[50%] font-light text-xs border bg-blue-600 text-white rounded-sm transition duration-200 hover:bg-gray-800"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
        {cart && cart?.length > 0 && (
          <div
            className={`fixed h-[130px]  text-gray-500 bottom-3 w-full bg-white shadow-lg rounded-lg px-3`}
          >
            <hr />
            <div className="flex pt-2 justify-between text-black">
              <p className="py-1">Subtotal</p>
              {/* Calculate subtotal dynamically */}
              <p>
                Rs.
                {cart
                  .reduce(
                    (total: any, item: any) => total + item?.product?.price * item?.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <p className="text-[12px] md:text-sm py-2">
              Tax included. Shipping calculated at checkout.
            </p>
            <Link to="/checkout">
              <button
                onClick={() => setiscartOpen(false)}
                className="bg-black mx-3 z-[999]  text-white w-[90%] transform  py-2 rounded-lg transition duration-200 hover:bg-gray-800"
              >
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
      {cart && iscartOpen && cart?.length > 0 && (
        <Link to="/checkout">
          <button
            onClick={() => setiscartOpen(false)}
            className="bg-black md:hidden z-[999] fixed bottom-1 left-1/2 -translate-x-1/2 text-white w-[90%] transform  py-2 rounded-lg transition duration-200 hover:bg-gray-800"
          >
            Checkout
          </button>
        </Link>
      )}
    </>
  );
};

export default Bag;
