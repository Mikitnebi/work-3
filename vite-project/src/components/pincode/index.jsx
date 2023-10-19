import "./pin.css"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { useContext } from "react"
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

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
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
        axios.
            post("http://3.66.89.33/Restaurant/intro-email-validation",{
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
        axios
        .post("http://3.66.89.33/Restaurant/registration",
        {
            businessName:stateUser.name,
            phoneNumber:stateUser.number + "",
            emailAddress:stateUser.email,
            regionId:1
        })
        .then(response=>{
            setIsLoading1(false);
        })
    }
    return(
        <>
                <div className="text-center">  
                    <h3>
                        Enter Your Pincode Here
                    </h3>
                    <ion-icon size={'large'} name="arrow-down-outline"></ion-icon>
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
                                onChange={e => {handleChange(e.target, index); setIsError(true)}}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}
                   </div> 


                    <p>Pincode Entered - <span>{otp.join("")}</span></p>

                        <h1 className="error-otp" style={isError ? {visibility:"hidden"} : {visibility: "visible"} }> 
                            Wrong OTP, try again
                        </h1>
                        <h1 className="find">Can't find it ? <button disabled={isLoading1} className="send-again" onClick={(e) => sendAgain()}>
                        {isLoading1 ? (
                                <span>
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </span>
                            ) : (
                                "Send it again"
                            )}</button> </h1>
                        <div className="button-div">
                        <button
                            className="btn-pincode-clear"
                            onClick={e => {setOtp([...otp.map(v => "")]); setIsError(true)}}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="btn-pincode"
                            onClick={() =>
                                onSubmit()
                            }
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span>
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </span>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                        </div>
                        
                </div> 
        </>
    //     <>
    //    <div className="pin-container">
    //    <h3 className="pin-h3">Enter Pin Code</h3>

    //     <form onSubmit={handleSubmit(onSubmit)} action=""  id="form" className="">
    //         <div className="pin-div">
                
    //             <input  type="number" id="pin" placeholder="Enter Pin Code..."   {...register("pin")}/>
    //             <small>{errors.pin?.message}</small>
    //         </div>
    //         <button type="submit">Submit</button>
    //     </form>
    //    </div>
    //    </>
       
    )
}



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