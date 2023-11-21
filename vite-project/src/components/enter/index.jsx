import './enter.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { StoreContextRecipe } from '../../App'
import { useContext, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'




  

export const Enter = ({onClose}) =>{
    const { setPast,stateUser ,dispatchRecipe,setIsOpenPasswordChange,setIsOpenRegistration,dispatchUser} = useContext(StoreContextRecipe);
    const [isError, setIsError] = useState(true)
    const [error,setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).max(10).required(),
        checkbox: yup.boolean()
    })


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

   
    const onSubmit = (date) =>{
        setIsLoading(true);

        axios
            .post("http://3.66.89.33/Auth/customer-login",{
                emailAddress:date.email,
                password:date.password
            })
            .then(response =>{
                console.log(response.data.result.accessToken)
                if(date.checkbox){
                    localStorage.setItem('accessToken', response.data.result.accessToken);
                }
         dispatchUser({
            type: "changeUserInformation",
            propertyId: "isRegistered",
            value: true
        })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "name",
        //     value: date.name
        // })
        dispatchUser({
            type: "changeUserInformation",
            propertyId: "email",
            value: date.email
        })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "number",
        //     value: date.card
        // })
        dispatchUser({
            type: "changeUserInformation",
            propertyId: "password",
            value: date.password
        })
        onClose()
            })
            .catch(error =>{
                console.log(error);
                setIsError(false)
                setError(error.response.data.errorType)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

   
    
    
    return (
   
    <div className="enter-box">

        <form onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form" >
            
            <div className="form-control">
                <label >email   <ion-icon name="person-outline"></ion-icon>
                <input type="email" id="email" placeholder="Enter your emali" {...register("email")}/>
                </label>
                <small>{errors.email?.message }</small>
            </div>
            
            <div className="form-control">
                <label >password    <ion-icon name="finger-print-outline"></ion-icon>
                <input type={passwordVisible ? 'text' : 'password'} id="password" placeholder="Enter your password" {...register("password")}/>
                </label>
                <div className="password-toggle-div">
                <ion-icon size="small" name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                    onClick={togglePasswordVisibility}
                    className="password-toggle">
                    {passwordVisible ? 'Hide' : 'Show'}
                    </ion-icon>
                </div>
                <small>{errors.password?.message }</small>
            </div>
            <div onClick={()=> {
                    setIsOpenPasswordChange(true); 
                    setIsOpenRegistration(false); 
                    setPast('change');
                }
                } className='password-forgot'>Forgot password ?</div>
            <div className="form-control1">
                <label > Remember your accaunt ? 
                    <input type="checkbox" id="checkbox"  {...register("checkbox")}/>
                </label>
            </div>
            {/* <span className='enter-span'>Forgot your password?</span> */}

            <small style={{color:"red"}}>{!isError ? error : '' }</small>

            <button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <span>
                        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                    </span>
                ) : (
                    "Log in"
                )}
            </button>        
            </form>
    </div>
        
    )
}


