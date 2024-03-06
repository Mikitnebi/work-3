import "./pin.css"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { useContext, useEffect, useRef } from "react"
import { StoreContextRecipe } from "../../App"
import  { useState } from "react";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


export const PinCode =({close,isPut, parent,setInformation}) =>{
    const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isError, setIsError] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
    
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    
        //Focus previous input if Backspace is pressed and current input is empty
        if (element.value === "" && index > 0) {
          inputRefs.current[index - 1].focus();
        }
    
        //Focus next input
        if (element.nextSibling && element.value !== "") {
          element.nextSibling.focus();
        }
      };
    
      const handleBackspace = (element, index) => {
        //Focus previous input if Backspace is pressed and current input is empty
        if (element.value === "" && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      };
    
      const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
          handleBackspace(e.target, index);
        }
      };

    const {dispatchUser,stateUser,past } = useContext(StoreContextRecipe);

    // const schema = yup.object().shape({
    //     pin: yup.number().min(4).required()
       
    // })
    
    // const {register, handleSubmit, formState: {errors}} = useForm({
    //     resolver: yupResolver(schema)
    // })

    function combineStrings(arr) {
        const combinedString = arr.join('');
        return combinedString;
    }

//    console.log(past)
    const onSubmit = (date) =>{
        setIsLoading(true);
        // setInformation(true);
        // close(false)
        // setIsVerify(true);
        axios.
            post("http://54.93.212.178/Anonymous/RestaurantIntro/VerifyOtp/Email",{
                email:stateUser.email,
                otp:combineStrings(otp)+""
            })
            .then(response =>{
                console.log(response);
                setInformation(true);
                close(false)
                setIsVerify(true);
            })
            .catch(error =>{
                console.log(error)
                setIsError(false);
                setOtp([...otp.map(v => "")])
            })
            .finally(() => {
                setIsLoading(false);
            });
        
    }
    
    const sendAgain = () =>{
        setIsLoading1(true)
        setTimer(180);

        axios
        .post("http://54.93.212.178/Anonymous/RestaurantIntro",
        {
            businessNameGeo:stateUser.name1,
            businessNameEng:stateUser.name,
            phoneNumber:stateUser.number + "",
            emailAddress:stateUser.email,
            regionId:1
        })
        .then(response=>{
            setIsLoading1(false);
        })
    }

    useEffect(() => {
        const countdown = setInterval(() => {
          setTimer(prevTimer => {
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              // Timer reached 0, do something here if needed
              return prevTimer;
            }
          });
        }, 1000);
    
        // Cleanup function to clear interval
        return () => clearInterval(countdown);
      }, []);
    return (
        <>
          <div className="text-center">
            <div className="pincodeTitle">
            <img  className='logoInPincode' src="../../../public/img/Group4.png" alt="Main Logo" />

                <h3>შეამოწმეთ თქვენი ელ-ფოსტა და</h3>
                <h3>ჩაწერეთ მიღებული კოდი</h3>
            </div>
            {/* <ion-icon size={"large"} name="arrow-down-outline"></ion-icon> */}
            <div className="input-div">
              {otp.map((data, index) => {
                return (
                  <input
                    className="otp-field"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    onChange={(e) => {
                      handleChange(e.target, index);
                      setIsError(true);
                    }}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                );
              })}
            </div>
            <div className="redFrame">

            </div>
    
            <div className="button-div1">
            <div className={timer === 0 ? "redFrame1" : "timer"}>
          კოდი ვალიდურია - {timer === 0 ? "Time's up!" : `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}
        </div>
<button
  type="submit"
  className="btn-pincode1"
  onClick={(e) => onSubmit()}
  disabled={isLoading || timer === 0}>
  {isLoading ? (
    <span style={{color:"#ffffff"}}>
      <FontAwesomeIcon icon={faSpinner} spin /> Loading...
    </span>
  ) : (
    "გაგზავნა"
  )}
</button>
</div>
    
 
            <div className="button-div">
           
              <p className="cantFindIt">არ მოგსვლიათ კოდი?</p>
              <button
                type="submit"
                className="btn-pincode"
                onClick={(e) => sendAgain()}
                disabled={isLoading1}
              >
                {isLoading1 ? (
                  <span style={{color:"#ffffff"}}>
                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                  </span>
                ) : (
                  "სცადეთ თავიდან"
                )}
              </button>
            </div>
          </div>
        </>
      );
    };



// import React, { useState } from "react";
// import Header from "components/Header";
// import AppConfig from "App.config";
// import ExternalInfo from "components/ExternalInfo";

// const OTPBox = () => {
//     const [otp, setOtp] = useState(new Array(4).fill(""));

//     const handleChange = (element, index) => {
//         if (isNaN(element.value)) return false;

//         setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

//         //Focus next input
//         if (element.nextSibling) {
//             element.nextSibling.focus();
//         }
//     };

//     return (
//         <>
//             <Header title="Building OTP box using Hooks" />

//             <ExternalInfo page="otpBox" />

//             <div className="row">
//                 <div className="col text-center">
//                     <h2>Welcome to the channel!!!</h2>
//                     <p>Enter the OTP sent to you to verify your identity</p>

//                     {otp.map((data, index) => {
//                         return (
//                             <input
//                                 className="otp-field"
//                                 type="text"
//                                 name="otp"
//                                 maxLength="1"
//                                 key={index}
//                                 value={data}
//                                 onChange={e => handleChange(e.target, index)}
//                                 onFocus={e => e.target.select()}
//                             />
//                         );
//                     })}

//                     <p>OTP Entered - {otp.join("")}</p>
//                     <p>
//                         <button
//                             className="btn btn-secondary mr-2"
//                             onClick={e => setOtp([...otp.map(v => "")])}
//                         >
//                             Clear
//                         </button>
//                         <button
//                             className="btn btn-primary"
//                             onClick={e =>
//                                 alert("Entered OTP is " + otp.join(""))
//                             }
//                         >
//                             Verify OTP
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default OTPBox;