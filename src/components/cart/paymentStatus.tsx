import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import { FaCheckCircle } from "react-icons/fa";
const OrderSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Order Placed Successfully! 🎉");
  async function clearCart() {
    await fetch("https://stile-backend.vercel.app/user/clearCart", {
      credentials: 'include',
      method: 'DELETE'
    });
  }

  useEffect(() => {
    const status = searchParams.get("txStatus") || "";
    if (status === "SUCCESS") {
      setStatusMessage("Order Placed Successfully! 🎉");
      setShowConfetti(true);
    } else if (status === "FAILED") {
      setShowConfetti(false);
      setStatusMessage("Payment Failed. Please try again. ❌");
    } else {
      setShowConfetti(false);
      setStatusMessage("Payment is pending. Check back later. ⏳");
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
      {showConfetti &&  <Confetti />}

      {/* ✅ Animated Check Icon */}
      {showConfetti && 
       <motion.div
       initial={{ scale: 0 }}
       animate={{ scale: 1 }}
       transition={{ duration: 0.5, ease: "easeOut" }}
       className="bg-green-100 p-4 rounded-full"
     >
       <FaCheckCircle  className="md:w-16 md:h-16 h-8 w-8 text-green-600" />
     </motion.div>
      }


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
        className="text-gray-600 text-xs md:text-lg text-center max-w-lg mt-2"
      >
        Thanks for shopping with Stile Sagio! We are processing your order and will send you a confirmation email shortly.
      </motion.p>

      {/* ✅ Order Details Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-md"
      >
        <h2 className="md:text-xl text-md font-semibold text-gray-700">Order Summary</h2>
        <div className="mt-4 text-sm md:text-md space-y-2">
          <p className="text-gray-600">
            <strong>Order ID:</strong> #123456789
          </p>
          <p className="text-gray-600">
            <strong>Total Amount:</strong> ₹1,299.00
          </p>
          <p className="text-gray-600">
            <strong>Estimated Delivery:</strong> 5-7 Business Days
          </p>
        </div>
      </motion.div>

      {/* ✅ Call-to-Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex space-x-4 mt-6"
      >
        <Link to="/orders">
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
    </div>
  );
};

export default OrderSuccess;