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
    <div className='mt-5 px-2 md:px-6 uppercase md:text-xl text-sm font-bold'>Shop by Subcategories</div>
    <div className='flex px-2 md:px-3 md:justify-start justify-between items-center gap-3 md:gap-10 p-3 md:p-10 flex-wrap '>
    {categories.length>0 ? categories.map((category:any)=>
    <div className=' flex flex-col justify-center  gap-4' key={category._id}>
        <Link to={`/subcategory/${category.slug}`}><img className='h-[200px] border w-[140px] md:h-[460px] md:w-[350px] object-top object-cover ' src={category.image} alt="" /></Link>
        <p className='text-[12px] overflow-hidden tracking-wide break-words font-medium h-10 md:text-[16px] uppercase'>{category.name}</p>
    </div>
    ):null}
    </div>
    </>
    
  )
}

export default Categories