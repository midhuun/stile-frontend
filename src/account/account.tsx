import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user, setisUserOpen } = useContext(HeaderContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any>([]);
   
    async function getOrders() {
        const res = await fetch(`https://stile-backend.vercel.app/user/orders`, { credentials: 'include' });
        const data = await res.json();
        setOrders(data.orders);
        console.log(data)
    }
    
    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true });
        } else {
            getOrders();
        }
    }, [user, navigate]);

    async function handleLogout() {
        await fetch("https://stile-backend.vercel.app/user/logout", { method: 'POST', credentials: 'include' });
        setisUserOpen(false);
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6">My Account</h1>
            <button 
                onClick={handleLogout} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-6"
            >
                Logout
            </button>
            
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
            ) : (
                orders.map((order:any) => (
                    <div key={order._id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 font-medium">Status: <span className="text-black">{order.status}</span></p>
                                <p className="text-sm text-gray-600 font-medium">Total: <span className="text-black font-semibold">₹{order.totalAmount}</span></p>
                                <p className="text-sm text-gray-600">Payment: {order.paymentMethod}</p>
                                {order.products && order.products.length >0 && 
                                <div className='h-32 w-20'>
                                    <img src={order.products[0].product.images[0]} alt="" className='w-full h-full object-cover' />
                                </div>
                                }
                                <div className='px-1 mt-3'>
                                    <div className='h-[1px] bg-gray-300'></div>
                                <div className='flex mt-3 justify-between'>
                                <p className="md:text-sm text-xs text-gray-500 mt-2">Ordered on: {new Date(order.createdAt).toLocaleString()}</p> 
                                <button className='w-[150px] hidden md:block px-3 py-2 border bg-black text-white text-xs  md:text-sm'>View Order</button>
                                </div>
                                <div className='flex mt-3 justify-between'>
                                <p className="md:text-sm text-xs text-gray-500 mt-2">Order No: </p> 
                                <button className='w-[150px] hidden md:block px-3 py-2 border bg-black text-white text-xs  md:text-sm'>Cancel Order</button>
                                </div>
                                <div className='mt-3 flex'>
                                <button className='w-[150px] md:hidden px-3 py-2 border bg-black text-white text-xs  md:text-sm'>Cancel Order</button>
                                <button className='w-[150px] md:hidden px-3 py-2 border bg-black text-white text-xs  md:text-sm'>View Order</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )} 
        </div>
    );
};

export default Account;
