import  {  useState } from 'react'
import { Link } from 'react-router-dom'
// import { HeaderContext } from '../../context/appContext';
// import { getFavourites } from '../../utils/getItems';
// import { PiHeartStraightFill } from "react-icons/pi";

const ProductCard = ({product}:any) => {
  const [currentImage, setCurrentImage] = useState<any>(product.images[0]);
  // const {setFavourites,setisFavouriteOpen} = useContext<any>(HeaderContext);
    // const addToFavorite = async() => {
    //    const res= await fetch(`https://stile-backend-rvmk.vercel.app/user/addtoFavourites`,{
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
    <div className={`h-[300px]  flex flex-col ${product.type === 'home' ? 'w-[140px]' :"w-[49%] xs:w-[32%] sm:w-[30%]" } h-[310px]  md:h-[520px] md:w-[300px]`} key={product?._id}>
       <Link to={`/product/${product.slug}`}>
      <div className='overflow-hidden relative '>       
        <img onMouseEnter={handleMouseEnter} loading='lazy'  onMouseLeave={handleMouseLeave} className="w-full rounded-md object-top tranition-all duration-[1.5s]  h-[250px] md:h-[450px] object-cover hover:scale-[1.01] " src={`${currentImage}?w=380&h=450&q=75`} alt={product.name} />
        </div>
        <div className="md:p-2 p-2">  
          <div className='h-5 overflow-hidden '>
            <p className="text-[10px] hidden md:block text-gray-600  font-semibold  md:text-[16px] uppercase break-words">{product?.name.slice(0,20)}{product.name.length>20 && "..."}</p>
            <p className="text-[10px] md:hidden text-gray-600  font-semibold  md:text-[16px] uppercase break-words">{product?.name.slice(0,18)} {product.name.length>20 && "..."}</p>
            </div>
            {/* <p className="text-[11px] h-10 tracking-wide font-semibold text-gray-700  md:h-5 md:text-[13px]">{product?.description.split(" ").slice(0,6).join(" ")}...</p> */}
            <p className="text-[12px] md:mt-1 md:text-sm text-black tracking-wide">₹{(product?.discountedPrice!==product.price)?product?.discountedPrice:product?.price} <span className="pl-1 md:pl-3 text-[10px] text-gray-400 line-through">{product?.discountedPrice && product?.discountedPrice!==product.price && `Rs. ${product.price}`}</span></p>  
            </div>
     </Link>
    </div>
  )
}

export default ProductCard