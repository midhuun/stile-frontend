import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/CategoryType';
import ProductCard from '../product/productCard';
import Loading from '../loading/loading';

const CategoryPage = () => {
  const { subcategoryName } = useParams<any>();
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(false);

  async function getcategories() {
    const response = await fetch(`https://stile-backend.vercel.app/category/${subcategoryName}`);
    const data: any = await response.json();
    setCategory(data?.subcategory?.name);
    setProducts(data?.products);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    getcategories();
    setTimeout(() => {
      setisLoading(false);
    }, 700);
  }, [subcategoryName]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-12 md:mt-5 md:py-4 pb-2 px-2 md:px-4">
      <h1 className="text-sm md:text-xl  font-bold  text-gray-800 mb-4">{category}</h1>
      <div className="flex justify-between sm:justify-start flex-wrap gap-[2px] md:gap-5 ">
        {products?.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
