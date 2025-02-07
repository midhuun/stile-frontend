import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/loading";

const OrderDetails = () => {
    const [order, setOrder] = useState<any>(null); // Initialize as null to avoid errors
    const [loading, setLoading] = useState(true);
    const params = useParams();

    async function getOrder() {
        try {
            const res = await fetch(`https://stile-backend.vercel.app/order/${params.orderid}`,{credentials:'include'});
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
    }, []); // Dependency to re-fetch when order ID changes
   console.log(order)
    if (loading) return <Loading />;
    if (!order) return <p className="text-center text-gray-500">No order found.</p>;
    return (
        <div className="max-w-3xl mt-5 mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

            {/* Order Details */}
            {order && (
                <>
                    <div className="border-b pb-4">
                        <p className="text-gray-600 text-sm">
                            <strong>Order ID:</strong> {order.orderId}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Status:</strong> {order.status}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Payment Method:</strong> {order.paymentMethod?.toUpperCase()}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Total Amount:</strong> ₹{order.totalAmount}
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                            <strong>Ordered on:</strong>{" "}
                            {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                  })
                                : "N/A"}
                        </p>
                    </div>

                    {/* Address Details */}
                    {order.address && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
                            <p className="text-gray-600 text-sm">
                                <strong>Name:</strong> {order.address.name}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Address:</strong> {order.address.Location}, {order.address.Apartment}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>City:</strong> {order.address.city}, {order.pincode}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong>Mobile:</strong> {order.address.alternateMobile}
                            </p>
                        </div>
                    )}

                    {/* Ordered Products */}
                    <h2 className="text-lg font-semibold mt-6 mb-4">Ordered Products</h2>
                    {order.products && order.products.length > 0 ? (
                        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                            {order.products.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="border rounded-lg p-3 flex flex-col items-center justify-center gap-3 bg-gray-50"
                                >
                                    <img
                                        src={item.product?.images[0] || ""}
                                        alt={item.product.product?.name || "Product"}
                                        className="w-32 h-32 object-cover rounded-md"
                                    />
                                    <p className="text-sm font-medium mt-2">{item.product?.name}</p>
                                    <p className="text-xs text-gray-600">
                                        Size: {item.selectedSize} | Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800 mt-1">
                                        ₹{item.product?.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No products found for this order.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default OrderDetails;
