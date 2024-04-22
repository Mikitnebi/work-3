import './style.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { StoreContextRecipe } from '../../App'
import { useContext, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'




  

export const FinalChecker = ({onClose,setCheck}) =>{
    const { setPast,stateUser,t ,dispatchRecipe,setIsOpenPasswordChange,setIsOpenRegistration,dispatchUser} = useContext(StoreContextRecipe);
    const [isError, setIsError] = useState(true)

    const [isLoading, setIsLoading] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

    const schema = yup.object().shape({
        username: yup.string().min(5).max(20).required(),
        password: yup.string().min(5).max(10).required(),
        checkbox: yup.boolean()
    })


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

   
    const onSubmit = (date) =>{
        setIsLoading(true);
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "isRegistered",
        //     value: true
        // })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "name",
        //     value: date.name
        // })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "email",
        //     value: date.email
        // })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "number",
        //     value: date.card
        // })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "password",
        //     value: date.password
        // })
        // onClose()

        axios
            .post("http://54.93.212.178/Auth/StaffLogin",{
                username:date.username,
                password:date.password
            })
            .then(response =>{
                console.log(response.data.result.accessToken)
                localStorage.setItem('accessToken', response.data.result.accessToken);  
                setCheck(true);

            })
            .catch(error =>{
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

   
    
    
    return ( 
   
    <div className="enter-box2">
        <div className='first-login-container'>
        <div className='auth-name2'>
    <h3 >გაიარე ავტორიზაცია</h3>

        </div>
        <div className='languageGlobeIcon'>
        <ion-icon   name="globe-outline"></ion-icon>
        </div>

        <form style={{width:'90%'}} onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form" >


<div class="coolinput1">
    <label for="input" class="text">სახელი   <ion-icon  name="person-outline"></ion-icon></label>
    <input type="text" placeholder="შეიყვანეთ თქვენი სახელი" name="input" class="input"  {...register("username")}/>
    <small>{errors.username?.message }</small>

</div>
    
   



<div class="coolinput1">
    <label for="input" class="text">პაროლი   <ion-icon  name="lock-closed-outline"></ion-icon></label>
    <input type={passwordVisible ? 'text' : 'password'} placeholder="შეიყვანეთ თქვენი პაროლი" name="input" class="input"  {...register("password")}/>
    <div className="password-toggle-div">
        <ion-icon size="small" name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            onClick={togglePasswordVisibility}
            className="password-toggle">
            {passwordVisible ? 'Hide' : 'Show'}
            </ion-icon>
        </div>
    <small>{errors.password?.message }</small>

</div>
    

  
    

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
            <img className='logoRegistration' src="../../../public/img/Group4.png" alt="Main Logo" />

        </div>
        
    </div>
        
    )
}


