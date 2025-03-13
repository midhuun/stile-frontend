import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get('https://stile-backend.vercel.app/products');
  return data;
};

const ProductList = () => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProducts,
  });
  console.log(product);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // <ul>{product && product.map((product: any) => <li key={product.id}>{product.name}</li>)}</ul>
    <div>Hello</div>
  );
};

export default ProductList;
