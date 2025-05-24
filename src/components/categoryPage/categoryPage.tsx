import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/CategoryType';
import ProductCard from '../product/productCard';
import Loading from '../loading/loading';
import { useQuery } from '@tanstack/react-query';

interface CategoryData {
  subcategory: {
    name: string;
  };
  products: Product[];
}

const CategoryPage = () => {
  const { subcategoryName } = useParams<any>();
  const [category, setCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const ITEMS_PER_PAGE = 12;

  // Use React Query for efficient data fetching with caching
  const { 
    data, 
    isLoading, 
    isFetching
  } = useQuery<CategoryData>({
    queryKey: ['categoryProducts', subcategoryName, page],
    queryFn: async () => {
      const response = await fetch(
        `https://stile-backendd.vercel.app/category/${subcategoryName}?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      
      // Update category name if it's not set yet
      if (!category && data?.subcategory?.name) {
        setCategory(data.subcategory.name);
      }
      
      // Check if there are more products to load
      if (data.products.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // Reset page when subcategory changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    window.scrollTo(0, 0);
  }, [subcategoryName]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= 
      document.documentElement.offsetHeight - 500 &&
      hasMore && 
      !isFetching
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore, isFetching]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Show loading state for initial load
  if (isLoading && page === 1) {
    return <Loading />;
  }

  const products = data?.products || [];

  return (
    <div className="mt-12 md:mt-5 md:py-4 pb-2 px-2 md:px-4">
      <h1 className="text-sm md:text-xl font-bold text-gray-800 mb-4">{category}</h1>
      <div className="flex justify-between sm:justify-start flex-wrap gap-[2px] md:gap-5">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {/* Loading indicator for pagination */}
      {isFetching && page > 1 && (
        <div className="w-full flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* No more products message */}
      {!hasMore && products.length > 0 && (
        <div className="w-full text-center py-8 text-gray-500">
          No more products to load
        </div>
      )}
      
      {/* No products found message */}
      {products.length === 0 && !isLoading && (
        <div className="w-full text-center py-8 text-gray-500">
          No products found in this category
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
