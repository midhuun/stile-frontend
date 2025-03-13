import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { FaCheckCircle } from 'react-icons/fa';
import { FaFaceSadCry } from 'react-icons/fa6';
const OrderSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState('Order Placed Successfully! 🎉');
  const [isfailed, setisfailed] = useState(false);
  async function clearCart() {
    const token = localStorage.getItem('token');
    await fetch('https://stile-backend.vercel.app/user/clearCart', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Send token in header
      },
      method: 'DELETE',
    });
  }

  useEffect(() => {
    const status = searchParams.get('txStatus') || '';
    if (status === 'SUCCESS') {
      setStatusMessage('Order Placed Successfully! 🎉');
      setShowConfetti(true);
    } else if (status === 'FAILED') {
      setShowConfetti(false);
      setisfailed(true);
      setStatusMessage('Payment Failed. Try again. ');
    } else {
      setShowConfetti(false);
      setStatusMessage('Payment is pending. Check back later. ⏳');
    }
    clearCart();
  }, [searchParams]);
  // Stop confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      {showConfetti && <Confetti />}
      {/* ✅ Animated Check Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`${isfailed ? 'bg-yellow-100' : 'bg-green-100'} p-4 rounded-full`}
      >
        {isfailed ? (
          <FaFaceSadCry className="md:w-16 md:h-16 h-8 w-8 text-yellow-600" />
        ) : (
          <FaCheckCircle className="md:w-16 md:h-16 h-8 w-8 text-green-600" />
        )}
      </motion.div>

      {/* ✅ Animated Order Success Message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="md:text-3xl text-md font-bold text-gray-800 mt-6"
      >
        {statusMessage}
      </motion.h1>

      {/* ✅ Subtext */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-gray-600 text-sm md:text-lg text-center max-w-lg mt-2"
      >
        {isfailed
          ? 'Oops! Your payment was not successful. If the amount was deducted, it will be refunded shortly. Please try again or use a different payment method. If you need assistance, feel free to contact our support team'
          : '  Thanks for shopping with Stile Sagio! We are processing your order and will send you a confirmation email shortly.'}
      </motion.p>

      {/* ✅ Order Details Section */}

      {/* ✅ Call-to-Action Buttons */}
      {isfailed ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex space-x-4 mt-6"
        >
          <Link to="/checkout">
            <button className="md:px-6 md:py-3 p-3 bg-blue-600 text-white rounded-lg font-medium text-sm md:text-lg shadow-md hover:bg-blue-700 transition">
              Try Again
            </button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex space-x-4 mt-6"
        >
          <Link to="/user/account">
            <button className="md:px-6 md:py-3 p-3 bg-blue-600 text-white rounded-lg font-medium text-sm md:text-lg shadow-md hover:bg-blue-700 transition">
              View Order
            </button>
          </Link>
          <Link to="/">
            <button className="md:px-6 md:py-3 p-3 bg-gray-800 text-white rounded-lg font-medium text-sm md:text-lg shadow-md hover:bg-gray-900 transition">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default OrderSuccess;
