
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Categories = () => {
    const products = useSelector((state:any)=>state.Products);
  return (
    <>
   <div className="relative my-1 md:my-4 text-center text-sm md:text-xl font-bold text-gray-800">
  <span className="relative z-10">Most Popular</span>
  
  <div className="absolute left-1/2 bottom-0 w-24 h-[2px] bg-black rounded-full transform -translate-x-1/2"></div>
</div>
    <div className='flex px-2 md:px-3 gap-2  md:gap-3 min-h-[320px] py-3 md:py-7 hide-scroll overflow-x-scroll '>
    {products?.subCategories?.length>0 ? products?.subCategories.map((category:any)=>
    <div className=' flex flex-col  min-w-[140px] md:w-[250px] sm:w-[32%] justify-center gap-1 md:gap-4' key={category._id}>
        <Link to={`/subcategory/${category.slug}`}><img loading="lazy"  className='rounded-md  h-[230px] xs:h-[300px] w-full md:h-[400px]  object-top object-cover ' src={`${category.image}?w=400&h=500&q=75`} alt={category.name} /></Link>
        <p className='text-[10px] overflow-hidden  break-words h-10 md:text-[14px] uppercase'>{category.name}</p>
    </div>
    ):<>
     {["1","2","3","4","5"].map((__,index)=>
        <div key={index}
        className={`h-[230px] gap-4 flex flex-col min-w-[140px] md:min-w-[250px]  md:h-[520px] md:w-[300px] animate-pulse bg-gray-200 rounded-lg`}
      >
        {/* Image Skeleton */}
       
  
        {/* Product Info Skeleton */}
        {/* <div className="md:p-2 p-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
          <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded-md"></div>
          <div className="mt-1 h-5 w-1/3 bg-gray-300 rounded-md"></div>
        </div> */}
      </div>
        )}
    </>}
    </div>
    </>
    
  )
}

export default Categories