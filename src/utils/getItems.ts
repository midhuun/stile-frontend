export async function getCart(){
    const response = await fetch('https://stile-backend-gnqp.vercel.app/user/cart',{credentials:'include'});
    const data = await response.json(); 
    console.log("cartss",data);
    return data.cart;
  }
export async function getFavourites(){
    const response = await fetch('https://stile-backend-gnqp.vercel.app/user/favourites',{credentials:'include'});
    const data = await response.json(); 
    return data.favourites;
  }
export async function getProducts(){
    const response = await fetch('https://stile-backend-gnqp.vercel.app/products');
    const data = await response.json(); 
    return data.products;
  }
 export const handleCart = async(item:any) => {
    console.log(item);
    const res= await fetch(`https://stile-backend-gnqp.vercel.app/user/${item.value}`,{
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productdata:item.productdata,selectedSize:item.activeSize})
    })
    const data = await res.json();
    return data;
  }