import { useEffect, useState } from "react";
import { SubCategory, Product } from "../../types/CategoryType";
import ProductCard from "../product/productCard";
import { Link } from "react-router-dom";
const HomeSub = () => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  // Fetch categories from the backend
  async function fetchCategories() {
    setLoading(true);
    try {
      const result = await fetch("https://stile-backend.vercel.app/products");
      const data = await result.json();
      const processedSubcategories = data?.subCategories?.map((subcategory: SubCategory) => ({
        ...subcategory,
        products: removeDuplicateProducts(subcategory.products),
      }));

      setSubcategories(processedSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  }

  // Remove duplicate products by name for a subcategory
  const removeDuplicateProducts = (products: Product[]) => {
    const seenNames = new Set();
    return products.filter((product) => {
      if (!seenNames.has(product.name)) {
        seenNames.add(product.name);
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="loading-container h-full w-full ">
        {["1","2","3","4","5"].map((__,index:number)=><div key={index} className="flex min-h-[350px] md:justify-start hide-scroll overflow-x-scroll gap-2 py-4  md:gap-4 will-change-transform">
        {["1","2","3","4","5"].map((__,index)=>
        <div key={index}
        className={`h-[300px] gap-4 flex flex-col min-w-[140px] md:min-w-[250px]  md:h-[520px] md:w-[300px] animate-pulse bg-gray-100 rounded-lg`}
      >
        {/* Image Skeleton */}
        <div className="w-full h-[250px] md:h-[450px]  rounded-md"></div>
        {/* Product Info Skeleton */}
        <div className="md:p-2 p-2">
          <div className=" h-4 w-full bg-white rounded-md"></div>
          <div className=" h-5 mt-2 w-[10%] bg-white rounded-md"></div>
        </div>
      </div>
        )}
        </div>
        )}
      </div>
    )
  }

  return (
    <>
    <div className="md:w-full hidden md:block md:h-full">
      <img loading="lazy" src="/story.jpg" className="w-full h-[400px] object-contain" alt="Stile Sagio Story" />
    </div>
    
    <div className="w-full mt-2">
      {subcategories.map((subcategory: SubCategory) => (
        <div key={subcategory._id} className="md:mt-5 w-full px-2 md:px-4">
          {/* Render the special image after the second subcategory */}
          {/* {index === 2 && (
            <div className="w-full  mb-3">
              <img src="/poster.png" alt="Story" loading="lazy" className="w-full h-[450px] object-contain " />
            </div>
          )} */}

          <div className="flex justify-between items-center mb-5 md:pb-10">
            <h1 className="font-semibold text-md md:text-xl">{subcategory.name}</h1>
            <Link to={`/subcategory/${subcategory.slug}`}>
              <h1 className="text-xs md:text-lg underline px-2">View All</h1>
            </Link>
          </div>
          <div className="flex min-h-[350px] rounded-md md:justify-start hide-scroll overflow-x-scroll gap-2 md:gap-4 will-change-transform">
            {subcategory.products.map((product, i) => (
              <div key={i}>
                <ProductCard product={{ ...product, type: "home" }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default HomeSub;
