import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/loading/loading';
import { CiCalendar, CiCircleCheck } from 'react-icons/ci';
import { BsCreditCard2Back } from 'react-icons/bs';
import { LiaMapMarkerAltSolid } from 'react-icons/lia';
import { FaBoxOpen } from 'react-icons/fa';

const OrderDetails = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  async function getOrder() {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://stile-backend-rvmk.vercel.app/order/${params.orderid}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token in header
        },
      });
      const data = await res.json();
      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
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
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-medium text-gray-700">{order.orderId}</span>
        </p>
      </div>

      {/* Order Status */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-6">
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full 
                    ${
                      order.status === 'Delivered'
                        ? 'bg-green-200 text-green-700'
                        : order.status === 'Shipped'
                        ? 'bg-yellow-200 text-yellow-700'
                        : 'bg-red-200 text-red-700'
                    }`}
        >
          {order.status}
        </span>
        <CiCircleCheck className="text-xl text-green-600" />
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Payment Details */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700 flex items-center space-x-2 mb-2">
            <BsCreditCard2Back className="text-blue-500" />
            <span>Payment Details</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Payment Method: <strong>{order.paymentMethod?.toUpperCase()}</strong>
          </p>
          <p className="text-gray-600 text-sm">
            Total Amount: <strong>₹{order.totalAmount}</strong>
          </p>
        </div>

        {/* Order Date */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700 flex items-center space-x-2 mb-2">
            <CiCalendar className="text-yellow-500" />
            <span>Order Date</span>
          </h2>
          <p className="text-gray-600 text-sm">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'N/A'}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      {order.address && (
        <div className="p-4 border rounded-lg shadow-sm mb-6">
          <h2 className="font-semibold text-gray-700 flex items-center space-x-2 mb-2">
            <LiaMapMarkerAltSolid className="text-purple-500" />
            <span>Delivery Address</span>
          </h2>
          <p className="text-gray-600 text-sm">
            <strong>{order.address.name}</strong>
          </p>
          <p className="text-gray-600 text-sm">
            {order.address.Location}, {order.address.Apartment}
          </p>
          <p className="text-gray-600 text-sm">
            {order.address.city}, {order.address.pincode}
          </p>
          <p className="text-gray-600 text-sm">Mobile: {order.address.alternateMobile}</p>
        </div>
      )}

      {/* Ordered Products */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
          <FaBoxOpen className="text-gray-500" />
          <span>Ordered Products</span>
        </h2>
        {order.products && order.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.products.map((item: any) => (
              <div
                key={item._id}
                className="border rounded-lg shadow-sm p-3  bg-white hover:shadow-md transition-all duration-200"
              >
                <img
                  src={item.product?.images[0] || ''}
                  alt={item.product?.name || 'Product'}
                  className="w-1/2 h-36 object-cover object-top rounded-md mb-2"
                />
                <p className="text-sm font-semibold text-gray-800">{item.product?.name}</p>
                <p className="text-xs text-gray-600">
                  Size: {item.selectedSize} | Qty: {item.quantity}
                </p>
                <p className="text-sm font-semibold text-gray-900">₹{item.product?.price}</p>
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
