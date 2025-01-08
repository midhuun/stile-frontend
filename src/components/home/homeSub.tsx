import { useEffect, useState } from "react";
import { SubCategory, Product } from "../../types/CategoryType";
import ProductCard from "../product/productCard";

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
              <div className="mt-5 w-full px-3 md:px-6" key={subcategory._id}>
                <h1 className="font-semibold pb-10">{subcategory.name}</h1>
                <div className="flex flex-wrap gap-4">
                  {uniqueProducts.map((product, index) => (
                    <div key={index}>
                      <ProductCard product={product} />
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
