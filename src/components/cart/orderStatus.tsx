import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import {Loader} from 'lucide-react';
export default function PaymentStatusPage() {
  const [status, setStatus] = useState<any>(null);
  const {orderid} = useParams();
  async function getPaymentStatus() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7 seconds timeout
  
    try {
      const res = await fetch(`https://stile-backend.vercel.app/payment/status/${orderid}`, {
        method: 'POST',
        signal: controller.signal, // Attach signal to abort fetch if needed
      });
  
      clearTimeout(timeout); // Clear timeout if request completes in time
  
      if (res.status === 404) {
        setStatus(false);
        return;
      }
  
      const data = await res.json();
  
      if (data.paymentStatus === 'SUCCESS') {
       
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (error:any) {
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
    <div className="flex items-center justify-center h-screen  p-4">
      {status === null ? (
         <div className="flex flex-col items-center justify-center space-y-4">
         {/* Animated Loader Icon */}
         <motion.div
           initial={{ rotate: 0 }}
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
           className="p-4 rounded-full border-4 border-t-blue-500 border-gray-300"
         >
           <Loader className="h-10 w-10 text-blue-500 animate-spin" />
         </motion.div>
   
         {/* Text with Gradient & Animation */}
         <motion.p
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="text-lg sm:text-2xl font-semibold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
         >
           Checking Payment Status...
         </motion.p>
       </div>
      ) : status ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <div className="text-center text-green-600">
    <p className="text-lg sm:text-2xl font-semibold flex items-center justify-center gap-2">
        🎉 Payment Successful! 🎉
    </p>
    <p className="text-sm sm:text-lg mt-2 text-gray-600">
        Thank you for shopping with <span className="font-semibold">Stile Sagio</span>! 🛍️  
        Your order is being processed, and we’ll send you a confirmation email shortly.  
    </p>
    <div className="mt-6 flex justify-center gap-5">
    <Link className="px-3 text-sm md:text-md rounded-md py-3 bg-black text-white border " to='/'>
    Shop More
    </Link>
    <Link className="px-3 text-sm md:text-md rounded-md py-3 bg-black text-white border " to={`/order/${orderid}`}>
    View Order
    </Link>
    </div>
</div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-center text-red-600">
    <p className="text-lg sm:text-2xl font-semibold flex items-center justify-center gap-2">
        Payment Failed!  
    </p>
    <p className="text-sm sm:text-lg mt-2 text-gray-600">
        Oops! Something went wrong with your payment. If the amount was deducted,  
        it will be refunded shortly. Please try again or use a different payment method.  
    </p>
</div>

        </motion.div>
      )}
    </div>
  );
}
