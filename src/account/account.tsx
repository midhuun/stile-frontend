import { apiUrl } from '../utils/api';
import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const statusColor = (status: string) => {
  const s = String(status || '').toLowerCase();
  if (s.includes('delivered')) return 'bg-emerald-100 text-emerald-700';
  if (s.includes('shipped') || s.includes('processing')) return 'bg-amber-100 text-amber-700';
  if (s.includes('cancel')) return 'bg-rose-100 text-rose-700';
  return 'bg-gray-100 text-gray-700';
};

const Account = () => {
  const { user, setisUserOpen } = useContext(HeaderContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  async function getOrders() {
    const token = localStorage.getItem('token');
    const res = await fetch(apiUrl(`/user/orders`), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setOrders(Array.isArray(data.orders) ? data.orders : []);
  }

  useEffect(() => {
    getOrders();
  }, [user]);

  async function handleLogout() {
    localStorage.clear();
    await fetch(apiUrl('/user/logout'), { method: 'POST', credentials: 'include' });
    setisUserOpen(false);
  }

  const openCancelModal = (orderId: string) => {
    setCancelOrderId(orderId);
    setShowCancelModal(true);
  };
  const closeCancelModal = () => {
    setCancelOrderId(null);
    setShowCancelModal(false);
    setCancelReason('');
  };

  async function handleCancelOrder() {
    if (!cancelOrderId || !cancelReason) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl(`/order/delete/${cancelOrderId}`), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: cancelReason, phone: user?.phone }),
      });
      if (!res.ok) throw new Error('Failed to cancel order');
      closeCancelModal();
      getOrders();
    } catch (err) {
      console.error('Error canceling order:', err);
    }
  }

  const computeTotal = (order: any) => {
    if (order?.totalAmount) return order.totalAmount;
    try {
      return (order?.products || []).reduce(
        (sum: number, it: any) => sum + ((it?.product?.discountedPrice ?? it?.product?.price ?? 0) * (it?.quantity || 0)),
        0
      );
    } catch {
      return 0;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      {/* Heading */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">My Account</h1>
          <p className="text-sm text-gray-500">Welcome{user?.name ? `, ${user.name}` : ''}</p>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:opacity-90">
          Logout
        </button>
      </div>

      {/* Orders */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold">Order History</h2>
        <span className="text-sm text-gray-500">{orders.length} order(s)</span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <img src="/no-order.png" alt="No Orders" className="w-20 h-20 mx-auto mb-3 opacity-70" />
          <h3 className="font-semibold">No orders yet</h3>
          <p className="text-sm text-gray-500 mt-1">Start shopping and your orders will show up here.</p>
          <a href="/products/all" className="inline-block mt-4 px-4 py-2 rounded-lg bg-black text-white text-sm">Browse products</a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                    {order.status || 'Processing'}
                  </div>
                  <div className="text-sm text-gray-600">Order ID: <span className="font-medium text-gray-800">{order.orderId}</span></div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              {/* Items preview */}
              <div className="mt-3 flex items-start gap-3">
                <div className="flex -space-x-2">
                  {(order.products || []).slice(0, 4).map((it: any, idx: number) => (
                    <img key={idx} src={it?.product?.images?.[0]} alt={it?.product?.name} className="w-12 h-12 rounded-md border object-cover object-top bg-white" />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-800 truncate">{order.products?.[0]?.product?.name}</div>
                  <div className="text-xs text-gray-500">{order.products?.length} item(s)</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-semibold">₹{computeTotal(order)}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <Link to={`/order/${order.orderId}`} className="inline-flex items-center justify-center px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">
                  View details
                </Link>
                <button onClick={() => openCancelModal(order._id)} className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">
                  Cancel order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold">Cancel Order</h3>
            <p className="text-sm text-gray-600 mt-1">Tell us why you’re canceling this order.</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full mt-3 p-3 rounded-lg border focus:ring-2 focus:ring-rose-200"
              placeholder="Enter your reason..."
            />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={closeCancelModal} className="px-4 py-2 rounded-lg border text-sm">Keep order</button>
              <button onClick={handleCancelOrder} className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm">Confirm cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
