import { useEffect, useState } from "react";
import { Category } from "../../types/CategoryType";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";
import { useDispatch } from "react-redux";
import { setProduct } from "../../store/reducers/productReducer";

const Categories = () => {
    const [categories,setcategories] = useState<Category[]>([]);
    const dispatch = useDispatch();
    const [loading, setloading] = useState<any>(false);
   async function fetchCategories(){
        setloading(true);
        const result = await fetch("https://stile-backend.vercel.app/products");
        const data = await result.json();
         dispatch(setProduct(data.products));
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
    <div className='flex px-2 md:px-3  gap-3  py-3 md:py-10 flex-wrap '>
    {categories.length>0 ? categories.map((category:any)=>
    <div className=' flex flex-col w-[48%] md:w-[350px] sm:w-[32%] justify-center gap-1 md:gap-4' key={category._id}>
        <Link to={`/subcategory/${category.slug}`}><img className='h-[250px] xs:h-[300px]   border w-full md:h-[460px] md:w-[350px] object-top object-cover ' src={category.image} alt="" /></Link>
        <p className='text-[12px] overflow-hidden tracking-wide break-words font-medium h-10 md:text-[16px] uppercase'>{category.name}</p>
    </div>
    ):null}
    </div>
    </>
    
  )
}

export default Categories