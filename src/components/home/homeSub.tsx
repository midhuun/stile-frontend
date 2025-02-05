import { useEffect, useState } from "react";
import { SubCategory, Product } from "../../types/CategoryType";
import ProductCard from "../product/productCard";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";

const HomeSub = () => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  // Fetch categories from the backend
  async function fetchCategories() {
    try {
      const result = await fetch("https://stile-backend.vercel.app/products");
      const data = await result.json();

      // Pre-process and remove duplicate products only once
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
    return <Loading />;
  }

  return (
    <div className="w-full">
      {subcategories.map((subcategory: SubCategory, index) => (
        <div key={subcategory._id} className="md:mt-5 w-full px-2 md:px-4">
          {/* Render the special image after the second subcategory */}
          {index === 2 && (
            <div className="w-full object-contain mb-5">
              <img src="/story.webp" alt="Story" loading="lazy" className="w-full h-auto" />
            </div>
          )}

          <div className="flex justify-between items-center mb-5 md:pb-10">
            <h1 className="font-semibold text-md md:text-xl">{subcategory.name}</h1>
            <Link to={`/subcategory/${subcategory.slug}`}>
              <h1 className="text-xs md:text-lg underline px-2">View All</h1>
            </Link>
          </div>

          <div className="flex min-h-[350px] md:justify-start overflow-x-scroll gap-2 md:gap-4 will-change-transform">
            {subcategory.products.slice(0, 5).map((product, i) => (
              <div key={i}>
                <ProductCard product={{ ...product, type: "home" }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSub;
