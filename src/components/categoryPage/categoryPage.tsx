import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Category, Product } from "../../types/CategoryType";
import ProductCard from "../product/productCard";

const CategoryPage = () => {
    const {categoryName} = useParams();
    const [category,setCategory] = useState<Category |{}>({});
    const [products,setProducts] = useState<Product[]>([]);
    console.log(categoryName);
    async function getcategories(){
        const response = await fetch(`https://stile-backend.vercel.app/category/${categoryName}`);
        const data = await response.json();
        setCategory(data.category);
        setProducts(data.products)
    }
  useEffect(()=>{
    window.scrollTo(0,0);
    getcategories();
  },[])
  console.log(category)
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-lg md:text-3xl  font-bold  text-gray-800 mb-6">
        {category.name}
      </h1>
      <div className="flex justify-between sm:justify-start flex-wrap gap-2 md:gap-5 ">
        {products.map((product) => (
           <ProductCard product={product} />
        )
          )}
      </div>
    </div>
  )
}

export default CategoryPage