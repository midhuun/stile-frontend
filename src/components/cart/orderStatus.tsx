import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function PaymentStatusPage() {
  const [status, setStatus] = useState<any>(null);
  const {orderid} = useParams();
   async function getPaymentStatus() {
    try{
     const res = await fetch(`https://stile-backend.vercel.app/payment/status/${orderid}`,{method:'POST'});
     const data = await res.json();
     if(data.length>0){
        if(status[0].paymentStatus === 'SUCCESS'){
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
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
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
          <p className="text-lg sm:text-2xl font-semibold">Payment Successful!</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg sm:text-2xl font-semibold">Payment Failed. Try Again.</p>
        </motion.div>
      )}
    </div>
  );
}
