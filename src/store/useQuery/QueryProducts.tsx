import axios from 'axios';
import { apiUrl } from '../../utils/api';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(apiUrl('/products'), {
      timeout: 10000, // 10 second timeout
      headers: {
        'Cache-Control': 'max-age=900', // 15 minutes cache
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
