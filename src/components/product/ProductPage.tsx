
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { HeaderContext } from "../../context/appContext";
import Suggestion from "./suggestion";
import { getCart, getFavourites } from "../../utils/getItems";
import Loading from "../loading/loading";
import { useDispatch, useSelector } from "react-redux";
import  { RootState } from "../../store/store";
import { addtoCart, deleteFromCart, removeFromCart, setcart } from "../../store/reducers/cartReducer";
import { BiSolidHeart } from "react-icons/bi";
import { useSwipeable } from "react-swipeable";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
const ProductPage = () => {
  const params: any = useParams();
  const { product } = params;
  const [productdata, setproductdata] = useState<any>(null);
  // const [sex,setsex] = useState("");
  const  [isreviewed,setisreviewed] = useState(false);
  const [reviewCount,setreviewCount] = useState(0);
  const [avg, setavg] = useState(0);
  const [reviewsList, setReviewsList] = useState<any>([]);
  const cart = useSelector((state:RootState)=>state.Cart);
  const {setiscartOpen,setisFavouriteOpen,setFavourites,isAuthenticated,setisUserOpen,user} = useContext(HeaderContext);
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
  const [rating, setRating] = useState<number>(5);
  const [hover, setHover] = useState<any>(null);
  const [review, setReview] = useState<any>({
    name:"",
    title:"",
    content:"",
  });
  function handleReview(e:any){
    e.preventDefault();
    setReview({
      ...review,
      [e.target.name]:e.target.value
  })
}  
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(!user){
      toast.warning("Please login to Review")
      return
    }
    try{
    const data = await fetch("https://stile-backend.vercel.app/reviews",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({rating:rating,product:productdata._id,user:user,name:review.name,title:review.title,content:review.content}),
    });
    const res = await data.json();
    console.log(res);
    if(data.status === 200){
      toast.success("Review Added Successfully");
    }
  }
   catch(err:any){
    toast.error(err)
   }
    setReview({
      name:"",
      title:"",
      content:"",
    })
    setRating(0);
    setisreviewed(true);
    toast.success("Review Submitted Successfully")

  };
  const thisProduct = productdata &&cart?cart?.find((item:any)=>item.product._id === productdata?._id && item.selectedSize === activeSize):null;
  console.log(thisProduct);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (productdata?.images && active < productdata.images.length - 1) {
        setActive((prevActive) => prevActive + 1);
      }
    },
    onSwipedRight: () => {
      if (productdata?.images && active > 0) {
        setActive((prevActive) => prevActive - 1);
      }
    }
  })
