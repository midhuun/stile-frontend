import { apiUrl } from '../../utils/api';
//@ts-nocheck
import React, { useContext, useEffect, useRef, useState } from 'react';
import { HeaderContext } from '../../context/appContext';
import { motion } from 'framer-motion';
import Logo from '../../assets/logo.png';
import './login.css';
import validator from 'validator';
import { auth } from '../../firestore/store';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toastStyle.css';
import { initiate, verify } from '../../utils/initotpless';
const OtpLoginPopup = () => {
  const [email, setemail] = useState<any>('');
  const [seconds, setSeconds] = useState(0);
  const [phone, setphone] = useState<any>('');
  const [otp, setOtp] = useState<any>('');
  const [isFocused, setIsFocused] = useState(false);
  const [otpSent, setOtpSent] = useState<any>(false); // State to track if OTP is sent
  const { isUserOpen, setisUserOpen, isAuthenticated, setisAuthenticated } =
    useContext<any>(HeaderContext);
  const [isverifying, setisverifying] = useState<any>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [iserror, setiserror] = useState<any>(false);
  const [error, seterror] = useState<any>('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [resend, setresend] = useState(false);
  const [btnmsg, setBtnmsg] = useState<any>('Login');
  useEffect(() => {
    if (!isUserOpen) {
      setOtpSent(false);
      setphone('');
      setisverifying(false);
    }
    // Prefill last used number when opening the popup
    if (isUserOpen) {
      const last = localStorage.getItem('last_phone');
      if (last && !phone) setphone(last);
    }
  }, [isUserOpen]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only numbers, limit to 4 digits
    setOtp(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    let pastedData = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 4);
    setOtp(pastedData);
  };

  const handleClick = () => {
    inputRef.current?.focus(); // Focus on input when clicking the container
  };
  async function onOTPVerify(e: any) {
    e.preventDefault();
    // console.log("verifying")
    try {
      const res = await verify(phone, otp);

      //   const res = await fetch('https://stile-backend.vercel.app/verify-otp',{method:'POST',headers:{
      //     'Content-Type': 'application/json',
      //   },
      //   body:JSON.stringify({otp:otp.join(""),email})
      // })
      //   console.log(res.status);
      //   const data = await res.json();
      if (res.success) {
        toast.success('OTP Verified Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        const token = localStorage.getItem('token');
    const data = await fetch(apiUrl('/user/login'), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send token in header
          },
          body: JSON.stringify({ phone: phone }),
        });
        const user = await data.json();
        if (user) {
          localStorage.setItem('last_phone', phone);
          localStorage.setItem('token', user.message);
          setisAuthenticated(true);
          setisUserOpen(false);
        }
        if (data.status === 200) {
          console.log(true);
        } else {
          toast.error('Error Login ⚠️', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        toast.error('Enter Valid OTP ', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setiserror(true);
        seterror('Invalid OTP');
      }
    } catch (err) {
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
    setBtnmsg('Sending OTP');
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
      if (res?.success) {
        localStorage.setItem('last_phone', phone);
        setOtpSent(true);
        toast.success('OTP Sent Successfully ', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setBtnmsg('Send OTP'); // ✅ Ensures button resets even on error
    }
  }

  // Validate Logic
  const validateNumber = () => {
    const isValidEmail = (email) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };
    if (!isValidEmail) {
      seterror('Invalid Email ID. Enter a valid Email');
      return false;
    }
    seterror('');
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
  async function otpVerified(e) {
    e.preventDefault();
    if (!validateNumber()) {
      toast.error('Enter Valid Mobile Number');
      alert('Enter Valid Mobile Number');
    }
    const res = await fetch(apiUrl('/user/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: email }),
    });
    const data = await res.json();
    console.log(data);
    toast.success('OTP Sent Successfully ✅', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setisAuthenticated(true);
    setisUserOpen(false);
    setisverifying(false);
    setOtpSent(false);
    setemail('');
    setOtp(['', '', '', '']);
  }

  return (
    <div>
      <ToastContainer
        className="custom-toast-container"
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Slide}
      />

      {isUserOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white relative rounded-2xl shadow-xl w-[92%] max-w-md flex flex-col h-auto overflow-hidden"
          >
            <button
              onClick={() => setisUserOpen(false)}
              className="absolute -top-3 right-2 hover:scale-105 text-black hover:text-gray-700 text-[40px]"
            >
              ×
            </button>

            {/* Header Section */}
            <div className="bg-white text-black px-6 pt-8 pb-4 flex flex-col items-center">
              <img src={Logo} alt="Stile Sagio Logo" className="w-16 h-16 object-contain" />
              <h2 className="text-xl font-bold mt-3 tracking-tight">Sign in to Stile Sagio</h2>
              <p className="text-gray-500 text-center text-sm mt-1">Fast checkout and order tracking</p>
            </div>

            {/* Mobile Number Form (Before OTP is sent) */}
            {!otpSent && (
              <div className="px-6 pb-6 flex flex-col">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 text-center mb-1">Login with your Mobile</h2>
                <p className="text-gray-600 text-sm text-center mb-4">Enter your number to receive an OTP.</p>
                <form onSubmit={onSignup} className="space-y-4">
                  <div className="text-sm md:text-md">
                    <label htmlFor="phone" className="block mb-1 text-xs text-gray-600">Mobile Number</label>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-sm select-none">+91</div>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        maxLength={10}
                        onChange={(e) => setphone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter your Mobile Number"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-gray-400"
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-[10px] md:py-3 bg-black text-white rounded-lg shadow-md hover:opacity-90"
                  >
                    {btnmsg}
                  </button>
                </form>
                <p className="mt-4 text-center text-xs text-gray-500">We’ll send an OTP for verification.</p>
              </div>
            )}

            {/* OTP Form Section (Visible after OTP is sent) */}
            {otpSent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 w-full flex flex-col space-y-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900">Enter OTP</h2>
                  <button onClick={() => setOtpSent(false)} className="text-xs underline text-gray-600 hover:text-gray-800">Change number</button>
                </div>
                <p className="text-xs text-gray-500">We’ve sent a 4‑digit code to +91 {phone?.slice(0,6)?.replace(/\d/g,'•')}{phone?.slice(-4)}</p>

                {/* OTP Input */}
                <div onClick={handleClick} className="w-full flex flex-col items-center gap-3">
                  {/* Hidden real input */}
                  <input
                    ref={inputRef}
                    aria-label="One Time Password"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                    value={otp}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    maxLength={4}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="sr-only"
                  />

                  {/* Pretty OTP boxes */}
                  <div className="flex gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-lg border text-xl md:text-2xl font-semibold flex items-center justify-center transition-all duration-200 ${
                          isFocused ? 'border-black shadow-[0_1px_8px_rgba(0,0,0,0.08)]' : 'border-gray-300'
                        }`}
                      >
                        {otp?.[i] || ''}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Tap the boxes and type your 4‑digit code</p>
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
                    resend ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
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
