import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../types/CategoryType";
import { IoCloseSharp, IoHeartSharp } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { HeaderContext } from "../../context/appContext";
import Suggestion from "./suggestion";
import { getCart, getFavourites } from "../../utils/getItems";
import Loading from "../loading/loading";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store/store";
import { addtoCart, deleteFromCart, removeFromCart, setcart } from "../../store/reducers/cartReducer";
const ProductPage = () => {
  const params: any = useParams();
  const { product } = params;
  const [productdata, setproductdata] = useState<Product | null>(null);
  const [isimageLoading, setisImageLoading] = useState(true);
  const cart = useSelector((state:RootState)=>state.Cart);
  const {setiscartOpen,setisFavouriteOpen,setFavourites,isAuthenticated,setisUserOpen} = useContext<any>(HeaderContext);
  const dispatch = useDispatch<any>();
  const [activeSize, setActiveSize] = useState<string>("M");
  const [active, setActive] = useState<number>(0);
  const [chartOpen, setchartOpen] = useState<Boolean>(false);
  const [isLoading,setisLoading] = useState<Boolean>(false);
  const [dropdowns, setDropdowns] = useState<any>({
    description: false,
    shipping: false,
    manufacturer: false,
  });
  const [startX, setStartX] = useState(0);

function handleTouchStart(event: React.TouchEvent) {
  setStartX(event.touches[0].clientX);
}

function handleTouchMove(event: React.TouchEvent) {
  const endX = event.touches[0].clientX;
  const difference = startX - endX;

  if (difference > 100) {
    handleChangeImage("next");
    setStartX(0); 
  } else if (difference < -100) {
    handleChangeImage("prev");
    setStartX(0); 
  }
} console.log("product",productdata)
   const isProduct = productdata && cart.length>0  && cart?.find((cartItem:any)=>cartItem.product._id === productdata._id && cartItem.selectedSize === activeSize);
  const addToFavorite = async() => {
    if(!isAuthenticated){
       setisUserOpen(true)
       return
    }
    const res= await fetch(`https://stile-backend-gnqp.vercel.app/user/addtoFavourites`,{
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:productdata?._id})
      });
    const data = await res.json();
    const favouriteItems = await getFavourites();
    setFavourites(favouriteItems);
    console.log(data);
    setisFavouriteOpen(true);
  }
  const handleCart = async(value:any) => {
    if(!isAuthenticated){
      setisUserOpen(true)
      return
   }
   if(value === 'addToCart'){
           dispatch(addtoCart({...productdata,selectedSize:activeSize}))
      }
      if(value === 'removeFromCart'){
        console.log("cartvalue",value.item);
         dispatch(removeFromCart({...productdata,selectedSize:activeSize}))
      }
      if(value === 'deleteFromCart'){
        console.log("cartvalue",value.item);
        dispatch(deleteFromCart({...productdata,selectedSize:activeSize}))
      }
    const res= await fetch(`https://stile-backend-gnqp.vercel.app/user/${value}`,{
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({productdata,selectedSize:activeSize})
    })
    const data = await res.json();
    console.log(data);
      setiscartOpen(true);
  }
  
  const toggleDropdown = (key: string) => {
    setDropdowns((prev:any) => ({ ...prev, [key]: !prev[key] }));
  };
  const getProduct = async () => {
    try {
      const response = await fetch(`https://stile-backend.vercel.app/product/${product}`);
      const data = await response.json();
      console.log(data);
      setproductdata(data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
     setisLoading(true);
     getProduct();
     setisLoading(false);
    getCart().then((data) => dispatch(setcart(data))).catch((err) => console.log(err));
     console.log("Redux cart state:", store.getState().Cart);
  }, [dispatch]);
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
  //  function addClick(){
  //   setiscartOpen(true);
  //   dispatch(addtoCart(productdata))
  //  }
  function handleThumbnailClick(index: number) {
    setActive(index);
  }
  console.log("cart",cart);
  return (
    <>
    {isLoading && <Loading />}
    <div className="w-full p-3 flex justify-center">
      <div className="flex flex-col md:flex-row justify-center md:justify-start md:gap-10  md:pt-10">
        {/* Left Side - Thumbnails and Main Image */}
        <div className="w-full md:w-[50%] flex flex-col">
          <div className="hidden md:flex md:gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-1/5">
              {productdata?.images?.map((image:any, index:any) => (
                <img
                  loading="lazy"
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
            <div className="w-4/5 relative">
            <IoHeartSharp onClick={()=>addToFavorite()} className="absolute cursor-pointer top-4 right-4 text-red-500" size={26} />
              <img
                className="w-full h-[90vh] object-top object-cover border"
                src={productdata?.images?.[active]}
                alt="Main Product"
              />
            </div>
          </div>

          {/* Mobile Carousel */}
          <div
  className="md:hidden h-[70vh] flex overflow-hidden relative"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
>
{isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
      )}
  <img
    className="w-full h-full object-cover object-top transition-transform duration-500"
    src={productdata?.images?.[active]}
    loading="lazy"
    onLoad={()=>setisImageLoading(false)}
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
              {productdata?.sizes?.map((size:any) => (
                <div
                  key={size?._id}
                  onClick={() => setActiveSize(size.size)}
                  className={`cursor-pointer uppercase text-semibold text-xs md:text-md px-2 py-1 md:px-4 md:py-2 border ${
                    activeSize === size.size
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-500"
                  }`}
                >
                  {size.size}
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
                 handleCart('removeFromCart')
                }
                className="md:px-3 px-2 py-1 md:py-2 hover:bg-gray-200"
              >
                -
              </button>
              <p className="flex-1 text-center">{isProduct && isProduct.quantity || 1}</p>
              <button
                onClick={() => handleCart('addToCart')}
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
            <button onClick={()=>handleCart('addToCart')} className="w-full text-sm md:text-md py-3 border border-gray-500 rounded-md hover:border-black">
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
                  <img src={productdata?.subcategory.sizeurl} className="min-w-[300px]  h-[60vh]" alt="Size Chart Icon" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex w-full border border-gray-300 divide-x divide-gray-300 bg-white shadow-lg rounded-lg">
  {/** First Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
    <BsFillCartCheckFill className="text-blue-500 text-lg md:text-3xl " />
    <p className="text-gray-600 text-xs md:text-base font-medium">Day of Order</p>
  </div>

  {/** Second Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
    <FaTruck className="text-green-500 text-lg md:text-3xl animate-pulse" />
    <p className="text-gray-600 text-xs md:text-base font-medium">Order Ready</p>
  </div>

  {/** Third Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
    <FaLocationDot className="text-red-500 text-lg md:text-3xl animate-pulse" />
    <p className="text-gray-600 text-xs md:text-base font-medium">
      Delivered soon
    </p>
  </div>
</div>

          {/* Dropdowns */}
          <div className="border m-2">
            {[
              { key: "description", label: "Description" },
              { key: "shipping", label: "Shipping Information" },
              { key: "manufacturer", label: "Manufactured By" },
            ].map(({ key, label }:any) => (
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
                        <li>Products are shipped from our warehouse within few working days.</li>
                        <li>You will receive a tracking number once your order has been shipped.</li>
                      </ul>
                    
                      {/* Returns & Exchange Section */}
                      <h2 className="font-bold text-base md:text-lg mt-4 mb-2">RETURNS, CANCELLATION & EXCHANGE POLICY</h2>
<p className="text-xs md:text-sm mb-4">
  At The Stile Sagio, our focus is on complete customer satisfaction. If you are displeased with our services, we offer an exchange, provided the reasons are genuine and verified after investigation. Please carefully review the details of each product before making a purchase, as it contains all the necessary information about the items or services you are ordering.
</p>

<h3 className="font-semibold text-sm md:text-base mb-2">Cancellation / Refund Policy</h3>
<ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
  <li>We do not accept cancellations or refunds, as we start manufacturing and dispatching orders immediately after they are placed.</li>
</ul>

<h3 className="font-semibold text-sm md:text-base mt-4 mb-2">Exchange Policy</h3>
<ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
  <li>We strive to provide the best quality goods to our customers.</li>
  <li>Ensure you select the correct size using the size guide before placing an order. Exchanges/returns for incorrect sizes ordered by customers will not be entertained.</li>
  <li>If you receive an incorrect or damaged product, we offer an exchange.</li>
  <li>Exchange requests must be initiated within 48 hours of product delivery. Requests submitted later will not be eligible for exchange.</li>
  <li>Refunds for credit card payments will be issued to the original card used at purchase. Payments made through gateways will be refunded to the same account.</li>
  <li>For support, please contact us via WhatsApp by clicking the icon visible on your screen.</li>
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
    <Link onClick={()=>window.location.reload()} to={`/product/${productdata?.slug}`}>
    <Suggestion subid={productdata?.subcategory._id} id={productdata?._id} />
    </Link>
    </>
  );
};

export default ProductPage;
