import { CgSpinner } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsTelephoneFill } from "react-icons/bs";

import OtpInput from "otp-input-react";
import React, {useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { provider,provider1, provider2 } from "./firebase.config";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        window.location = "https://loginanii.netlify.app/";
        ;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGithub = () => {
    signInWithPopup(auth, provider1)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        window.location = "https://loginanii.netlify.app/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signInWithFacebook = () => {
    signInWithPopup(auth, provider2)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        window.location = "https://loginanii.netlify.app/";
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <section className="bg-[#7f3fff] z-0 flex flex-col items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          window.location = "https://loginanii.netlify.app/"
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white mt-[-4rem] font-bold text-[2.4rem] tracking-wider mb-6">
              Welcome to <br /> My page <span className="text-amber-300">ʕ•ᴥ•ʔ</span>
            </h1>
            {showOTP ? (
              <>
                <label htmlFor="otp"
                  className="font-bold text-xl text-white text-center" >
                  Enter your OTP pls--
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button onClick={onOTPVerify}
                  className="bg-[#f66e6e] rounded-2xl w-full flex hover:scale-90
                  gap-1 items-center justify-center py-2.5 text-white">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />)}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-[#ba9cff] text-purple-500 w-fit
                flex mx-auto px-4 rounded-full">
                  <BsTelephoneFill size={30} className="bg-white my-3 rounded-full p-1"/>
                <label className="font-bold text-xl text-white text-center">
                  Verify your phone number </label></div>
                <PhoneInput  country={"in"} value={ph} onChange={setPh}/>
                <button onClick={onSignup}
                  className="bg-[#fc83a9] tracking-wider hover:bg-red-400 text-xl rounded-[2rem] w-full flex gap-1 items-center justify-center py-2.5 text-white">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" /> )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

<div className="bg-white rounded-full px-4 py-3 text-black 
font-bold text-xl mb-4">Or</div>
      <div className="media-options pb-4 z-0">
          <div className="bg-[#9f9cff] px-[4rem] py-3 rounded-3xl cursor-pointer transition-shadow
             flex items-center justify-center gap-3 text-white hover:bg-purple-400"
          onClick={signInWithGithub}>
            <BsGithub/>
            <span>Login with Github</span>
          </div>
        </div>
        <div className="media-options pb-4">
          <div className="bg-[#9f9cff] px-[3.5rem] py-3 rounded-3xl cursor-pointer transition-shadow
             flex items-center justify-center gap-3 text-white hover:bg-purple-400"
          onClick={signInWithFacebook}>
            <FaFacebook/>
            <span>Login with Facebook</span>
          </div>
        </div>
        <div className="media-options pb-4">
          <div
            className="bg-[#9f9cff] px-[4rem] py-3 rounded-3xl cursor-pointer transition-shadow
             flex items-center justify-center gap-3 text-white hover:bg-purple-400"
            onClick={signInWithGoogle} >
          <FcGoogle className="bg-white rounded-full text-xl"/>
            <span>Login with Google</span>
          </div>
        </div>
    </section>
  );
};

export default App;
