//@ts-nocheck
import React, { useContext, useState } from "react";
import { HeaderContext } from "../../context/appContext";
import { motion } from "framer-motion";
import Logo from '../../assets/logo.png';
import validator from "validator";
import { auth } from "../../firestore/store";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../toastStyle.css';
const OtpLoginPopup = () => {
  const [email, setemail] = useState<any>("");
  const [otp, setOtp] = useState<any>(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState<any>(false); // State to track if OTP is sent
  const { isUserOpen, setisUserOpen,isAuthenticated,setisAuthenticated } = useContext<any>(HeaderContext);
  const [isverifying,setisverifying] = useState<any>(false);
  const [iserror, setiserror] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [btnmsg,setBtnmsg] = useState<any>("Login");
  async function onOTPVerify() {
    try{
    const res = await fetch('https://stile-backend.vercel.app/verify-otp',{method:'POST',headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({otp:otp.join(""),email})
  })
    console.log(res.status);
    const data = await res.json();
    if(res.status === 200){
      toast.success("OTP Verified Successfully ✅", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const data = await fetch("https://stile-backend.vercel.app/user/login",{method:'POST',credentials:'include',headers:{
        'Content-Type': 'application/json',
      },body:JSON.stringify({email:email})
    })
      const user = await data.json();
      if(data.status === 200){
        setisAuthenticated(true);
        setisUserOpen(false);
      }
      else{
        toast.error("Error Login ⚠️", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    else{
      toast.error("Enter Valid OTP ⚠️", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setiserror(true);
      seterror("Invalid OTP");
    }
  }
  catch(err){
    console.log(err);
  }
  }
  async function onSignup(e) {
    e.preventDefault();
    setBtnmsg("Sending OTP");
    try {
        if (!validator.isEmail(email)) {
            setiserror(true);
            seterror("Invalid Email Address"); // ✅ Corrected message
            toast.error("Enter Valid Email Id", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
                setiserror(false);
            }, 2500);
            throw new Error("Enter a valid Email Address");
        }
        const res = await fetch("https://stile-backend.vercel.app/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });
        if (!res.ok) {
            throw new Error("Failed to send OTP. Try again later.");
        }
        const data = await res.json();
        console.log(data);
        setOtpSent(true); // ✅ Now the UI updates properly
        toast.success("OTP Sent Successfully ✅", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return
    } catch (err) {
        console.error("Error:", err);
        toast.error(err.message || "Something went wrong.");
    } finally {
        setBtnmsg("Send OTP"); // ✅ Ensures button resets even on error
    }
}

  // Validate Logic
  const validateNumber = () => {
    const isValidEmail = (email) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
    if (!isValidEmail) {
      seterror("Invalid Email ID. Enter a valid Email");
      return false;
    }
    seterror("");
    return true;
  };






  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };
  async function otpVerified(e){
    e.preventDefault();
    if(!validateNumber()){
     toast.error("Enter Valid Mobile Number");
     alert("Enter Valid Mobile Number");
    }
    const res = await fetch("https://stile-backend.vercel.app/user/login",
    {method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:'include',
      body:JSON.stringify({email:email})
      });
    const data = await res.json();
    console.log(data);
    toast.success("OTP Sent Successfully ✅", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setisAuthenticated(true);
    setisUserOpen(false);
    setisverifying(false);
    setOtpSent(false);
    setemail("");
    setOtp(["", "", "", ""]);
  }
  
  return (
    <div>
      <ToastContainer className='custom-toast-container' position="top-right" autoClose={3000} theme="light" transition={Slide} />
     
      {isUserOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <div id="recaptcha"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white relative rounded-lg shadow-lg w-[90%] max-w-md flex flex-col h-auto overflow-hidden"
          >
            <button
              onClick={() => setisUserOpen(false)}
              className="absolute -top-3 right-2 hover:scale-105 text-black hover:text-red-500 text-[40px]"
            >
              ×
            </button>

            {/* Header Section */}
            <div className="bg-white text-black p-6 flex flex-col items-center">
              <img
                src={Logo}
                alt="Stile Sagio Logo"
                className="w-24 h-24 object-contain"
              />
              <h2 className="text-lg md:text-xl font-bold mt-4">Stile Sagio</h2>
              <p className="text-gray-300 text-center text-sm mt-2">
                Login to enjoy exclusive benefits:
              </p>
            </div>

            {/* Mobile Number Form (Before OTP is sent) */}
            {!otpSent && (
              <div className="p-6 flex flex-col">
                <h2 className="text-md md:text-lg font-semibold text-gray-800 text-center mb-4">
                  Login with Gmail
                </h2>
                <p className="text-gray-600 text-sm md:text-lg text-center mb-4">
                  Enter your Gmail to receive an OTP for verification.
                </p>
                <form onSubmit={onSignup} className="space-y-4">
                  <div className="text-sm md:text-md">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-[6px] md:py-3 bg-black text-white rounded-lg shadow-md"
                  >
                 {btnmsg}
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    We will send an OTP to your Gmail for verification.
                  </p>
                </div>
              </div>
            )}

            {/* OTP Form Section (Visible after OTP is sent) */}
            {otpSent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6 flex flex-col space-y-3 md:space-y-4"
              >
                <h2 className="text-md md:text-lg font-semibold text-gray-800 text-center mb-2 md:mb-4">
                  Enter OTP
                </h2>
                <div className="flex justify-center gap-4 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="number"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      className="md:w-12 md:h-12 h-7 w-7 text-center border-b border-black no-arrows focus:border-black focus:outline-none"
                    />
                  ))}
                </div>
                <button
                  onClick={onSignup}
                  className="w-full py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Resend OTP
                </button>
                <button
                  onClick={onOTPVerify}
                  className="w-full py-2 bg-[#000435] text-white rounded-lg"
                >
                 Verify
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OtpLoginPopup;
