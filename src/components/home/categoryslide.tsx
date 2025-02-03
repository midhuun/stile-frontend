
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Categories = () => {
    const products = useSelector((state:any)=>state.Products);
  return (
    <>
    <div className='mt-5 px-2 md:px-6  md:text-xl text-center  text-sm font-bold'>Most Popular</div>
    <div className='flex px-2 md:px-3 gap-2 md:gap-3 min-h-[320px] py-3 md:py-7 overflow-x-auto '>
    {products?.subCategories?.length>0 ? products?.subCategories.map((category:any)=>
    <div className=' flex flex-col w-[140px] md:w-[250px] sm:w-[32%] justify-center gap-1 md:gap-4' key={category._id}>
        <Link to={`/subcategory/${category.slug}`}><img loading="lazy" className='rounded-md h-[230px] xs:h-[300px] w-full md:h-[400px]  object-top object-cover ' src={`${category.image}?w=400&h=500&q=75`} alt="" /></Link>
        <p className='text-[12px] overflow-hidden  break-words h-10 md:text-[18px] '>{category.name}</p>
    </div>
    ):null}
    </div>
    </>
    
  )
}

export default Categories