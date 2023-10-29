import React, { useEffect, useState } from "react";
import { sendOTP, verifyOTP } from "../../services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import { userLogin, userLogout } from "../../Redux/reducer/userReducer";

const SignIn = ({ SignInRef, setshowSignIn }: any) => {
  const [showOTP, setshowOTP] = useState(false);
  const [email, setEmail] = useState("");

  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  // console.log('inputValues :>> ', inputValues);
  const [otp, setotpToken] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: rootType) => state.user);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    setotpToken(inputValues.join(""));
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [inputValues, seconds]);

  const handleSendOTP = async (e: any) => {
    try {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (email.trim() === "" || !emailRegex.test(email)) {
        e.preventDefault();
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
        setshowOTP(!showOTP);
        await sendOTP(email);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyOtp = async (email: string, otp: any) => {
    try {
      const otpRegex = /^\d{6}$/;
      if (!otpRegex.test(otp)) {
        setOtpError("Invalid OTP format");
        return;
      } else {
        const data = await verifyOTP(email, otp);
        dispatch(userLogin(data));
        setshowSignIn(false);
      }
    } catch (error) {
      setOtpError("Please Enter correct otp");
      console.log(error);
      // setshowSignIn(false);
    }
  };
  const resendOtp = () => {
    setMinutes(1);
    console.log("setMinutes");
    setSeconds(30);
    sendOTP(email);
  };

  return (
    <>
      <div className="bg-[#333333] p-[1rem] flex bg-opacity-70 pt-8 justify-center h-full fixed z-50 w-full">
        <div
          className="bg-[#FFFFFF] w-full flex text-[#000] rounded-xl h-fit max-w-3xl sm:max-h-max"
          ref={SignInRef}
        >
          <div className="w-[40%] hidden sm:block">
            <img
              className="h-full rounded-l-xl"
              src="/assets/images/login-bg.svg"
              alt="image1"
            />
          </div>

          <div
            className={`w-full sm:w-[70%] p-2 gap-${
              showOTP ? "6" : "8"
            }  flex flex-col justify-center items-center`}
          >
            <p
              className={`text-${
                showOTP ? "4xl" : "6xl"
              } font-semibold text-[#4DBD7A]`}
            >
              {showOTP ? "OTP Verification" : "Zest"}
            </p>
            <p
              className={`text-${
                showOTP ? "xl" : "2xl"
              } font-semibold text-center`}
            >
              {showOTP
                ? `OTP sent to email ${email}`
                : "Get Fresh Fruits & Veggies Now"}
            </p>
            {showOTP ? (
              <>
                <div className="flex flex-row otp">
                  {inputValues.map((value, index) => {
                    return (
                      <input
                        key={index}
                        className="m-2 border border-[#87908F] h-10 w-10 text-center rounded"
                        type="text"
                        maxLength={1}
                        required
                        onChange={(e) => {
                          handleInputChange(index, e.target.value);
                        }}
                      />
                    );
                  })}
                </div>
                {otpError && <p className="text-red-600 m-0">{otpError}</p>}
                <button
                  type="submit"
                  onClick={() => {
                    setshowOTP(true);
                    handleVerifyOtp(email, otp);
                  }}
                  className="bg-[#4DBD7A] py-[6px] font-semibold rounded-lg text-xl px-8 text-white"
                >
                  Confirm
                </button>
                <div className="flex flex-col items-center gap-1">
                  {seconds > 0 || minutes > 0 ? (
                    <p className="text-xl font-semibold text-[#87908F]">
                      {/* {" "}
                    00 : 30{" "} */}
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p>Didn't recieve code?</p>
                  )}
                  <div className="flex items-center gap-2">
                    {/* <p className="text-md text-[#87908F]"> Didn't Get It ? </p> */}
                    <button
                      className="text-md cursor-pointer text-[#4DBD7A]"
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color:
                          seconds > 0 || minutes > 0 ? "#DFE3E8" : "#4DBD7A",
                      }}
                      onClick={() => resendOtp()}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  handleSendOTP(e);
                }}
                className="flex flex-col gap-8 justify-center items-center"
              >
                <div className="border-[1px] rounded-md border-[#87908F] text-center flex flex-row items-center">
                  <div className="h-full border-r-[1px] border-[#87908F] px-3 flex items-center justify-center">
                    <img
                      className="w-5 h-5"
                      src="/assets/icons/mail-icon.svg"
                      alt="image1"
                    />
                  </div>
                  <input
                    type="text"
                    className="py-2 px-2 text-center text-xl font-semibold rounded-md focus:ring-0 outline-none placeholder:font-semibold placeholder:text-lg"
                    placeholder="Enter Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                {emailError && <p className="text-red-600 m-0">{emailError}</p>}
                <button
                  type="submit"
                  className="bg-[#4DBD7A] py-[6px] px-2 font-semibold rounded-lg text-xl  text-white"
                >
                  Generate OTP
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
