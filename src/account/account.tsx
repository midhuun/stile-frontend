
import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../context/appContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Account = () => {
    const { user, setisUserOpen } = useContext(HeaderContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any>([]);
    const [cancelOrderId, setCancelOrderId] = useState<any>("");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    async function getOrders() {
        const res = await fetch(`https://stile-backend.vercel.app/user/orders`, { credentials: 'include' });
        const data = await res.json();
        setOrders(data.orders);
    }

    useEffect(() => {
        // if (!user) {
        //     navigate('/', { replace: true });
        // } else {
        //     getOrders();
        // }
        getOrders();
    }, [user, navigate]);

    async function handleLogout() {
        
        await fetch("https://stile-backend.vercel.app/user/logout", { method: 'POST', credentials: 'include' });
        setisUserOpen(false);
    }

    // Open cancel modal
    const openCancelModal = (orderId: string) => {
        console.log(orderId);
        setCancelOrderId(orderId);
        setShowCancelModal(true);
    };

    // Close cancel modal
    const closeCancelModal = () => {
        setCancelOrderId(null);
        setShowCancelModal(false);
        setCancelReason("");
    };

    // Handle cancel order submission
    async function handleCancelOrder() {
        if (!cancelOrderId || !cancelReason) return;
        console.log(cancelOrderId);
        try {
            const res = await fetch(`https://stile-backend.vercel.app/order/delete/${cancelOrderId}`, {
                method: 'POST',
                credentials:'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason: cancelReason,phone:user.phone })
            });

            if (!res.ok) throw new Error("Failed to cancel order");
            closeCancelModal();
            getOrders(); // Refresh orders after cancellation
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 p-6 bg-white  rounded-lg">
            <div className="flex justify-between">
                <div className='mb-6'>
                <h1 className="md:text-2xl text-lg font-semibold ">My Account</h1>
                <div className="w-full h-[2px] bg-black"></div>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="bg-blue-500 text-sm md:text-md text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-6"
                >
                    Logout
                </button>
            </div>
            
            <h2 className="md:text-xl text-md font-semibold mb-4">My Orders</h2>

            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
              <img 
                  src="/no-order.png" 
                  alt="No Orders" 
                  className="w-24 h-24 mb-4 opacity-60"
              />
              <p className="text-lg font-semibold">No orders yet!</p>
              <p className="text-sm mt-2">Looks like you haven’t placed any orders. Start shopping now and fill your cart with amazing products!</p>
              <a 
                  href="/shop"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                  Browse Products
              </a>
          </div>
          
            ) : (
                orders.map((order: any) => (
                    <div className='my-5 border shadow-sm' key={order._id}>
                        <div className="flex p-3  justify-between">
                            <div className="flex items-center space-x-4">
                                <img src="/received.png" className='h-10 w-10 object-contain' alt="" />
                                <div>
                                <p className='text-[12px] md:text-sm'>Order Received</p>
                               <span className='text-gray-800 text-[12px] md:text-sm'> {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} </span> 

                                </div>
                            </div>  
                            <MdOutlineKeyboardArrowRight className='text-2xl ' />  
                        </div>
                        <div className='w-full h-[1px] bg-gray-200'></div>
                        <div className="">
                        {order.products && order.products.length > 0 && (
                            <div className='p-3  mt-2'>
                                  <div className=' flex gap-3  relative'>
                                      {/* <div className="absolute text-[12px] font-bold text-gray-500 md:text-sm -right-2 -top-2 h-6 w-6 rounded-full bg-white border flex justify-center items-center">
                                           {order.products.length}
                                       </div> */}
                                       <img src={order.products[0].product.images[0]} alt="" className='w-16  h-20 object-cover' />
                                       <div className='py-2'>
                                       <p className='text-[12px] md:text-sm'>{order.products[0].product.name}</p>
                                       <p className='text-[12px] font-semibold md:text-sm text-black'><span className='font-semibold text-gray-500 pr-1'> Size:</span>{order.products[0].selectedSize}</p>
                                       </div>
                                     </div>
                                     <div className="flex mt-4 justify-between ">
                                        <Link to={`/order/${order.orderId}`}>
                                        <button className='w-28 px-3 md:text-sm text-[12px] py-2 hover:bg-black hover:text-white border bg-white text-black duration-500 transition-all'>View Order</button>
                                        </Link>                                     
                                    <button onClick={() => openCancelModal(order._id)}  className='w-28 px-3 py-2 text-[12px] md:text-sm hover:bg-black hover:text-white border bg-white text-black duration-500 transition-all'>Cancel Order</button>

                                     </div>

                                     </div>
                                            
                          )}
                           <div className='w-full mt-2  h-[1px] bg-gray-300'></div>
                        </div>
                    </div>
                ))
            )} 

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800">Cancel Order</h2>
                        <p className="text-gray-600 text-sm mt-2">Are you sure you want to cancel this order?</p>

                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full p-2 mt-3 border rounded-lg text-sm focus:ring focus:ring-red-300"
                            placeholder="Enter your reason here..."
                            required
                        ></textarea>

                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={closeCancelModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg text-sm"
                            >
                                No, Keep It
                            </button>
                            <button 
                                onClick={handleCancelOrder}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                            >
                                Yes, Cancel It
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
