// @ts-nocheck
let OTPlessSignin = null;
export async function OTPlessSdk() {
  return new Promise(async (resolve) => {
    if (document.getElementById("otpless-sdk") && OTPlessSignin)
      return resolve();

    // Loading the script if it's not already loaded

    const script = document.createElement("script");
    script.src = "https://otpless.com/v4/headless.js";
    script.id = "otpless-sdk";

    // Get your app id from https://otpless.com/dashboard/customer/dev-settings

    script.setAttribute("data-appid", "1SLCKDMM7UR64S2A3JGB");

    // Initializing the OTPless SDK when the script loads with the callback function

    script.onload = function () {
      const OTPless = Reflect.get(window, "OTPless");
      OTPlessSignin = new OTPless(callback);
      resolve();
    };
    document.head.appendChild(script);
  });
}

export async function hitOTPlessSdk(params) {
  await OTPlessSdk();

  const { requestType, request } = params;

  return await OTPlessSignin[requestType](request);
}

//OTPLess Main Script to initiate the authentication

/**  Otpless callback function
 * @description
 * This function is called after authentication is done, by otpless-sdk.
 * Use this function to further process the otplessUser object, navigate to next page or perform any other action based on your requirement.
 * @param {Object} eventCallback
 * @returns {void}
 */
const callback = (eventCallback) => {
 

  const ONETAP = () => {
    const { response } = eventCallback;

    // Replace the following code with your own logic
 
    // location.reload();
    return response.status;
  };

  const OTP_AUTO_READ = () => {
    const {
      response: { otp },
    } = eventCallback;

    // YOUR OTP FLOW

    const otpInput = document.getElementById("otp-input");

    otpInput.value = otp;
  };

  const FAILED = () => {
    const { response } = eventCallback;

    
  };

  const FALLBACK_TRIGGERED = () => {
    const { response } = eventCallback;
  };

  const EVENTS_MAP = {
    ONETAP,
    OTP_AUTO_READ,
    FAILED,
    FALLBACK_TRIGGERED,
  };

  if ("responseType" in eventCallback) EVENTS_MAP[eventCallback.responseType]();
};
export async function initiate(phoneNumber) {
  const request = {
    channel: "PHONE",
    phone: phoneNumber,
    countryCode: "+91",
    expiry: "60", //Headless request can be customized with custom expiry.
  };
  const initiate = await hitOTPlessSdk({
    requestType: "initiate",
    request,
  });
  return initiate;
}

export async function oauth(channelType) {
  const initiate = await hitOTPlessSdk({
    requestType: "initiate",
    request: {
      channel: "OAUTH",
      channelType,
    },
  });

 
}


export async function verify(phone,otp) {

  const verify = await hitOTPlessSdk({
    requestType: "verify",
    request: {
      channel: "PHONE",
      phone: phone,
      otp: otp,
      countryCode: "+91",
    },
  },  
  );
  return verify;
}
