import axios from 'axios';
import { apiUrl } from '../../utils/api';

export const fetchProducts = async () => {
  const { data } = await axios.get(apiUrl('/products'));
  return data;
};
