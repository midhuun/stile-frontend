import  {  useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { HeaderContext } from '../../context/appContext';
import { getFavourites } from '../../utils/getItems';
import { PiHeartStraightFill } from "react-icons/pi";

const ProductCard = ({product}:any) => {
  const [currentImage, setCurrentImage] = useState<any>(product.images[0]);
  const {setFavourites,setisFavouriteOpen} = useContext<any>(HeaderContext);
    const addToFavorite = async() => {
       const res= await fetch(`https://stile-backend-gnqp.vercel.app/user/addtoFavourites`,{
         method: 'POST',
         credentials:'include',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({id:product?._id})
         });
       const data = await res.json();
       const favouriteItems = await getFavourites();
       setFavourites(favouriteItems);
       console.log(data);
       setisFavouriteOpen(true);
     }
   
    const handleMouseEnter = () => {
        if (product.images.length > 1) {
          setCurrentImage(product.images[1]); // Change to the second image on hover
        }
      };
      const handleMouseLeave = () => {
        setCurrentImage(product.images[0]); // Revert to the original image
      };
  return (
    <Link to={`/product/${product.slug}`}>
    <div className="h-[350px] flex flex-col  w-[140px] md:h-[560px] md:w-[350px]" key={product?._id}>
      <div className='overflow-hidden relative h-[200px] md:h-[450px]'>
        <PiHeartStraightFill onClick={()=>addToFavorite()} title='Add To Favourites' className='text-red-500 z-[40] text-xl md:text-3xl absolute top-4 right-4' />
        <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full border object-top tranition-all duration-[1s]  h-[200px] md:h-[450px] object-cover hover:scale-110 " src={currentImage} alt="" />
        </div>
        <div className="md:p-2 py-2 ">  
            <p className="text-[12px] tracking-wide font-medium h-10 md:text-[16px] uppercase break-words">{product?.name}</p>
            <p className="text-[10px] tracking-wide text-gray-700 h-10 md:h-5 md:text-[13px] ">{product?.description.split(" ").slice(0,6).join(" ")}</p>
            <p className="text-[12px] md:mt-1 md:text-sm text-black tracking-widest">Rs. {(product?.discountedPrice!==product.price)?product?.discountedPrice:product?.price} <span className="pl-1 md:pl-3 text-[10px] text-gray-400 line-through">{product?.discountedPrice && product?.discountedPrice!==product.price && `Rs. ${product.price}`}</span></p>  
            </div>
    </div>
    </Link>
  )
}

export default ProductCard