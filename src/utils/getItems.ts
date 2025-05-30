export async function getCart() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('https://stile-backend-rvmk.vercel.app/user/cart', {
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
  try {
    const response = await fetch('https://stile-backend-rvmk.vercel.app/user/favourites', {
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
    const response = await fetch('https://stile-backend-rvmk.vercel.app/products');
    const data = await response.json();
    return data.products;
  } catch (err) {
    console.log(err);
  }
}
export const handleCart = async (item: any) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://stile-backend-rvmk.vercel.app/user/${item.value}`, {
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
