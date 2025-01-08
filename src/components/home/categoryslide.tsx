import { useEffect, useState } from "react";
import { Category } from "../../types/CategoryType";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";

const Categories = () => {
    const [categories,setcategories] = useState<Category[]>([]);
    const [loading, setloading] = useState(false);
   async function fetchCategories(){
        setloading(true);
        const result = await fetch("https://stile-backend.vercel.app/products");
        const data = await result.json();
        console.log(data);
        setTimeout(() => {
          setloading(false);
        }, 1000);
        setcategories(data?.categories);
    }
    useEffect(()=>{
        fetchCategories();
    },[])
  return (
    <>
    {loading && <Loading />}
    <div className='mt-5 px-3 md:px-6 font-semibold'>Shop by Categories</div>
    <div className='flex  px-3  items-center gap-3 md:gap-10 p-5 md:p-10 flex-wrap '>
    {categories.length>0 ? categories.map((category:any)=>
    <div className=' flex flex-col justify-center items-center gap-4' key={category._id}>
        <Link to={`/category/${category.slug}`}><img className='h-[130px] w-[130px] md:h-[250px] md:w-[250px] object-top object-cover rounded-full' src={category.image} alt="" /></Link>
        <p className=' text-[12px] md:text-md'>{category.name}</p>
    </div>
    ):null}
    </div>
    </>
    
  )
}

export default Categories