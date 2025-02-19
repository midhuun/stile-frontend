import { useEffect, useState } from "react";
import { SubCategory } from "../../types/CategoryType";
import ProductCard from "../product/productCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const HomeSub = () => {
  const items:any = useSelector((state:RootState)=>state.Products)
  // Fetch categories from the backend
  // async function fetchCategories() {
  //   setLoading(true);
  //   try {
  //     const result = await fetch("https://stile-backend.vercel.app/products");
  //     const data = await result.json();
  //     setSubcategories(data.subCategories);
  //   } catch (error) {
  //     console.error("Error fetching subcategories:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // Remove duplicate products by name for a subcategory
  // const removeDuplicateProducts = (products: Product[]) => {
  //   const seenNames = new Set();
  //   return products.filter((product) => {
  //     if (!seenNames.has(product.name)) {
  //       seenNames.add(product.name);
  //       return true;
  //     }
  //     return false;
  //   });
  // };

  // if (loading) {
  //   return (
  //     <div className="loading-container h-full w-full ">
  //       {["1","2","3","4","5"].map((__,index:number)=><div key={index} className="flex min-h-[350px] md:justify-start hide-scroll overflow-x-scroll gap-2 py-4  md:gap-4 will-change-transform">
  //       {["1","2","3","4","5"].map((__,index)=>
  //       <div key={index}
  //       className={`h-[300px] gap-4 flex flex-col min-w-[140px] md:min-w-[250px]  md:h-[520px] md:w-[300px] animate-pulse bg-gray-200 rounded-lg`}
  //     >
  //       {/* Image Skeleton */}
  //       <div className="w-full h-[250px] md:h-[450px] bg-gray-300 rounded-md"></div>
  
  //       {/* Product Info Skeleton */}
  //       <div className="md:p-2 p-2">
  //         <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
  //         <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded-md"></div>
  //         <div className="mt-1 h-5 w-1/3 bg-gray-300 rounded-md"></div>
  //       </div>
  //     </div>
  //       )}
  //       </div>
  //       )}
  //     </div>
  //   )
  // }

  return (
    <>
    <div className="w-full h-full">
      <img src="/story.jpg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="w-full mt-5">
      {items?.subCategories?.map((subcategory: SubCategory) => (
        <div key={subcategory._id} className="md:mt-5 w-full px-2 md:px-4">
          {/* Render the special image after the second subcategory */}
          {/* {index === 2 && (
            <div className="w-full object-contain mb-5">
              <img src="/story.webp" alt="Story" loading="lazy" className="w-full h-auto" />
            </div>
          )} */}

          <div className="flex justify-between items-center mb-5 md:pb-10">
            <h1 className="font-semibold text-md md:text-xl">{subcategory.name}</h1>
            <Link to={`/subcategory/${subcategory.slug}`}>
              <h1 className="text-xs md:text-lg underline px-2">View All</h1>
            </Link>
          </div>

          <div className="flex min-h-[350px] md:justify-start hide-scroll overflow-x-scroll gap-2 md:gap-4 will-change-transform">
            {subcategory.products.slice(0, 5).map((product, i) => (
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
