import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
const orders:any = [
  {
    id: '677bd761cfeb67c064f770af',
    name: 'Black Premium Pocket Polo T-shirt',
    description: 'Introducing our Premium Pocket Polo T-shirt, crafted from 100% cotton.',
    price: 399,
    discount: 0,
    discountedPrice: 399,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://i.ibb.co/MCBFgnt/MPP-0137.jpg'], // Replace with actual image paths
    createdAt: 'January 6, 2025',
    updatedAt: 'January 6, 2025',
  },
  {
    id: '1234567890abcdef12345678',
    name: 'Blue Casual Denim Jacket',
    description: 'A stylish denim jacket perfect for casual outings.',
    price: 1299,
    discount: 20,
    discountedPrice: 1039,
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://i.ibb.co/BjpCKfj/MPP-0121.jpg'], // Replace with actual image paths
    createdAt: 'January 5, 2025',
    updatedAt: 'January 5, 2025',
  },
  {
    id: 'abcdef1234567890abcdef12',
    name: 'Grey Sports Sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear.',
    price: 2499,
    discount: 15,
    discountedPrice: (2499 * (1 - 0.15)).toFixed(2),
    sizes: ['6', '7', '8', '9', '10'],
    images: ['grey_sneakers.jpg'], // Replace with actual image paths
    createdAt: 'January 4, 2025',
    updatedAt: 'January 4, 2025',
  },
];

const Account = () => {
   const { user,setisUserOpen } = useContext(HeaderContext);
   const navigate = useNavigate();
async function getOrders() {
  const res = await fetch(`https://stile-backend-gnqp.vercel.app/user/orders`,{credentials:'include'});
  const data = await res.json();
  console.log(data);
}
useEffect(()=>{
  if(!user){
    navigate('/', { replace: true });
  }
  else{
    getOrders();
  }

},[])
console.log(user);
async function handleLogout(){
  const response =await  fetch("https://stile-backend-gnqp.vercel.app/user/logout",{method:'POST',credentials:'include'})
  const data = await response.json();
  console.log(data);
  setisUserOpen(false);
  
 }
  return (
    <div className="max-w-3xl mx-auto pt-10 p-4">
      <h1 className="text-lg md:text-xl font-semibold mb-4">My Account</h1>
      <button onClick={handleLogout} className="text-sm md:text-md  text-b lue-500 hover:text-blue-700 mb-4">Logout</button>
      <h2 className="text-md md:text-lg font-semibold mb-2">My Orders</h2>
      {orders.map((order:any) => (
        <div key={order.id} className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row">
          <div className="flex-shrink-0">
            <img 
              src={order.images[0]} 
              alt={order.name} 
              className="w-24 h-24 object-cover rounded-md" 
            />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-sm md:text-md font-medium">{order?.name}</h3>
            <p className="text-xs text-gray-600">{order?.description}</p>
            <p className="text-sm md:text-md mt-2">Price: ₹{order?.price}</p>
            {order.discount > 0 && (
              <>
                <p className="text-sm md:text-md text-red-500">Discounted Price: ₹{order?.discountedPrice}</p>
                <p className="text-xs  text-gray-500">Saved Amount: ₹{(order?.price - order?.discountedPrice).toFixed(2)}</p>
              </>
            )}
          </div>
        </div>
      ))}   
    </div>
  );
};

export default Account;
