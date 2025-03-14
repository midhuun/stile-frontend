import { useState } from 'react';
import { CheckCircle, Clock, Package, Truck, Search } from 'lucide-react';

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState<any>(null);

  const handleTrackOrder = () => {
    const statuses = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setOrderStatus(randomStatus);
  };

  const statusSteps = [
    { status: 'Order Placed', icon: <Package />, active: orderStatus === 'Order Placed' },
    { status: 'Shipped', icon: <Truck />, active: orderStatus === 'Shipped' },
    { status: 'Out for Delivery', icon: <Clock />, active: orderStatus === 'Out for Delivery' },
    { status: 'Delivered', icon: <CheckCircle />, active: orderStatus === 'Delivered' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-4 md:p-8 w-full max-w-lg border border-gray-900">
        <h2 className="md:text-3xl text-xl font-extrabold text-gray-900 text-center ">
          Track Your Order
        </h2>
        <p className="text-gray-600 text-sm md:text-md text-center mt-2">
          Enter your tracking ID to see your order status
        </p>
        <div className="mt-6 flex gap-2 border-2 border-gray-900 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full p-2 text-sm md:text-md md:p-3 focus:outline-none text-gray-900"
          />
          <button
            onClick={handleTrackOrder}
            className="bg-gray-900 text-white px-6 flex items-center gap-2 hover:bg-gray-700 transition"
          >
            <Search size={20} />
          </button>
        </div>
        {orderStatus && (
          <div className="mt-8">
            <h3 className="text-md md:text-lg font-semibold text-gray-900 text-center">
              Order Status: <span className="text-gray-700">{orderStatus}</span>
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {statusSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 md:gap-4 p-2 md:p-4 rounded-lg transition-all border border-gray-900 ${
                    step.active ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div
                    className={`p-3 text-sm md:text-md rounded-full ${
                      step.active ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`text-sm md:text-md font-medium ${
                      step.active ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {step.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
