import { useEffect, useState } from "react"
import { Product } from "../../types/CategoryType";
import ProductCard from "./productCard";

const Suggestion = ({subid,id}:any) => {
   console.log("sub",subid)
    const [suggestions, setSuggestions] = useState<any>([]);
    async function fetchSuggestions() {
        const result = await fetch(`https://stile-backend.vercel.app/subcategoryProducts/${subid}`);
        const data = await result.json();
       setSuggestions(data);
    }
    const suggestion:Product[] = suggestions?.slice(0,5).filter((product:Product)=>product.subcategory===subid && product._id!== id);
   useEffect(()=>
    { 
        fetchSuggestions();
    },[]);
   
  return (
    <div className=" w-full px-2 mt-5 md:px-6">
    <h2 className="md:text-lg py-4 font-bold uppercase text-md">You May Also Like</h2>
    <div className="flex overflow-x-scroll gap-1 md:gap-4">
     {suggestion?.map((product:Product) =>
     <div key={product._id}>
     <ProductCard  product={{...product,type:"home"}} />
     </div>
      )}
    </div>
    </div>
  )
}

export default Suggestion