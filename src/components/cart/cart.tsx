import { apiUrl } from '../../utils/api';
// @ts-nocheck
import React, { useContext, useEffect, useRef, useState } from 'react';
import { HeaderContext } from '../../context/appContext';
import { getCart } from '../../utils/getItems';
import { useDispatch, useSelector } from 'react-redux';
import { setcart } from '../../store/reducers/cartReducer';
import { RootState } from '../../store/store';
import { BsCashCoin } from 'react-icons/bs';
import { load as loadCashfree } from '@cashfreepayments/cashfree-js';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
// removed heavy product query – not needed in checkout view

import 'react-toastify/dist/ReactToastify.css';

type CartItem = {
  _id?: string;
  quantity: number;
  selectedSize?: string;
  product?: {
    _id?: string;
    name?: string;
    images?: string[];
    discountedPrice?: number;
    price?: number;
  };
};

const initialErrors: any = {
  name: '',
  location: '',
  city: '',
  state: '',
  pincode: '',
  area: '',
  alternateMobile: '',
  email: '',
};

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart: CartItem[] = useSelector((s: RootState) => s.Cart || []);
  const { user, isAuthenticated } = useContext(HeaderContext);
  const navigate = useNavigate();

  // UI & form state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod' | 'none'>('card');
  const [address, setAddress] = useState<any>({});
  const [pincode, setPincode] = useState<string>('');
  const [postOffices, setPostOffices] = useState<string[]>([]);
  const [useCustomArea, setUseCustomArea] = useState(false);
  const [loadingPin, setLoadingPin] = useState(false);
  const [pinError, setPinError] = useState('');
  const [errors, setErrors] = useState<any>(initialErrors);
  const [processing, setProcessing] = useState(false);
  const [expandItems, setExpandItems] = useState(false);

  const cashfreeRef = useRef<any>(null);
  const abortPinFetchRef = useRef<AbortController | null>(null);

  // No product query here to keep checkout light

  // Load cart from getCart when auth changes (or on mount)
  useEffect(() => {
    (async () => {
      try {
        const items = await getCart();
        dispatch(setcart(items));
      } catch (err) {
        console.error('getCart error', err);
      }
    })();
  }, [isAuthenticated, dispatch]);

  // Initialize Cashfree SDK once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const sdk = await loadCashfree({ mode: 'production' });
        if (mounted) cashfreeRef.current = sdk;
      } catch (err) {
        console.warn('Cashfree SDK failed to load', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Debounced Pin code lookup using India Post API with AbortController
  useEffect(() => {
    const pin = String(pincode || '').trim();
    if (!pin || pin.length !== 6 || /\D/.test(pin)) {
      setPostOffices([]);
      setPinError(pin.length === 0 ? '' : 'Enter a 6-digit pincode');
      return;
    }

    setLoadingPin(true);
    setPinError('');
    if (abortPinFetchRef.current) abortPinFetchRef.current.abort();
    const ac = new AbortController();
    abortPinFetchRef.current = ac;

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, { signal: ac.signal });
        const data = await res.json();
        const entry = Array.isArray(data) ? data[0] : null;
        if (entry?.Status === 'Success' && Array.isArray(entry.PostOffice) && entry.PostOffice.length) {
          const names: string[] = Array.from(
            new Set(
              entry.PostOffice
                .map((po: any) => (po?.Name ? String(po.Name) : ''))
                .filter((n: string) => n && n.trim().length > 0)
            )
          );
          setPostOffices(names);
          const state = entry.PostOffice[0]?.State || '';
          const district = entry.PostOffice[0]?.District || '';
          setAddress((prev: any) => ({ ...prev, state: state || prev?.state, city: district || prev?.city }));
          setPinError('');
        } else {
          setPostOffices([]);
          setPinError('Invalid pincode');
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setPinError('Could not verify pincode');
        }
      } finally {
        setLoadingPin(false);
      }
    }, 450); // debounce

    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [pincode]);

  // Totals
  const calculateSubtotal = () =>
    (cart || []).reduce((acc: number, it: CartItem) => acc + ((it.product?.discountedPrice || 0) * (it.quantity || 0)), 0);
  const originalSubtotal = (cart || []).reduce((acc: number, it: CartItem) => acc + ((it.product?.price || 0) * (it.quantity || 0)), 0);
  const savings = Math.max(0, originalSubtotal - calculateSubtotal());
  const shippingCharge = paymentMethod === 'cod' ? 100 : 0;
  const totalAmount = calculateSubtotal() + shippingCharge;

  // Simple client-side validation
  function validateAddress(requireEmailForOnline = true) {
    const next = { ...initialErrors };
    let ok = true;
    if (!address?.name || String(address.name).trim() === '') {
      next.name = 'Full name is required';
      ok = false;
    }
    if (!address?.location || String(address.location).trim() === '') {
      next.location = 'Address is required';
      ok = false;
    }
    if (!address?.city || String(address.city).trim() === '') {
      next.city = 'City is required';
      ok = false;
    }
    if (!address?.state || String(address.state).trim() === '') {
      next.state = 'State is required';
      ok = false;
    }
    if (!pincode || String(pincode).length !== 6 || /\D/.test(String(pincode))) {
      next.pincode = 'Enter valid 6-digit pincode';
      ok = false;
    }
    if (!useCustomArea && postOffices.length > 0) {
      if (!address?.area || String(address.area).trim() === '') {
        next.area = 'Choose an area from suggestions';
        ok = false;
      }
    } else {
      if (!address?.area || String(address.area).trim() === '') {
        next.area = 'Area / Locality is required';
        ok = false;
      }
    }
    if (address?.alternateMobile && /\D/.test(String(address.alternateMobile))) {
      next.alternateMobile = 'Alternate mobile should contain digits only';
      ok = false;
    }
    if (requireEmailForOnline && paymentMethod !== 'cod') {
      // Basic email check if online payment
      if (!address?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(address.email))) {
        next.email = 'Enter a valid email for payment';
        ok = false;
      }
    }
    setErrors(next);
    return ok;
  }

  // Payment status polling helper
  const pollPaymentStatus = (orderid: string, maxAttempts = 10, interval = 5000) => {
    let attempts = 0;
    const id = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(id);
        setProcessing(false);
        toast.error('Payment verification timed out. Please check your orders.');
        return;
      }
      try {
        const res = await fetch(apiUrl(`/payment/status/${orderid}`), { method: 'POST' });
        const data = await res.json();
        // handle response shape gracefully
        const arr = Array.isArray(data) ? data : (data?.status ? [data] : []);
        if (arr && arr.length > 0) {
          const status = arr[0].paymentStatus || arr[0].status || '';
          if (String(status).toUpperCase() === 'SUCCESS') {
            clearInterval(id);
            setProcessing(false);
            toast.success('Payment successful!');
            navigate(`/checkout/${orderid}`);
            return;
          } else if (String(status).toUpperCase() === 'FAILED') {
            clearInterval(id);
            setProcessing(false);
            toast.error('Payment failed. Please try again.');
            navigate(`/checkout/${orderid}`);
            return;
          }
        }
      } catch (err) {
        console.error('pollPaymentStatus error', err);
      }
    }, interval);

    // return function to cancel
    return () => clearInterval(id);
  };

  // Called when Cashfree returns token + order id from server
  const beginCheckout = async (token: string, orderid: string) => {
    // Persist order server-side (we want to save user order right before redirecting)
    try {
    const bearer = localStorage.getItem('token');
      await fetch(apiUrl('/user/order'), {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify({
        products: cart,
          totalAmount,
        paymentMethod,
        address,
        pincode,
        orderId: orderid,
          email: address?.email || '',
      }),
    });
    } catch (err) {
      // still attempt checkout — but inform user
      console.warn('Failed to create order before checkout', err);
    }

    // Call Cashfree checkout (if SDK available)
    if (!cashfreeRef.current) {
      toast.error('Payment gateway not ready. Try again later.');
      setProcessing(false);
      return;
    }
    try {
      const checkoutOptions = { paymentSessionId: token, redirectTarget: '_self' };
      cashfreeRef.current.checkout(checkoutOptions).then((result: any) => {
        if (result?.error) {
          console.error('Cashfree checkout error', result.error);
          toast.error('Payment failed to initialize');
        }
      });
    } catch (err) {
      console.error('Cashfree checkout exception', err);
      toast.error('Payment initiation failed');
      setProcessing(false);
      return;
    }

    // Start polling to verify payment when user returns (we still poll now)
    pollPaymentStatus(orderid);
  };

  // Primary handler when user clicks Pay Now
  const handlePayNow = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Validate address + cart
    if (!cart || cart.length === 0) {
      toast.warning('Your cart is empty.');
      return;
    }
    const ok = validateAddress(true);
    if (!ok) {
      toast.warning('Please complete the highlighted fields before proceeding.');
      return;
    }

    // COD flow: create order server-side and navigate to checkout
    if (paymentMethod === 'cod') {
      setProcessing(true);
      try {
    const token = localStorage.getItem('token');
        const orderid = new Date().getTime().toString();
        const res = await fetch(apiUrl('/user/order'), {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
            orderId: orderid,
            products: cart,
            totalAmount: totalAmount,
            paymentMethod,
            address,
            pincode,
            email: address?.email || '',
      }),
    });
        await res.json();
        setProcessing(false);
        navigate(`/checkout/${orderid}`);
      } catch (err) {
        console.error('COD order error', err);
        setProcessing(false);
        toast.error('Could not place the order. Try again.');
      }
      return;
    }
    
    // Online payment: initiate payment with backend to get token+orderId
    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(apiUrl('/user/payment'), {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: address.name,
          email: address.email || '',
          amount: calculateSubtotal(),
          phone: address.alternateMobile || user?.phone || '',
        }),
      });
      const data = await res.json();
      if (!data?.order_id || !data?.token) {
        throw new Error('Invalid payment init response');
      }
      // create server-side order + begin cashfree checkout
      await beginCheckout(data.token, data.order_id);
    } catch (err) {
      console.error('Payment init error', err);
      toast.error('Failed to initialize payment. Try again.');
      setProcessing(false);
    }
  };

  // Simple UI building blocks
  const FieldError: React.FC<{ msg?: string }> = ({ msg }) => {
    if (!msg) return null;
    return <p className="text-xs text-red-600 mt-1">{msg}</p>;
  };

  // Empty cart view
  if (!cart || cart.length < 1) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <img src="/cart.png" alt="empty cart" className="w-28 h-28 md:w-44 md:h-44" />
        <h2 className="text-2xl font-semibold mt-6">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="mt-6 px-6 py-2 bg-black text-white rounded-lg shadow">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-10">
      <ToastContainer position="top-right" autoClose={2500} theme="light" transition={Slide} />

      {/* Page Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Shipping form */}
        <div className="md:col-span-2 bg-white shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Shipping Address</h1>
            <div className="text-sm text-gray-500">Secure • Fast delivery across India</div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Full name <span className="text-red-500">*</span></label>
            <input
              type="text"
                  value={address?.name || ''}
                  onChange={(e) => setAddress((p: any) => ({ ...p, name: e.target.value }))}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-indigo-200 ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="John Doe"
                />
                <FieldError msg={errors.name} />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
            <input
                  type="email"
                  value={address?.email || ''}
                  onChange={(e) => setAddress((p: any) => ({ ...p, email: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm border-gray-200 focus:ring-2 focus:ring-indigo-200"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Address <span className="text-red-500">*</span></label>
            <input
              autoComplete="street-address"
                value={address?.location || ''}
                onChange={(e) => setAddress((p: any) => ({ ...p, location: e.target.value }))}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm ${
                  errors.location ? 'border-red-400' : 'border-gray-200'
                } focus:ring-2 focus:ring-indigo-200`}
                placeholder="Flat, house no., building, street..."
              />
              <FieldError msg={errors.location} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">City <span className="text-red-500">*</span></label>
            <input
              autoComplete="address-level2"
                  value={address?.city || ''}
                  onChange={(e) => setAddress((p: any) => ({ ...p, city: e.target.value }))}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm ${
                    errors.city ? 'border-red-400' : 'border-gray-200'
                  } focus:ring-2 focus:ring-indigo-200`}
                  placeholder="City"
                />
                <FieldError msg={errors.city} />
              </div>

              <div>
                <label className="block text-sm font-medium">State <span className="text-red-500">*</span></label>
            <input
              autoComplete="address-level1"
                  value={address?.state || ''}
                  onChange={(e) => setAddress((p: any) => ({ ...p, state: e.target.value }))}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm ${
                    errors.state ? 'border-red-400' : 'border-gray-200'
                  } focus:ring-2 focus:ring-indigo-200`}
                  placeholder="State"
                />
                <FieldError msg={errors.state} />
              </div>

              <div>
                <label className="block text-sm font-medium">Pincode <span className="text-red-500">*</span></label>
            <input
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm ${
                    errors.pincode ? 'border-red-400' : 'border-gray-200'
                  } focus:ring-2 focus:ring-indigo-200`}
                  placeholder="6-digit PIN code"
                />
                {loadingPin ? (
                  <p className="text-xs text-gray-500 mt-1">Checking pincode…</p>
                ) : pinError ? (
                  <p className="text-xs text-red-600 mt-1">{pinError}</p>
                ) : postOffices.length > 0 ? (
                  <p className="text-xs text-green-600 mt-1">Delivery available to this pincode</p>
                ) : null}
                <FieldError msg={errors.pincode} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div>
                <label className="block text-sm font-medium">Area / Locality <span className="text-red-500">*</span></label>
                {!useCustomArea && postOffices.length > 0 ? (
                  <select
                    value={address?.area || ''}
                    onChange={(e) => setAddress((p: any) => ({ ...p, area: e.target.value }))}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm ${
                      errors.area ? 'border-red-400' : 'border-gray-200'
                    } focus:ring-2 focus:ring-indigo-200`}
                  >
                    <option value="">Select area</option>
                    {postOffices.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                ) : (
            <input
                    value={address?.area || ''}
                    onChange={(e) => setAddress((p: any) => ({ ...p, area: e.target.value }))}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 bg-white shadow-sm ${
                      errors.area ? 'border-red-400' : 'border-gray-200'
                    } focus:ring-2 focus:ring-indigo-200`}
                    placeholder="Area / locality"
                  />
                )}
                <div className="mt-1">
                  {postOffices.length > 0 && (
                <button
                      type="button"
                      onClick={() => setUseCustomArea(!useCustomArea)}
                      className="text-xs text-indigo-600 underline"
                    >
                      {useCustomArea ? 'Choose from suggestions' : 'Enter area manually'}
                </button>
              )}
                </div>
                <FieldError msg={errors.area} />
              </div>

              <div>
                <label className="block text-sm font-medium">Alternate mobile</label>
                <input
                  inputMode="tel"
                  value={address?.alternateMobile || ''}
                  onChange={(e) => setAddress((p: any) => ({ ...p, alternateMobile: e.target.value }))}
                  className="mt-[26px] md:mt-[26px] block w-full rounded-lg border px-3 py-2 bg-white shadow-sm border-gray-200 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Optional"
                />
                <FieldError msg={errors.alternateMobile} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-gray-500">
                Delivering to <span className="font-medium">{address?.city || '—'}</span>,{' '}
                <span className="font-medium">{address?.state || '—'}</span>
              </div>
              {/* Pay now moved to right side (summary) — keep small helper */}
              <div className="text-xs text-gray-400">All fields secure & encrypted</div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary & Payment */}
        <aside className="bg-white shadow-sm rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <p className="text-sm text-gray-500">{cart.length} item(s)</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Subtotal</div>
              <div className="font-bold text-lg">Rs. {calculateSubtotal()}</div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setExpandItems(!expandItems)}
              className="text-sm text-indigo-600 underline"
            >
              {expandItems ? 'Hide items' : 'View items'} ({cart.length})
            </button>
            {expandItems && (
              <div className="divide-y mt-2">
                {cart.map((it) => (
                  <div key={it._id || `${it.product?._id}-${Math.random()}`} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.product?.images?.[0] || '/placeholder.png'}
                        alt={it.product?.name || 'product'}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{it.product?.name}</div>
                        <div className="text-xs text-gray-500">Size: {it.selectedSize || '—'}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">Rs. {(it.product?.discountedPrice || 0) * (it.quantity || 0)}</div>
                  </div>
                ))}
              </div>
            )}
              </div>

          <div className="pt-4 border-t" />

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <div>Subtotal</div>
              <div>Rs. {calculateSubtotal()}</div>
                </div>

            {savings > 0 && (
              <div className="flex justify-between text-sm text-green-700">
                <div>You saved</div>
                <div>− Rs. {savings}</div>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-600">
              <div>Shipping</div>
              <div className={shippingCharge === 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {shippingCharge === 0 ? 'Free' : `Rs. ${shippingCharge}`}
              </div>
                </div>

            <div className="flex justify-between text-lg font-bold">
              <div>Total</div>
              <div>Rs. {totalAmount}</div>
                        </div>
                      </div>

          <div className="pt-2">
            {/* Payment options (visually elevated) */}
            <div className="grid grid-cols-2 gap-2">
              <label className={`p-3 rounded-lg border cursor-pointer ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" name="pay" className="hidden" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <div className="flex items-center gap-2">
                  <img src="/card.png" alt="card" className="w-6 h-6" />
                  <div className="text-sm font-medium">Card</div>
                        </div>
              </label>
              <label className={`p-3 rounded-lg border cursor-pointer ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" name="pay" className="hidden" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                <div className="flex items-center gap-2">
                  <img src="/upi.svg" alt="upi" className="w-6 h-6" />
                  <div className="text-sm font-medium">UPI</div>
                      </div>
                    </label>
              <label className={`p-3 rounded-lg border cursor-pointer ${paymentMethod === 'netbanking' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" name="pay" className="hidden" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                <div className="flex items-center gap-2">
                  <img src="/net.png" alt="netbanking" className="w-6 h-6" />
                  <div className="text-sm font-medium">Netbanking</div>
                      </div>
                    </label>
              <label className={`p-3 rounded-lg border cursor-pointer ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" name="pay" className="hidden" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <div className="flex items-center gap-2">
                  <BsCashCoin className="w-5 h-5" />
                  <div className="text-sm font-medium">Cash on Delivery</div>
                      </div>
                    </label>
                  </div>
                </div>

          <div className="pt-4">
            <button
              onClick={handlePayNow}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:brightness-95 transition"
              aria-label="Pay now"
            >
              {processing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Processing…
                </div>
              ) : paymentMethod === 'cod' ? 'Place Order (COD)' : 'Pay Now'}
                </button>

            <p className="text-xs text-gray-400 mt-3">
              Secure payment • 30 days return on eligible items • We’ll notify you on WhatsApp and email.
                </p>
              </div>
        </aside>
      </div>

      {/* Overlay when processing (full-screen) */}
      {processing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="w-20 h-20 rounded-full border-4 border-indigo-200 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
            </div>
            <div className="text-center">
              <div className="font-semibold">Processing your payment</div>
              <div className="text-sm text-gray-500 mt-1">Do not close this tab. We are finalizing your order.</div>
            </div>
          </div>
        </div>
      )}

      {/* Very small responsive spacer at bottom for mobile (so CTA isn't hidden) */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default CartPage;
