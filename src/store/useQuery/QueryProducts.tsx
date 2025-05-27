import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get('https://stile-backend-rvmk.vercel.app/products');
  return data;
};
