import { apiUrl } from './api';
export async function getCart() {
  const token = localStorage.getItem('token');
  if (!token) {
    return [];
  }
  try {
  const response = await fetch(apiUrl('/user/cart'), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Send token in header
      },
    });
    const data = await response.json();
    return data.cart;
  } catch (err) {
    return err;
  }
}
export async function getFavourites() {
  const token = localStorage.getItem('token');
  if (!token) {
    return [];
  }
  try {
  const response = await fetch(apiUrl('/user/favourites'), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Send token in header
      },
    });
    const data = await response.json();
    return data.favourites;
  } catch (err) {
    console.log(err);
  }
}
export async function getProducts() {
  try {
    const response = await fetch(apiUrl('/products'), {
      headers: {
        'Cache-Control': 'max-age=900', // 15 minutes cache
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.products;
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}
export const handleCart = async (item: any) => {
  const token = localStorage.getItem('token');
  try {
  const res = await fetch(apiUrl(`/user/${item.value}`), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Send token in header
      },
      body: JSON.stringify({ productdata: item.productdata, selectedSize: item.activeSize }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
