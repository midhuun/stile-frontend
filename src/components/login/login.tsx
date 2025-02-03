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
const OtpLoginPopup = () => {
   
  const [mobileNumber, setMobileNumber] = useState<any>("");
  const [otp, setOtp] = useState<any>(["", "", "", "","",""]);
  const [otpSent, setOtpSent] = useState<any>(false); // State to track if OTP is sent
  const { isUserOpen, setisUserOpen,isAuthenticated,setisAuthenticated } = useContext<any>(HeaderContext);
  const [isverifying,setisverifying] = useState<any>(false);
  const [iserror, setiserror] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [btnmsg,setBtnmsg] = useState<any>("Login Instantly");
  // function oncaptchaVerify() {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //      auth,"recaptcha",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           onSignup();
  //         },
  //         "expired-callback": () => {
  //           console.log("Recaptcha expired");
  //         },
  //       }
  //     );
  //   }
  // }
  // function onSignup(e){
  //   e.preventDefault();
  //   setBtnmsg("Sending OTP");
  //   setTimeout(() => {
  //     setBtnmsg("Send OTP");
  //   }, 2000);
  //   setisverifying(true);
  //   try{
  //     if(!validator.isMobilePhone(mobileNumber,"en-IN")){
  //       setiserror(true);
  //       toast.error("Invalid Mobile Number");
  //       seterror("Invalid Mobile Number")
  //       setTimeout(() => {
  //         setiserror(false)
  //       }, 2500);
  //       seterror("Enter valid Phone Number");
  //       throw new Error("Enter Valid Phone Number")
  //     }
  //   auth.settings.appVerificationDisabledForTesting = true;
  //   oncaptchaVerify();
  //   const appVerifier = window.recaptchaVerifier;
  //   const phoneNumber = "+91" + mobileNumber; // Phone number with country code
  //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     .then((result) => {
  //       setConfirmationResult(result);
  //       console.log("Sign-in success",confirmationResult);
  //       toast.done("OTP Sent");
  //       setOtpSent(true);
  //     })
  //     .catch((error) => {
  //       console.error("Enter Valid details", error);

  //     });
  //   }
  //   catch(err){
  //     console.log(err);
  //     setiserror(true)
  //     setTimeout(() => {
  //       setiserror(false)
  //     }, 2500);
  //     seterror("Enter Valid details");

  //   }
  // }
  const validateNumber = () => {
    const isValid = /^[6-9]\d{9}$/.test(mobileNumber); // Only 10-digit Indian numbers
    if (!isValid) {
      seterror("Invalid mobile number. Enter a valid 10-digit number.");
      return false;
    }
    seterror("");
    return true;
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };
  async function otpVerified(e){
    e.preventDefault();
    if(!validateNumber()){
     toast.error("Enter Valid Mobile Number");
     alert("Enter Valid Mobile Number");
    }
    const res = await fetch("https://stile-backend-gnqp.vercel.app/user/login",
    {method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:'include',
      body:JSON.stringify({phone:mobileNumber})
      });
    const data = await res.json();
    console.log(data);
    toast.success("User Login Success ✅", {
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
    setMobileNumber("");
    setOtp(["", "", "", "","",""]);
  }
  
  // function onOTPVerify() {
  //   console.log(otp.join(""));
  //   console.log(confirmationResult)
  //   if (!confirmationResult) {
  //     console.log("No confirmation result available");
  //     return;
  //   }
  //   confirmationResult
  //     .confirm(otp.join(""))
  //     .then(async (res) => {
  //       console.log("OTP verified, user signed in:", res);
  //       otpVerified()
  //     })
  //     .catch((err) => {
  //       console.error("OTP verification failed:", err);
  //       setiserror(true)
  //       setTimeout(() => {
  //         setiserror(false)
  //       }, 2500);
  //       seterror("Enter correct OTP");
  //     });
  // }
  return (
    <div>
      {/* <div className="absolute inset-0 z-1000  h-screen">
      <ToastContainer position="top-right" autoClose={3000} theme="light" transition={Slide} />
      </div> */}
     
      {isUserOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <div id="recaptcha"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white relative rounded-lg shadow-lg w-[90%] max-w-md flex flex-col h-auto overflow-hidden"
          >
            <ToastContainer autoClose={5000} position="top-right " hideProgressBar={false} theme="light" />
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
                  Login without OTP
                </h2>
                <p className="text-gray-600 text-sm md:text-lg text-center mb-4">
                  Enter your mobile number to receive an OTP for verification.
                </p>
                <form onSubmit={otpVerified} className="space-y-4">
                  <div className="text-sm md:text-md">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-lg shadow-md"
                  >
                 {btnmsg}
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    We will send an OTP to your registered mobile number for verification.
                  </p>
                </div>
              </div>
            )}

            {/* OTP Form Section (Visible after OTP is sent) */}
            {/* {otpSent && (
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
            )} */}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OtpLoginPopup;
