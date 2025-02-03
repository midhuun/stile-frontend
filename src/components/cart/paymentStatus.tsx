import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function clearCart() {
    await fetch("https://stile-backend-gnqp.vercel.app/user/clearCart", {
      credentials: 'include',
      method: 'DELETE'
    });
  }

  useEffect(() => {
    const status = searchParams.get("txStatus") || "";
    if (status === "SUCCESS") {
      setStatusMessage("Payment Successful! 🎉");
    } else if (status === "FAILED") {
      setStatusMessage("Payment Failed. Please try again. ❌");
    } else {
      setStatusMessage("Payment is pending. Check back later. ⏳");
    }
    
    clearCart();
    setIsLoading(false);
  }, [searchParams]);

  const animationVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const handleGoToOrders = () => {
    navigate("/user/account");
  };

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-gray-100"
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="p-8 shadow-lg rounded-2xl text-center max-w-md w-full bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Status</h2>
        {isLoading ? (
          <>
            <p className="text-gray-600 mb-6">
              Please wait while we check the status of your payment.
            </p>
            <motion.div
              className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full mx-auto animate-spin"
            ></motion.div>
          </>
        ) : (
          <motion.div
            className={`mt-4 text-lg font-semibold ${
              statusMessage.includes("Successful") ? "text-green-500" : 
              statusMessage.includes("Failed") ? "text-red-500" : 
              "text-yellow-500"
            }`}
            variants={animationVariants}
          >
            {statusMessage}
          </motion.div>
        )}
        <div className="mt-6">
          <button
            onClick={handleGoToOrders}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go to My Orders
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStatus;
