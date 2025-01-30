import  {  useState } from 'react'
import { Link } from 'react-router-dom'
// import { HeaderContext } from '../../context/appContext';
// import { getFavourites } from '../../utils/getItems';
// import { PiHeartStraightFill } from "react-icons/pi";

const ProductCard = ({product}:any) => {
  const [currentImage, setCurrentImage] = useState<any>(product.images[0]);
  // const {setFavourites,setisFavouriteOpen} = useContext<any>(HeaderContext);
    // const addToFavorite = async() => {
    //    const res= await fetch(`https://stile-backend.vercel.app/user/addtoFavourites`,{
    //      method: 'POST',
    //      credentials:'include',
    //      headers: {
    //        'Content-Type': 'application/json'
    //      },
    //      body: JSON.stringify({id:product?._id})
    //      });
    //    const data = await res.json();
    //    const favouriteItems = await getFavourites();
    //    setFavourites(favouriteItems);
    //    console.log(data);
    //    setisFavouriteOpen(true);
    //  }
   
    const handleMouseEnter = () => {
        if (product.images.length > 1) {
          setCurrentImage(product.images[1]); // Change to the second image on hover
        }
      };
      const handleMouseLeave = () => {
        setCurrentImage(product.images[0]); // Revert to the original image
      };
  return (
    <div className={`h-[350px] flex flex-col ${product.type === 'home' ? 'w-[140px]' :"w-[49%] xs:w-[32%] sm:w-[30%]" } h-[320px]  md:h-[560px] md:w-[350px]`} key={product?._id}>
       <Link to={`/product/${product.slug}`}>
      <div className='overflow-hidden relative h-[220px] md:h-[450px]'>       
        <img onMouseEnter={handleMouseEnter} loading='lazy' onMouseLeave={handleMouseLeave} className="w-full rounded-md object-top tranition-all duration-[1.5s]  h-[230px] md:h-[450px] object-cover hover:scale-[1.01] " src={`${currentImage}?w=380&h=450&q=75`} alt="" />
        </div>
        <div className="md:p-2 py-2 ">  
          <div className='h-5 overflow-hidden flex items-center'>
            <p className="text-[12px] tracking-wide font-light  md:text-[16px] uppercase break-words">{product?.name}</p>
            </div>
            <p className="text-[11px] tracking-wide font-semibold text-gray-700 h-9 md:h-5 md:text-[13px]">{product?.description.split(" ").slice(0,6).join(" ")}...</p>
            <p className="text-[12px] md:mt-1 md:text-sm text-black tracking-wide">Rs. {(product?.discountedPrice!==product.price)?product?.discountedPrice:product?.price} <span className="pl-1 md:pl-3 text-[10px] text-gray-400 line-through">{product?.discountedPrice && product?.discountedPrice!==product.price && `Rs. ${product.price}`}</span></p>  
            </div>
     </Link>
    </div>
  )
}

export default ProductCard