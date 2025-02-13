import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Category, Product } from "../../types/CategoryType";
import ProductCard from "../product/productCard";
import Loading from "../loading/loading";

const CategoryPage = () => {
    const {subcategoryName} = useParams<any>();
    const [category,setCategory] = useState<Category | null>(null);
    const [products,setProducts] = useState<Product[]>([]);
    const [isLoading,setisLoading] = useState(false);
    console.log(subcategoryName);
    async function getcategories(){
        const response = await fetch(`https://stile-backend.vercel.app/category/${subcategoryName}`);
        const data:any = await response.json();
        setCategory(data?.category);
        setProducts(data?.products)
    }
  useEffect(()=>{
    window.scrollTo(0,0);
    setisLoading(true);
    getcategories();
    setTimeout(() => {
      setisLoading(false)
    }, 700);
  },[])
  if(isLoading){
    return <Loading />
  }
  return (
   
    <div className="min-h-screen bg-gray-100 py-8 px-2 md:px-4">
      <h1 className="text-lg md:text-3xl  font-bold  text-gray-800 mb-6">
        {category?.name}
      </h1>
      <div className="flex justify-between sm:justify-start flex-wrap gap-[2px] md:gap-5 ">
        {products?.map((product:any) => (
           <ProductCard product={product} />
        )
          )}
      </div>
    </div>
  )
}

export default CategoryPage