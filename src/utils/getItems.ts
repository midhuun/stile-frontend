export async function getCart(){
    try{
    const response = await fetch('https://stile-backend.vercel.app/user/cart',{credentials:'include'});
    const data = await response.json(); 
    return data.cart;
    }
    catch(err){
      return err
    }
  }
export async function getFavourites(){
  try{
    const response = await fetch('https://stile-backend.vercel.app/user/favourites',{credentials:'include'});
    const data = await response.json(); 
    return data.favourites;
  }
  catch(err){
    console.log(err)
  }
  }
export async function getProducts(){
  try{
    const response = await fetch('https://stile-backend.vercel.app/products');
    const data = await response.json(); 
    return data.products;
  }
  catch(err){
    console.log(err)
  }
  }
 export const handleCart = async(item:any) => {
    try{
    const res= await fetch(`https://stile-backend.vercel.app/user/${item.value}`,{
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
   catch(err){
    console.log(err)
   }
  }