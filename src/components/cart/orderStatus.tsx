import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, FileText, Loader, ShoppingBag, XCircle } from 'lucide-react';
export default function PaymentStatusPage() {
  const [status, setStatus] = useState<any>(null);
  const { orderid } = useParams();
  async function getPaymentStatus() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7 seconds timeout

    try {
      const res = await fetch(`https://stile-backend-rvmk.vercel.app/payment/status/${orderid}`, {
        method: 'POST',
        signal: controller.signal, // Attach signal to abort fetch if needed
      });

      clearTimeout(timeout); // Clear timeout if request completes in time

      if (res.status === 404) {
        setStatus(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request timed out');
      } else {
        console.error(error);
      }
      setStatus(false);
    }
  }

  useEffect(() => {
    getPaymentStatus();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      {status === null ? (
        // Loading State with Enhanced Animation
        <motion.div
          className="flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-md w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="p-1"
            >
              <Loader className="h-16 w-16 text-blue-500" />
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center space-y-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Verifying Order
            </h2>
            <p className="text-gray-500 text-sm md:text-md">
              Please wait while we process your transaction
            </p>
          </motion.div>
        </motion.div>
      ) : status ? (
        // Success State with Enhanced Animation
        <motion.div
          className="p-8 bg-white rounded-xl shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              className="relative mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-green-100 rounded-full opacity-30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              />
              <CheckCircle className="md:w-20 md:h-20 h-16 w-16 text-green-500" />
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="md:text-2xl text-lg font-bold text-gray-800">
                  Order Placed Successfully
                </h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mt-2 mb-4"
                />
              </motion.div>

              <p className="text-gray-600 text-sm md:text-md">
                Thank you for shopping with <span className="font-semibold">Stile Sagio</span>! Your
                order is being processed, and we'll send you a confirmation email shortly.
              </p>

              <motion.div
                className="mt-8 grid grid-cols-2 gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  className="px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 font-medium"
                  to="/"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm md:text-md">Shop </span>
                </Link>
                <Link
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 font-medium"
                  to={`/order/${orderid}`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm md:text-md">View </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        // Failure State with Enhanced Animation
        <motion.div
          className="p-8 bg-white rounded-xl shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <XCircle className="md:w-20 md:h-20 h-16 w-16 text-red-500" />
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800">Payment Failed</h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full mx-auto mt-2 mb-4"
                />
              </motion.div>

              <p className="text-gray-600 text-sm md:text-md">
                Oops! Something went wrong with your payment. If the amount was deducted, it will be
                refunded shortly. Please try again or use a different payment method.
              </p>

              <motion.div
                className="mt-8 flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  className="px-6 md:text-md text-sm py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 font-medium"
                  to="/checkout"
                >
                  Try Again
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
