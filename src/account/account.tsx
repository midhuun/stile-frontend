
import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../context/appContext';
import { Link, useNavigate } from 'react-router-dom';

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

    // Open cancel modal
    const openCancelModal = (orderId: string) => {
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
        <div className="max-w-4xl mx-auto pt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold mb-6">My Account</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-blue-500 text-sm md:text-md text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-6"
                >
                    Logout
                </button>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
            ) : (
                orders.map((order: any) => (
                    <div key={order._id} className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 font-medium">Order Status: <span className="text-black">{order.status}</span></p>
                                <p className="text-sm text-gray-600 font-medium">Total: <span className="text-black font-semibold">₹{order.totalAmount}</span></p>
                                <p className="text-sm text-gray-600">Payment: {order.paymentMethod}</p>
                                
                                {order.products && order.products.length > 0 && (
                                    <div className='h-24 w-20 mt-2 relative'>
                                        <div className="absolute text-[12px] font-bold text-gray-500 md:text-sm -right-2 -top-2 h-6 w-6 rounded-full bg-white border flex justify-center items-center">
                                            {order.products.length}
                                        </div>
                                        <img src={order.products[0].product.images[0]} alt="" className='w-full h-full object-cover' />
                                    </div>
                                )}
                                
                                <div className='px-1 mt-3'>
                                    <div className='h-[1px] bg-gray-300'></div>
                                    <div className='flex mt-3 justify-between'>
                                        <p className="md:text-sm uppercase font-semibold text-xs text-gray-500 mt-2">Ordered on: 
                                            <span className='text-gray-800'> {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} </span> 
                                        </p> 
                                        <Link to={`/order/${order.orderId}`} className='w-[150px] text-center hidden md:block px-3 py-2 border bg-black text-white text-xs md:text-sm'>View Order</Link>
                                    </div>
                                    <div className='flex mt-3 justify-between'>
                                        <p className="md:text-sm uppercase font-semibold text-xs text-gray-500 mt-2">Order No: <span className='text-gray-800'>{order.orderId} </span> </p> 
                                        <button 
                                            onClick={() => openCancelModal(order.orderId)} 
                                            className='w-[150px] hidden md:block px-3 text-center py-2 border bg-black text-white text-xs md:text-sm'
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                    <div className='mt-3 flex justify-between'>
                                        <Link to={`/order/${order.orderId}`} className='w-[100px] md:hidden text-center px-3 py-2 border bg-black text-white text-xs  md:text-sm'>View Order</Link>
                                        <button className='w-[100px] md:hidden px-3 py-2 text-center border bg-black text-white text-xs  md:text-sm'>Cancel Order</button>
                                        </div>
                                </div>
                            </div>
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
