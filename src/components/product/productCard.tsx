import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../types/CategoryType';

const ProductCard:React.FC<{product:Product}> = ({product}) => {
    const imageRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(product.images[0]);
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
    <div className="h-[350px] flex flex-col  w-[140px] md:h-[560px] md:w-[350px]" key={product._id}>
      <div className='overflow-hidden h-[200px] md:h-[450px]'>
        <img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full border object-top tranition-all duration-[1s]  h-[200px] md:h-[450px] object-cover hover:scale-110 " src={currentImage} alt="" />
        </div>
        <div className="md:p-2 py-2 ">  
            <p className="text-[12px] tracking-widest h-10 md:text-[16px] uppercase">{product.name}</p>
            <p className="text-[10px] tracking-wide text-gray-400 h-10 md:h-5 md:text-[13px] ">{product.description.split(" ").slice(0,6).join(" ")}</p>
            <p className="text-[12px] md:text-sm text-gray-500 tracking-widest">Rs. {(product?.discountedPrice!==product.price)?product.discountedPrice:product.price} <span className="pl-1 md:pl-3 text-[10px] text-gray-400 line-through">{product?.discountedPrice && product?.discountedPrice!==product.price && `Rs. ${product.price}`}</span></p>
            <button className="w-full my-1 rounded-xl border hover:bg-black hover:text-white transition-all duration-300 border-black text-sm md:text-md px-1 md:px-3 py-1 md:py-2">Buy Now</button>
           
            </div>
    </div>
    </Link>
  )
}

export default ProductCard