//@ts-nocheck
import React, { useContext, useEffect, useRef, useState } from "react";
import { HeaderContext } from "../../context/appContext";
import { motion } from "framer-motion";
import Logo from '../../assets/logo.png';
import './login.css';
import validator from "validator";
import { auth } from "../../firestore/store";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../toastStyle.css';
import { initiate, verify } from "../../utils/initotpless";
const OtpLoginPopup = () => {
  const [email, setemail] = useState<any>("");
  const [seconds,setSeconds] = useState(0);
  const [phone,setphone] = useState<any>("");
  const [otp, setOtp] = useState<any>("");
  const [isFocused, setIsFocused] = useState(false);
  const [otpSent, setOtpSent] = useState<any>(false); // State to track if OTP is sent
  const { isUserOpen, setisUserOpen,isAuthenticated,setisAuthenticated } = useContext<any>(HeaderContext);
  const [isverifying,setisverifying] = useState<any>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [iserror, setiserror] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [resend,setresend] = useState(false);
  const [btnmsg,setBtnmsg] = useState<any>("Login");
  useEffect(()=>{
   if(!isUserOpen){
    setOtpSent(false);
    setphone("");
    setisverifying(false);
   }
  },[isUserOpen])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     // Only numbers, limit to 4 digits
    setOtp(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    let pastedData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 4);
    setOtp(pastedData);
  };

  const handleClick = () => {
    inputRef.current?.focus(); // Focus on input when clicking the container
  };
  async function onOTPVerify(e:any) {
    e.preventDefault();
    console.log("verifying")
    try{
       const res =await verify(phone,otp);
       console.log(res);
  //   const res = await fetch('https://stile-backend.vercel.app/verify-otp',{method:'POST',headers:{
  //     'Content-Type': 'application/json',
  //   },
  //   body:JSON.stringify({otp:otp.join(""),email})
  // })
  //   console.log(res.status);
  //   const data = await res.json();
    if(res.success){
      toast.success("OTP Verified Successfully", {
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
      },body:JSON.stringify({phone:phone})
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
      toast.error("Enter Valid OTP ", {
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
    setSeconds(30);
    const secondsInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(secondsInterval); // Stop interval when it reaches 0
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => {
      setresend(true);
    }, 30000);
    e.preventDefault();
    setBtnmsg("Sending OTP");
    try {
        // if (!validator.isEmail(email)) {
        //     setiserror(true);
        //     seterror("Invalid Email Address"); // ✅ Corrected message
        //     toast.error("Enter Valid Email Id", {
        //       position: "top-right",
        //       autoClose: 3000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //       theme: "light",
        //     });
        //     setTimeout(() => {
        //         setiserror(false);
        //     }, 2500);
        //     throw new Error("Enter a valid Email Address");
        // }
         const res = await initiate(phone);
         console.log(res);    
        // const res = await fetch("https://stile-backend.vercel.app/send-otp", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email: email }),
        // });
        // if (!res.ok) {
        //     throw new Error("Failed to send OTP. Try again later.");
        // }
        // const data = await res.json();
        // console.log(data); // ✅ Now the UI updates properly
        if(res?.success){
          setOtpSent(true);
          toast.success("OTP Sent Successfully ", {
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
                  Login with your Mobile
                </h2>
                <p className="text-gray-600 text-sm md:text-lg text-center mb-4">
                  Enter your Mobile Number to receive an OTP for verification.
                </p>
                <form onSubmit={onSignup} className="space-y-4">
                  <div className="text-sm md:text-md">
                    <input
                      type="phone"
                      id="phone"
                      value={phone}
                      maxLength={10}
                      onChange={(e) => setphone(e.target.value)}
                      placeholder="Enter your Mobile Number"
                      className="w-full px-4 py-2 border-b rounded-lg focus:ring-2  focus:outline-none"
                      autoComplete="tel"
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
                    We will send an OTP to your Mobile for verification.
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
             className="p-6 w-full flex flex-col space-y-4 max-w-sm mx-auto"
           >
             <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-4">
               Enter OTP
             </h2>
     
             {/* OTP Input */}
             <div
               onClick={handleClick}
               className="w-full  flex flex-col items-center"
             >
               {/* Hidden Input */}
               <input
                 ref={inputRef}
                 type="tel"
                 inputMode="numeric"
                pattern="[0-9]*"
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                 value={otp}
                 onChange={handleChange}
                 onPaste={handlePaste}
                 maxLength={4}
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}
                 className={`relative w-[70%] text-lg flex text-center items-center no-spinner justify-center p-2 rounded-md border-b ${
                  isFocused ? "border-blue-500 shadow-md" : "border-gray-300"
                } transition-all duration-300`}
               />
     
               {/* Display OTP Boxes */}
              
             </div>
     
             {/* Resend OTP */}
             {seconds > 1 && (
               <p className="text-sm text-center text-gray-700">
                 Resend OTP in {seconds} seconds
               </p>
             )}
     
             <button
               disabled={!resend}
               onClick={onSignup}
               className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                 resend ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
               }`}
             >
               Resend OTP
             </button>
     
             {/* Verify Button */}
             <button
               onClick={onOTPVerify}
               className="w-full py-2 bg-[#000435] hover:bg-[#000560] text-white rounded-lg font-semibold transition-all duration-300"
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
