import { useEffect, useState } from "react";
import { Category } from "../../types/CategoryType";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";
const Categories = () => {
    const [categories,setcategories] = useState<Category[]>([]);
    const [loading, setloading] = useState<any>(false);
   async function fetchCategories(){
        setloading(true);
        const result = await fetch("https://stile-backend.vercel.app/products");
        const data = await result.json();
         setloading(false);
        setcategories(data?.subCategories);
    }
    useEffect(()=>{
        fetchCategories();
    },[])
  return (
    <>
    {loading && <Loading />}
    <div className='mt-5 px-2 md:px-6  md:text-xl  text-sm font-bold'>Most Popular</div>
    <div className='flex px-2 md:px-3 gap-2 md:gap-3 min-h-[320px] py-3 md:py-7 overflow-x-auto '>
    {categories.length>0 ? categories.map((category:any)=>
    <div className=' flex flex-col min-w-[140px] md:min-w-[350px] sm:w-[32%] justify-center gap-1 md:gap-4' key={category._id}>
        <Link to={`/subcategory/${category.slug}`}><img loading="lazy" className='rounded-md h-[230px] xs:h-[300px]   border w-full md:h-[450px]  object-top object-cover ' src={`${category.image}?w=400&h=500&q=75`} alt="" /></Link>
        <p className='text-[12px] overflow-hidden  break-words h-10 md:text-[18px] '>{category.name}</p>
    </div>
    ):null}
    </div>
    </>
    
  )
}

export default Categories