const handleDotClick = (index:any) => {
  setActive(index);
};
  const addToFavorite = async() => {
    if(!isAuthenticated){
       setisUserOpen(true)
       return
    }
    try{
    await fetch(`https://stile-backend.vercel.app/user/addtoFavourites`,{
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:productdata?._id})
      });
    const favouriteItems = await getFavourites();
    if(favouriteItems){
    setFavourites(favouriteItems);
    }
    setisFavouriteOpen(true);
  }
  catch(err){
    console.log(err)
    console.log(isreviewed)
  }
  }
  const handleCart = async(value:any) => {
    if (!productdata) return;
    if(!isAuthenticated){
      setisUserOpen(true)
      return
   }
   setiscartOpen(true);
   if(value === 'addToCart'){
           dispatch(addtoCart({product:productdata,selectedSize:activeSize}))
      }
      if(value === 'removeFromCart'){
         dispatch(removeFromCart({product:productdata,selectedSize:activeSize}))
      }
      if(value === 'deleteFromCart'){
        dispatch(deleteFromCart({product:productdata,selectedSize:activeSize}))
      }
      try{
    await fetch(`https://stile-backend.vercel.app/user/${value}`,{
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productdata,selectedSize:activeSize})
    })
    getCart().then((item:any)=>dispatch(setcart(item))).catch((err:any)=>console.log(err));
  }
  catch(err){
    console.log(err)
    
  }
  
  }
  
  const toggleDropdown = (key: string) => {
    setDropdowns((prev:any) => ({ ...prev, [key]: !prev[key] }));
  };
  useEffect(()=>{
    const fetchReviews = async()=>{
      try{
        if(productdata){
          const response = await fetch(`https://stile-backend.vercel.app/reviews/${productdata._id}`)
          const data = await response.json();
          console.log(data)
          if(data?.reviews.length>0){
             setReviewsList(data.reviews)
             setreviewCount(data.reviewCount)
          }
          if(data?.averageRating){
            setavg(data.averageRating)
          }
          else{
            setReviewsList([
              { 
                name: "Prasath", 
                title: "Excellent Quality!", 
                rating: 5, 
                text: "The quality is good and I like it" 
              },
              { 
                name: "Aisha Iyer", 
                title: "Very Satisfied!", 
                rating: 4.5, 
                content: "The material is really good, and it feels comfortable. Delivery was quick too. Would definitely buy again!" 
              },
              { 
                name: "Saran", 
                title: "Worth Every Penny!", 
                rating: 4.8, 
                content: "I was skeptical at first, but this product is fantastic! Using it for a week now, and it's been perfect." 
              },
              { 
                name: "Praveen", 
                title: "Great Purchase!", 
                rating: 4.7, 
                text: "Loved the design and finish. It’s stylish and durable. Also, customer service was very helpful!" 
              },
              { 
                name: "Midhun Kumar", 
                title: "Impressive!", 
                rating: 5, 
                content: "The best product I’ve bought in a long time! Works exactly as described. Highly recommend to everyone." 
              }
            ])
          }
        }
        }
      catch(err){
          console.log(err)
      }
    }
    fetchReviews();
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);  
     }, 800);
  },[params,productdata])
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://stile-backend.vercel.app/product/${product}`);
        const data = await response?.json();
        if(data.length>0){
        setproductdata(data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
     getProduct();
    getCart().then((data) => dispatch(setcart(data))).catch((err) => console.log(err));
  }, [dispatch,params]);
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
  if(isLoading){
    return <Loading />
  }
  //  function addClick(){
  //   setiscartOpen(true);
  //   dispatch(addtoCart(productdata))
  //  }
  function handleThumbnailClick(index: number) {
    setActive(index);
  }

  return (
    <>
    {/* {isLoading && <Loading />} */}
    <div className="w-full p-3 flex justify-center">
      <ToastContainer  />
      <div className="flex flex-col md:flex-row justify-center md:justify-start pt-10 md:gap-10  md:pt-10">
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
                  className={`w-3/4  h-auto cursor-pointer border ${
                    active === index ? "border-black" : "border-gray-200"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="w-4/5 relative">
            <BiSolidHeart onClick={()=>addToFavorite()} className="absolute cursor-pointer top-4 right-4 text-red-500" size={26} />
              <img
                className="w-full h-[90vh] object-top object-cover border"
                src={productdata?.images?.[active]}
                alt={productdata?.name}
              />
              <div className="absolute z-[-100] h-[90vh] w-full inset-0 overflow-hidden bg-gray-400 animate-pulse"></div>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div
      className="md:hidden h-[70vh] flex overflow-hidden relative"
    >
      <BiSolidHeart
        onClick={() => addToFavorite()}
        className="absolute cursor-pointer top-4 right-4 text-red-500"
        size={26}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
      )}
      <img {...swipeHandlers}
        className="w-full h-full object-cover object-top transition-transform duration-500"
        src={productdata?.images?.[active]}
        loading="lazy"
        onLoad={() => setisLoading(false)}
        alt={productdata?.name}
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

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {productdata?.images?.map((_:any, index:number) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 text-[10px]  flex justify-center items-center rounded-full cursor-pointer transition-all ${
              active === index ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
           
            </div>
        ))}
      </div>
    </div>
   </div>
        {/* Right Side - Product Info */}
        <div className="space-y-2 p-2 md:w-[50%]">
          <h1 className="text-md md:text-4xl">{productdata?.name}</h1>
          <div className="flex items-center gap-3">
          <p className="rating p-1 md:p-2 text-[12px] select-none md:text-xs w-14 rounded-md flex text-white font-bold justify-center items-center gap-1 bg-green-500"><FaStar className="text-white" /><span className="tracking-widest">{Math.floor(avg*10)/10}</span></p>
           <p className="text-sm text-gray-500 font-bold">({reviewCount} Reviews)</p>
          </div>
          <h2 className="text-md md:text-xl font-bold">₹ {productdata?.price}.00 <span className=" font-normal text-[11px] md:text-xs text-gray-400">Inclusive of all Taxes</span></h2>
          <p className="text-gray-600 select-none text-xs md:text-sm">
            Tax included. Shipping calculated at checkout.
          </p>
          
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
              <div className="fixed inset-0 top-10 flex items-center   justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-6 relative">
                  <button
                    onClick={() => setchartOpen(false)}
                    className="absolute h-8 w-8 flex justify-center items-center bg-white z-[100] rounded-full top-1 right-1"
                  >
                    <IoCloseSharp className="text-2xl" />
                  </button>
                  <div className="flex w-full justify-center items-center">
                  <img src={productdata?.subcategory?.sizeurl} className="min-w-[300px]  h-[60vh]" alt="Size Chart Icon" />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Note */}
          <p className="text-xs md:text-sm"><span className="font-semibold text-xs md:text-sm">Note:</span> Please check size before buying</p>
          {/* Size Selection */}
          <div>
            {/* <div className="flex text-sm py-2 gap-1">
            <p>Size:</p>
            <p>{activeSize}</p>
            </div> */}
            <p className="text-sm md:text-md font-medium">Select Size:</p>
            <div className="flex gap-3 mt-2">
              {productdata?.sizes?.map((size:any) => (
                <div
                  key={size?._id}
                  onClick={() => setActiveSize(size?.size)}
                  className={`cursor-pointer uppercase text-semibold text-xs md:text-md py-2 px-3 md:px-4 md:py-2 border ${
                    activeSize === size?.size
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-500"
                  }`}
                >
                  {size?.size}
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
                className={`${thisProduct?.quantity === 0 || 1 && 'cursor-not-allowed'} md:px-3 px-2 py-1 md:py-2 hover:bg-gray-200`}
              >
                -
              </button>
              <p className="flex-1 text-center">{thisProduct && thisProduct?.quantity || 1}</p>
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
            {/* <Link onClick={()=>handleCart('addToCart')} to='/checkout' className="w-full text-sm md:text-md py-3 bg-black text-center text-white rounded-md hover:opacity-90">
              Buy Now
            </Link> */}
            <button onClick={()=>handleCart('addToCart')} className={` ${thisProduct?"hidden":"block"} cursor-pointer uppercase bg-black text-white w-full text-sm md:text-md py-3 border border-gray-500 rounded-md hover:border-black`}>
              Add to bag
            </button>
            
            <button onClick={()=>setiscartOpen(true)} className={` ${thisProduct?"block ":"hidden"} cursor-pointer uppercase bg-black text-white w-full text-sm md:text-md py-3 border border-gray-500 rounded-md hover:border-black`}>
            GO to BAg
            </button>
          </div>
          {/* Delivery Info */}
          <div className="flex w-full border border-gray-300 divide-x divide-gray-300 bg-white shadow-lg rounded-lg">
  {/** First Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
  <img className=" h-6 w-6 object-contain md:h-10 md:w-10" src="/quality.png" alt="Quality" />
    <p className="text-gray-600 text-xs md:text-base font-medium">Quality Checked</p>
  </div>

  {/** Second Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
   <img className=" h-6 w-6 object-contain md:h-10 md:w-10" src="/original.png" alt="Original" />
    <p className="text-gray-600 text-xs md:text-base font-medium">Genuine Product</p>
  </div>

  {/** Third Section */}
  <div className="flex flex-col gap-2 items-center text-center p-4 w-1/3 transform transition-transform hover:scale-105 duration-300">
  <img className="h-6 w-6 object-contain md:h-10 md:w-10" src="/return.png" alt="Return" />
    <p className="text-gray-600 text-xs md:text-base font-medium">
     7 Days Return Policy
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
                      <>
                     <ul className="space-y-3 transition-all duration-700 list-disc mx-3">
                      {productdata?.attributes && 
                        Object.keys(productdata?.attributes)?.map((key)=>
                          <li className=""> <span className="font-semibold text-black">{key}</span> : {productdata?.attributes[key]}</li>
                        )
                      }
                     </ul>
                     <p className="p-2 "> {productdata?.description} </p>
                     </>}
                    {key === "shipping" && (
                      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                      {/* Shipping Section */}
                      <h2 className="font-bold text-base md:text-lg mb-2">SHIPPING</h2>
                      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
                      <li><strong>Shipping Methods:</strong> We usually ship with private couriers through Shiprocket, ST Couriers, Professional Courier, DTDC, etc. For other states, we use Blue Dart, Speed Post, Ekart, Ecomm Express, and Delhivery.</li>
  <li><strong>Dispatch Time:</strong> Dispatch time is typically within 48-72 hours.</li>
  <li><strong>Delivery Time:</strong> Delivery time within India is typically 4-7 business days, while international deliveries take around 7-12 business days.</li>
  <li><strong>Note:</strong> At times, delivery may take longer due to changes in delivery routes or other unforeseen circumstances.</li>
  <li><strong>Legal Disputes:</strong> All legal disputes are subject to the jurisdiction of Tirupur.</li>
                      </ul>
                    
                      {/* Returns & Exchange Section */}
<h3 className="font-semibold text-base md:text-lg my-2">Cancellation / Refund Policy</h3>
<ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
<li><strong>Return Policy:</strong> We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.</li>
  <li><strong>Eligibility for Return:</strong> 
    <ul>
      <li>The item must be in the same condition that you received it.</li>
      <li>It must be unworn or unused, with tags.</li>
      <li>It should be in its original packaging.</li>
      <li>You’ll also need the receipt or proof of purchase.</li>
    </ul>
  </li>
</ul>



                    </div>
                    
                    )}
                    {key === "manufacturer" && (
                      <p className="py-2">Manufactured by TVT Textiles</p>
                    
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
   {/* Reviews */}
   <div className="reviews h-auto w-full flex flex-col items-center p-6 bg-gradient-to-r  text-white">
      <div className="box h-auto w-full p-6 shadow-lg rounded-lg md:w-[80%] bg-white text-gray-900">
        <h2 className="md:text-2xl text-xl font-bold text-center">Customer Reviews</h2>
        
        <div className="rating my-4 p-4 flex flex-col md:flex-row items-center bg-gray-100 rounded-lg w-full shadow-sm">
          <div className="total p-6 flex justify-center items-center gap-4 flex-col md:w-1/3">
            <h1 className="md:text-[70px] text-5xl text-gray-600 font-extrabold">{Math.floor(avg*10)/10}</h1>
            <p className="text-sm font-semibold text-gray-500 md:text-base">{reviewCount} Reviews</p>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index:any) => (
                <FaStar key={index} className="text-yellow-400 text-xl md:text-3xl" />
              ))}
            </div>
          </div>
          <div className="w-full md:w-[1px] md:h-full h-[1px] bg-gray-300 my-3 md:my-0"></div>
          
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-4 flex flex-col gap-4">
            <div className="flex gap-1 justify-center md:justify-start">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer text-xl md:text-2xl transition-colors duration-200 ${
                      starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
            <input value={review.name} onChange={(e) => handleReview(e)} type="text" autoComplete="name" name="name" placeholder="Enter your name" id="" className="p-2 text-sm border-gray-300 md:text-md w-full border rounded-lg" />
            <input value={review.title}  onChange={(e) => handleReview(e)} type="text"  name="title" placeholder="Comment" id="" className="p-2 text-sm border-gray-300 md:text-md w-full border rounded-lg" />
            <textarea name="content" 
              className="p-3 rounded-lg border border-gray-300 w-full text-gray-900 text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your review here..."
              value={review.content}
              onChange={(e) => handleReview(e)}
              required
            ></textarea>
            <button 
              type="submit"
              className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm md:text-base font-semibold"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
    {/* Review Card */}
    <div className="reviews-list px-6 md:px-6 mt-6 w-full grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          {reviewsList.map((rev:any, index:number) => (
           <div key={index} className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row items-start gap-4">
           {/* User Avatar */}
           <div className="w-12 h-12 flex-shrink-0">
             <img 
               src="/boy.png"
               alt={rev.username} 
               className="w-12 h-12 rounded-full border border-gray-300 object-cover"
             />
           </div>
         
           {/* Review Content */}
           <div className="flex flex-col w-full flex-1">
             {/* User Info & Rating */}
             <div className="flex items-center  justify-between">
               <h3 className="text-lg font-semibold text-indigo-600">{rev.name}</h3>
               <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => (
                   <FaStar key={i} className={`${i < rev.rating ? "text-yellow-400" : "text-gray-300"} text-md`} />
                 ))}
               </div>
             </div>
             <h4 className="text-gray-800 font-medium mt-1">{rev.title}</h4>
             <p className="text-gray-600 mt-2 text-sm leading-relaxed">{rev.content}</p>
           </div>
         </div>
         
          ))}
        </div>
    {/* You May Also Like */}
    <Link  to={`/product/${productdata?.slug}`}>
    <Suggestion subid={productdata?.subcategory?._id} id={productdata?._id} />
    </Link>
    </>
  );
};

export default ProductPage;
