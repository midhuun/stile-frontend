import { useState } from 'react';
import { Search, XCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const handleTrackOrder = async () => {
    if (!trackingId) {
      toast.error('Order tracking ID is required');
      return;
    }
    setLoading(true);
    setOrderStatus(null);
    try {
      const res = await fetch('https://stile-backend-rvmk.vercel.app/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: trackingId }),
      });
      if (!res.ok) throw new Error('Failed to fetch order details');
      const data = await res.json();
      console.log(data[trackingId]);
      if (!data || data.length === 0) {
        setNotFound(true);
      } else if (data[trackingId]?.tracking_data.track_status === 0) {
        setNotFound(true);
      } else {
        setOrderStatus(data[trackingId].tracking_data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full max-w-xl border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Track Your Order
        </h2>
        <p className="text-gray-600 text-sm md:text-md text-center mt-2">
          Enter your tracking ID to check the status
        </p>
        <div className="mt-6 flex gap-2 border border-gray-300 rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full p-3 text-md focus:outline-none text-gray-900"
          />
          <button
            onClick={handleTrackOrder}
            className="bg-gray-900 text-white px-6 flex items-center gap-2 hover:bg-gray-700 transition-all"
            disabled={loading}
          >
            {loading ? '...' : <Search size={20} />}
          </button>
        </div>

        {notFound && (
          <div className="mt-6 flex flex-col items-center bg-red-100 p-4 rounded-lg border border-red-300">
            <XCircle className="text-red-500 w-12 h-12" />
            <h3 className="text-lg font-semibold text-red-600 mt-2">Order Not Found</h3>
            <p className="text-gray-600 text-sm text-center">
              Please check your tracking ID and try again.
            </p>
          </div>
        )}

        {orderStatus && orderStatus.track_status !== 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Order Status: {orderStatus.shipment_track[0].current_status}
            </h3>
            <p className="text-gray-600 mt-1">
              Shipped to:{' '}
              <span className="font-medium">{orderStatus.shipment_track[0].destination}</span>
            </p>
            <p className="text-gray-600">
              Estimated Delivery: <span className="font-medium">{orderStatus.etd}</span>
            </p>
            <p className="text-gray-600">
              Tracking Link:{' '}
              <a href={orderStatus.track_url} target="_blank" className="text-blue-600 underline">
                View Tracking
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
