import { useEffect, useState } from "react"
import { Product } from "../../types/CategoryType";
import ProductCard from "./productCard";

const Suggestion = ({subid,id}:any) => {
    const [suggestions, setSuggestions] = useState<any>([]);
    async function fetchSuggestions() {
        const result = await fetch(`https://stile-backend.vercel.app/products`);
        const data = await result.json();
        setSuggestions(data?.products);
    }
    const suggestion:Product[] = suggestions?.slice(0,5).filter((product:Product)=>product.subcategory===subid && product._id!== id);
   useEffect(()=>
    { 
        fetchSuggestions();
    },[]);
   
  return (
    <div className=" w-full px-3 mt-5 md:px-6">
    <h2 className="md:text-lg py-4 font-bold uppercase text-md">You May Also Like</h2>
    <div className="flex md:justify-normal justify-center flex-wrap gap-4">
     {suggestion.map((product:Product) =>
     <ProductCard key={product._id} product={product} />
      )}
    </div>
    </div>
  )
}

export default Suggestion