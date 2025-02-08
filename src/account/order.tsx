import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/loading";
import { CiCalendar, CiCircleCheck } from "react-icons/ci";
import { BsCreditCard2Back } from "react-icons/bs";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { FaBoxOpen } from "react-icons/fa";
const OrderDetails = () => {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    async function getOrder() {
        try {
            const res = await fetch(`http://localhost:3000/order/${params.orderid}`, { credentials: 'include' });
            const data = await res.json();
            setOrder(data.order);
        } catch (error) {
            console.error("Error fetching order:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getOrder();
    }, []);

    if (loading) return <Loading />;
    if (!order) return <p className="text-center text-gray-500">No order found.</p>;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Order Details</h1>
                <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
            </div>

            {/* Order Status */}
            <div className="bg-green-50 rounded-md p-4 mb-6 flex items-center justify-center space-x-3">
            <CiCircleCheck className="text-green-500" />
                <p className="text-green-700 font-medium">Order Status: {order.status}</p>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Payment Details */}
                <div className="bg-blue-50 rounded-md p-4">
                    <h2 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <BsCreditCard2Back className="text-blue-400" />
                        <span>Payment Details</span>
                    </h2>
                    <p className="text-gray-600 text-sm">Payment Method: {order.paymentMethod?.toUpperCase()}</p>
                    <p className="text-gray-600 text-sm">Total Amount: ₹{order.totalAmount}</p>
                </div>

                {/* Order Date */}
                <div className="bg-yellow-50 rounded-md p-4">
                    <h2 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <CiCalendar className="text-yellow-400" />

                        <span>Order Date</span>
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : "N/A"}
                    </p>
                </div>
            </div>

            {/* Delivery Address */}
            {order.address && (
                <div className="bg-purple-50 rounded-md p-4 mb-6">
                    <h2 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <LiaMapMarkerAltSolid className="text-purple-400" />
                        <span>Delivery Address</span>
                    </h2>
                    <p className="text-gray-600 text-sm">Name: {order.address.name}</p>
                    <p className="text-gray-600 text-sm">Address: {order.address.Location}, {order.address.Apartment}</p>
                    <p className="text-gray-600 text-sm">City: {order.address.city}, {order.address.pincode}</p>
                    <p className="text-gray-600 text-sm">Mobile: {order.address.alternateMobile}</p>
                </div>
            )}

            {/* Ordered Products */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                <FaBoxOpen className="text-gray-400" />
                    <span>Ordered Products</span>
                </h2>
                {order.products && order.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.products.map((item:any) => (
                            <div key={item._id} className="bg-white rounded-md shadow-sm p-3">
                                <img
                                    src={item.product?.images[0] || ""}
                                    alt={item.product.product?.name || "Product"}
                                    className="w-full h-32 object-cover rounded-md mb-2"
                                />
                                <p className="text-sm font-medium text-gray-800">{item.product?.name}</p>
                                <p className="text-xs text-gray-600">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                                <p className="text-sm font-semibold text-gray-800">₹{item.product?.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No products found for this order.</p>
                )}
            </div>

        </div>
    );
};

export default OrderDetails;
