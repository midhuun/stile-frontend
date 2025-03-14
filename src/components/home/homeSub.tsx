import { useEffect, useState } from 'react';
import { SubCategory, Product } from '../../types/CategoryType';
import ProductCard from '../product/productCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../store/useQuery/QueryProducts';

const HomeSub = () => {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProducts,
  });

  // Remove duplicate products by name
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

  // Fetch categories when product data is available
  useEffect(() => {
    if (product && product.subCategories) {
      const processedSubcategories = product.subCategories.map((subcategory: SubCategory) => ({
        ...subcategory,
        products: removeDuplicateProducts(subcategory.products),
      }));
      setSubcategories(processedSubcategories);
    }
  }, [product]); // 👈 Run this effect when `product` updates

  if (isLoading) {
    return (
      <div className="loading-container h-full w-full overflow-x-hidden">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex min-h-[350px] gap-2 py-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[300px] gap-4 flex flex-col min-w-[140px] md:min-w-[250px] bg-gray-100 rounded-lg animate-pulse"
                  ></div>
                ))}
            </div>
          ))}
      </div>
    );
  }

  if (error) return <p>Error loading products</p>;

  return (
    <>
      <div className="md:w-full hidden md:block md:h-full">
        <img
          loading="lazy"
          src="/story.jpg"
          className="w-full h-[400px] object-contain"
          alt="Stile Sagio Story"
        />
      </div>

      <div className="w-full mt-2">
        {subcategories.map((subcategory: SubCategory) => (
          <div key={subcategory._id} className="md:mt-5 w-full px-2 md:px-4">
            <div className="flex justify-between items-center mb-5 md:pb-10">
              <h1 className="font-semibold text-md md:text-xl">{subcategory.name}</h1>
              <Link to={`/subcategory/${subcategory.slug}`}>
                <h1 className="text-xs md:text-lg underline px-2">View All</h1>
              </Link>
            </div>
            <div className="flex min-h-[350px] rounded-md md:justify-start hide-scroll overflow-x-scroll gap-2 md:gap-4">
              {subcategory.products.map((product, i) => (
                <div key={i}>
                  <ProductCard product={{ ...product, type: 'home' }} />
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
