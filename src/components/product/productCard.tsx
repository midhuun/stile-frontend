import  {  useState } from 'react'
import { Link } from 'react-router-dom'
import SmartImage from '../common/SmartImage'
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
          setCurrentImage(product.images[1]);
        }
      };
      const handleMouseLeave = () => {
        setCurrentImage(product.images[0]);
      };
  return (
    <div className={`flex flex-col product-card-container ${product.type === 'home' ? 'w-[140px] h-[300px]' : "w-[49%] xs:w-[32%] sm:w-[30%] h-[310px]"} md:h-[520px] md:w-[300px]`} key={product?._id}>
       <Link to={`/product/${product.slug}`} className="group h-full flex flex-col">
      <div className='overflow-hidden relative h-[250px] md:h-[450px] flex-shrink-0 product-card-image' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <SmartImage
          src={currentImage}
          alt={product.name}
          width={380}
          height={450}
          className="w-full h-full rounded-md object-cover"
        />
        {/* Sold Out Sticker */}
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg transform -rotate-12 font-bold text-sm md:text-base shadow-2xl border-2 border-white z-20">
              SOLD OUT
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-25 rounded-md backdrop-blur-sm"></div>
          </div>
        )}
      </div>
        <div className="md:p-2 p-2 flex-1 flex flex-col justify-between product-card-content">  
          <div className='h-5 overflow-hidden flex-shrink-0'>
            <p
              className="hidden md:block text-[14px] md:text-[16px] font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-150 group-hover:text-black leading-tight"
              title={product?.name}
            >
              {product?.name.slice(0,28)}{product?.name.length>28 && "..."}
            </p>
            <p
              className="md:hidden text-[11px] font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-150 group-hover:text-black leading-tight"
              title={product?.name}
            >
              {product?.name.slice(0,18)}{product?.name.length>18 && "..."}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[12px] md:mt-1 md:text-sm text-black tracking-wide flex-shrink-0">₹{(product?.discountedPrice!==product.price)?product?.discountedPrice:product?.price} <span className="pl-1 md:pl-3 text-[10px] text-gray-400 line-through">{product?.discountedPrice && product?.discountedPrice!==product.price && `Rs. ${product.price}`}</span></p>
            {product.soldOut && (
              <p className="text-[10px] md:text-xs text-red-600 font-bold">🔴 SOLD OUT</p>
            )}
          </div>  
        </div>
     </Link>
    </div>
  )
}

export default ProductCard