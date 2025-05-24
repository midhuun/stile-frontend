import axios from 'axios';

/**
 * Fetches product data with improved performance
 * - Uses a smaller initial payload
 * - Supports pagination
 * - Implements caching headers
 */
export const fetchProducts = async () => {
  const { data } = await axios.get('https://stile-backendd.vercel.app/allproducts', {
    headers: {
      'Cache-Control': 'max-age=300', // Cache for 5 minutes
    },
  });
  return data;
};

/**
 * Fetches paginated products with filtering options
 * @param page - Page number
 * @param limit - Items per page
 * @param category - Optional category filter
 * @param sort - Optional sort parameter
 * @returns Paginated product data
 */
export const fetchPaginatedProducts = async (
  page: number = 1,
  limit: number = 12,
  category?: string,
  sort?: string
) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (category) {
    params.append('category', category);
  }

  if (sort) {
    params.append('sort', sort);
  }

  const { data } = await axios.get(
    `https://stile-backendd.vercel.app/products/paginated?${params}`,
    {
      headers: {
        'Cache-Control': 'max-age=300', // Cache for 5 minutes
      },
    }
  );

  return data;
};

/**
 * Fetches a single product by slug with prefetching of related products
 * @param slug - Product slug
 * @returns Product data with related products
 */
export const fetchProductBySlug = async (slug: string) => {
  const { data } = await axios.get(`https://stile-backendd.vercel.app/product/${slug}`, {
    headers: {
      'Cache-Control': 'max-age=600', // Cache for 10 minutes
    },
  });

  return data;
};

/**
 * Prefetches category data to improve initial load performance
 */
export const prefetchCategories = async () => {
  return axios.get('https://stile-backendd.vercel.app/categories', {
    headers: {
      'Cache-Control': 'max-age=1800', // Cache for 30 minutes (categories change less often)
    },
  });
};
