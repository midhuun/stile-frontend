import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../types/CategoryType";
import { IoCloseSharp } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { addtoCart,removeFromCart,deleteFromCart } from "../../store/reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import { HeaderContext } from "../../context/appContext";
import Suggestion from "./suggestion";
const ProductPage = () => {
    const cart = useSelector((state:RootState)=>state.Cart);
    const dispatch = useDispatch();
  const params: any = useParams();
  const { product } = params;
  const [productdata, setproductdata] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const {setiscartOpen,iscartOpen} = useContext(HeaderContext);
  const [activeSize, setActiveSize] = useState<string>("M");
  const [active, setActive] = useState<number>(0);
  const [chartOpen, setchartOpen] = useState<Boolean>(false);
  const [dropdowns, setDropdowns] = useState<any>({
    description: false,
    shipping: false,
    manufacturer: false,
  });
  const toggleDropdown = (key: string) => {
    setDropdowns((prev:any) => ({ ...prev, [key]: !prev[key] }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      try {
        const response = await fetch(`https://stile-backend.vercel.app/product/${product}`);
        const data = await response.json();
        setproductdata(data[0]);
        console.log(data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);
  console.log(productdata)
  function handleChangeImage(data: string) {
    if (data === "prev") {
      if (active === 0) return;
      setActive(active - 1);
    }
    if (data === "next") {
      if (active === (productdata?.images && productdata?.images.length - 1)) {
        return;
      }
      setActive((prev) => prev + 1);
    }
  }
   function addClick(){
    setiscartOpen(true);
    dispatch(addtoCart(productdata))
   }
  function handleThumbnailClick(index: number) {
    setActive(index);
  }

  return (
    <>
    <div className="w-full p-3 flex justify-center">
      <div className="flex flex-col md:flex-row justify-center md:justify-start md:gap-10  md:pt-10">
        {/* Left Side - Thumbnails and Main Image */}
        <div className="w-full md:w-[50%] flex flex-col">
          <div className="hidden md:flex md:gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-1/5">
              {productdata?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-3/4 h-auto cursor-pointer border ${
                    active === index ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="w-4/5">
              <img
                className="w-full h-[90vh] object-cover border"
                src={productdata?.images?.[active]}
                alt="Main Product"
              />
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden h-[70vh] flex overflow-hidden relative">
            <img
              className="w-full h-full object-cover transition-transform duration-500"
              src={productdata?.images?.[active]}
              alt="Mobile Product View"
            />
            <button
              onClick={() => handleChangeImage("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg"
            >
              <GrFormPrevious />
            </button>
            <button
              onClick={() => handleChangeImage("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg"
            >
              <GrFormNext />
            </button>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-4 p-2 md:w-[50%]">
          <h1 className="text-md md:text-4xl">{productdata?.name}</h1>
          <h2 className="text-md md:text-xl font-light">Rs. {productdata?.price}.00</h2>
          <p className="text-gray-600 text-xs md:text-sm">
            Tax included. Shipping calculated at checkout.
          </p>

          {/* Size Selection */}
          <div>
            <p className="text-sm md:text-md font-medium">Select Size:</p>
            <div className="flex gap-3 mt-2">
              {["S", "M", "L", "XL"].map((size) => (
                <div
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`cursor-pointer text-xs md:text-md px-2 py-1 md:px-4 md:py-2 border ${
                    activeSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-500"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <p className="text-sm md:text-md font-medium">Quantity:</p>
            <div className="flex items-center mt-2 border w-[120px]">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                }
                className="md:px-3 px-2 py-1 md:py-2 hover:bg-gray-200"
              >
                -
              </button>
              <p className="flex-1 text-center">{quantity}</p>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="md:px-3 px-2 py-1 md:py-2 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Link to='/checkout' className="w-full text-sm md:text-md py-3 bg-black text-center text-white rounded-md hover:opacity-90">
              Buy Now
            </Link>
            <button onClick={()=>addClick()} className="w-full text-sm md:text-md py-3 border border-gray-500 rounded-md hover:border-black">
              Add to Cart
            </button>
          </div>

          {/* Size Chart */}
          <div>
            <button
              onClick={() => setchartOpen(true)}
              className="flex items-center gap-2"
            >
              <img src='/size.png' className="w-8 h-8" alt="Size Chart Icon" />
              <p className="text-sm">Size Chart</p>
            </button>
            {chartOpen && (
              <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white  rounded-lg p-6 relative">
                  <button
                    onClick={() => setchartOpen(false)}
                    className="absolute top-3 right-3"
                  >
                    <IoCloseSharp className="text-2xl" />
                  </button>
                  <div className="flex w-full justify-center items-center">
                  <img src={productdata?.subcategory.sizeurl} className=" object-contain w-full  h-[60vh]" alt="Size Chart Icon" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex w-full border border-gray-300 divide-x divide-gray-300 bg-white shadow-lg rounded-lg">
  {/** First Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
    <BsFillCartCheckFill className="text-blue-500 text-2xl md:text-3xl animate-bounce" />
    <p className="text-gray-600 text-sm md:text-base font-medium">Day of Order</p>
  </div>

  {/** Second Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
    <FaTruck className="text-green-500 text-2xl md:text-3xl animate-pulse" />
    <p className="text-gray-600 text-sm md:text-base font-medium">Order Ready</p>
  </div>

  {/** Third Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
    <FaLocationDot className="text-red-500 text-2xl md:text-3xl animate-pulse" />
    <p className="text-gray-600 text-sm md:text-base font-medium">
      Delivered in 7-10 days
    </p>
  </div>
</div>

          {/* Dropdowns */}
          <div className="border m-2">
            {[
              { key: "description", label: "Description" },
              { key: "shipping", label: "Shipping Information" },
              { key: "manufacturer", label: "Manufactured By" },
            ].map(({ key, label }) => (
              <div key={key} className="border-b p-3">
                <div
                  onClick={() => toggleDropdown(key)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <p className="font-medium">{label}</p>
                  <p >{dropdowns[key] ? "-" : "+"}</p>
                </div>
                {dropdowns[key] && (
                  <div className="mt-2 text-sm text-gray-600">
                    {key === "description" &&
                      productdata?.description &&
                     <p className="p-2 "> {productdata.description} </p>}
                    {key === "shipping" && (
                      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                      {/* Shipping Section */}
                      <h2 className="font-bold text-base md:text-lg mb-2">SHIPPING</h2>
                      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
                        <li>Free shipping on all prepaid orders.</li>
                        <li>A handling fee of Rs. 100 is charged for COD orders.</li>
                        <li>Products are shipped from our warehouse within 2 to 3 working days.</li>
                        <li>You will receive a tracking number once your order has been shipped.</li>
                      </ul>
                    
                      {/* Returns & Exchange Section */}
                      <h2 className="font-bold text-base md:text-lg mt-4 mb-2">RETURNS & EXCHANGE</h2>
                      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
                        <li>7 days return policy.</li>
                        <li>No return on Boxers, Trunks, All Accessories & Flat store items (for hygiene reasons).</li>
                        <li>Returns need to be initiated through The Stile Sagio Application.</li>
                        <li>Products returned must be unused, unworn, and have original tags intact.</li>
                        <li>Shipping charges are non-refundable.</li>
                        <li>For multi-item orders, only one return request is applicable.</li>
                        <li>
                          COD payments will receive store credit equal to the paid amount, redeemable anytime.
                        </li>
                        <li>
                          For prepaid orders, refunds will be initiated to the original payment source after inspection (5-7 business days for processing).
                        </li>
                        <li>A nominal fee of INR 100 is charged for return or exchange pickup requests.</li>
                        <li>
                          Exchanges allowed within the specified timeframe for eligible products. Price difference, if any, must be paid.
                        </li>
                      </ul>
                    </div>
                    
                    )}
                    {key === "manufacturer" && (
                      <p className="py-2">Manufactured by Stile Sagio</p>
                    
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


    {/* You May Also Like */}
    <Suggestion subid={productdata?.subcategory} id={productdata?._id} />
    </>
  );
};

export default ProductPage;
