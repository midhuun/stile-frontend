import { useEffect, useState } from "react";
import { SubCategory, Product } from "../../types/CategoryType";
import ProductCard from "../product/productCard";
import { Link } from "react-router-dom";

const HomeSub = () => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);

  // Fetch categories from the backend
  async function fetchCategories() {
    try {
      const result = await fetch("https://stile-backend.vercel.app/products");
      const data = await result.json();
      setSubcategories(data?.subCategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  // Remove duplicate products by name for a subcategory
  const removeDuplicateProducts = (products: Product[]) => {
    const uniqueProducts: Product[] = [];
    const seenNames = new Set();

    for (const product of products) {
      if (!seenNames.has(product.name)) {
        seenNames.add(product.name);
        uniqueProducts.push(product);
      }
    }

    return uniqueProducts;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full">
        {subcategories.length > 0 &&
          subcategories.slice(0, 3).map((subcategory: SubCategory) => {
            // Deduplicate products for each subcategory
            const uniqueProducts = removeDuplicateProducts(subcategory.products);

            return (
              <div className="mt-5 w-full px-2 md:px-4 " key={subcategory._id}>
                <div className="flex justify-between items-center mb-5 md:pb-10">
                <h1 className="font-semibold text-lg md:text-xl ">{subcategory.name}</h1>
                <Link to={`/subcategory/${subcategory.slug}`}><h1 className="text-xs md:text-lg underline px-2">View All</h1></Link>
                </div>
                <div className="flex min-h-[350px] md:justify-start  overflow-x-scroll gap-2 md:gap-4">
                  {uniqueProducts.map((product:any, index:number) => (
                    <div  key={index}>
                      <ProductCard product={{...product,type:"home"}} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomeSub;
