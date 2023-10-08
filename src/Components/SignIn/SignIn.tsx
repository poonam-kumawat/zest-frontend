import React, { useEffect, useRef, useState } from 'react'

const SignIn = ({ SignInRef }: any) => {

    const [showOTP, setshowOTP] = useState(false)
    const [mobileNumber, setmobileNumber] = useState("");
    const [inputValues, setInputValues] = useState(Array(6).fill(''));
    console.log('inputValues :>> ', inputValues);
    const [otpToken, setotpToken] = useState("")

    const handleInputChange = (index: number, value: string) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const handleMobileChange = (e: any) => {
        setmobileNumber(e.target.value)
    }

    useEffect(() => {
        setotpToken(inputValues.join(''))
    }, [inputValues])

    useEffect(() => {
        console.log('otpToken :>> ', otpToken);
    }, [otpToken])

    return (
        <>
            <div className='bg-[#333333] p-[1rem] flex bg-opacity-70 pt-8 justify-center h-full fixed z-50 w-full'>
                <div className='bg-[#FFFFFF] w-full flex text-[#000] rounded-xl h-fit max-w-3xl sm:max-h-96' ref={SignInRef}>
                    <div className='w-[40%] hidden sm:block'>
                        <img className='h-full rounded-l-xl' src='/assets/images/login-bg.svg' />
                    </div>

                    <div className={`w-full sm:w-[55%] p-2 gap-${showOTP ? "6" : "8"}  flex flex-col justify-center items-center`}>
                        <p className={`text-${showOTP ? "4xl" : "6xl"} font-semibold text-[#4DBD7A]`}>{showOTP ? "OTP Verification" : "Zest"}</p>
                        <p className={`text-${showOTP ? "xl" : "2xl"} font-semibold`}>{showOTP ? `OTP sent to number +91${mobileNumber}` : "Get Fresh Fruits & Veggies Now"}</p>
                        {
                            showOTP ? (
                                <>
                                    <div className='flex flex-row otp'>
                                        {
                                            inputValues.map((value, index) => {
                                                return (<input key={index} className='m-2 border border-[#87908F] h-10 w-10 text-center rounded' type='text' maxLength={1} required onChange={(e) => handleInputChange(index, e.target.value)} />)
                                            })
                                        }
                                    </div>
                                    <button type='submit' onClick={() => setshowOTP(true)} className='bg-[#4DBD7A] py-[6px] font-semibold rounded-lg text-xl px-8 text-white'>Confirm</button>
                                    <div className='flex flex-col items-center gap-1'>
                                        <p className='text-xl font-semibold text-[#87908F]'> 00 : 30 </p>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-md text-[#87908F]'> Didn't Get It ? </p>
                                            <p className='text-md cursor-pointer text-[#4DBD7A]'> Resent OTP </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); setshowOTP(!showOTP) }} className='flex flex-col gap-8 justify-center items-center'>
                                    <div className='border-[1px] rounded-md border-[#87908F] text-center flex flex-row items-center'>
                                        <div className='h-full border-r-[1px] border-[#87908F] px-3 flex items-center justify-center'>
                                            <p className='text-[#87908F] font-semibold text-lg'>+91</p>
                                        </div>
                                        <input onChange={(e) => handleMobileChange(e)} type='text' className='py-2 px-2 text-center text-xl font-semibold rounded-md focus:ring-0 outline-none placeholder:font-semibold placeholder:text-lg' placeholder='Enter Phone Number' required maxLength={10} />
                                    </div>
                                    <button type='submit' className='bg-[#4DBD7A] py-[6px] px-2 font-semibold rounded-lg text-xl  text-white'>Generate OTP</button>
                                </form>

                            )
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignIn