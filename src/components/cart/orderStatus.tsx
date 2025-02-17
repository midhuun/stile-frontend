import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function PaymentStatusPage() {
  const [status, setStatus] = useState<any>(null);
  const {orderid} = useParams();
   async function getPaymentStatus() {
    try{
     const res = await fetch(`https://stile-backend.vercel.app/payment/status/${orderid}`,{method:'POST'});
     const data = await res.json();
     if(res.status === 404){
      setStatus(false);
     }
     else if(data.length>0){
        if(data[0].paymentStatus === 'SUCCESS'){
            setStatus(true);
        }
        else {
            setStatus(false);
        }
     }
     else{
        setStatus(false);
     }
    }
    catch(error){
        console.log(error);
    }
   }
  useEffect(() => {
    getPaymentStatus();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen  p-4">
      {status === null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg sm:text-2xl"
        >
          Checking payment status...
        </motion.div>
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
