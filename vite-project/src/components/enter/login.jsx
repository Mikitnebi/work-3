import './enter.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { StoreContextRecipe } from '../../App'
import { useContext, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useNavigation } from 'react-router-dom'




  

export const MainLogin = ({onClose,setIsLoginOrRegistration}) =>{
    const { setPast,stateUser ,dispatchRecipe,setIsOpenPasswordChange,setIsOpenRegistration,dispatchUser} = useContext(StoreContextRecipe);
    const [isError, setIsError] = useState(true)
    const [error,setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).max(10).required(),
        // checkbox: yup.boolean()
    })


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

   
    const onSubmit = (date) =>{
        setIsLoading(true);

        navigation('/finalRegistration')





        // axios
        //     .post("http://3.66.89.33/Auth/customer-login",{
        //         emailAddress:date.email,
        //         password:date.password
        //     })
        //     .then(response =>{
        //         console.log(response.data.result.accessToken)
        //         if(date.checkbox){
        //             localStorage.setItem('accessToken', response.data.result.accessToken);
        //         }
        //  dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "isRegistered",
        //     value: true
        // })
        // // dispatchUser({
        // //     type: "changeUserInformation",
        // //     propertyId: "name",
        // //     value: date.name
        // // })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "email",
        //     value: date.email
        // })
        // // dispatchUser({
        // //     type: "changeUserInformation",
        // //     propertyId: "number",
        // //     value: date.card
        // // })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "password",
        //     value: date.password
        // })
        // onClose()
        //     })
        //     .catch(error =>{
        //         console.log(error);
        //         setIsError(false)
        //         setError(error.response.data.errorType)
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    }

   
    
    
    return (
   
    <div className="enter-box">

    <div className='auth-name'>
    <h3 >გაიარე ავტორიზაცია</h3>

        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form" >


        <div class="coolinput1">
            <label for="input" class="text">მეილი   <ion-icon  name="mail-outline"></ion-icon></label>
            <input type="email" placeholder="შეიყვანეთ თქვენი მეილი" name="input" class="input"  {...register("email")}/>
            <small>{errors.email?.message }</small>

        </div>
            
            {/* <div className="form-control">
                <label >email   <ion-icon name="mail-outline"></ion-icon>
                <input  type="email" id="email" placeholder="Enter your emali" {...register("email")}/>
                </label>
                <small>{errors.email?.message }</small>
            </div> */}



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
            
            {/* <div className="form-control">
                <label >password    <ion-icon name="lock-closed-outline"></ion-icon>
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
            </div> */}
            <div className='bottom-div'>
            <div className="form-control1">
                <label style={{fontWeight:'700'}} > Remember your accaunt ? 

                <div style={{ display: 'inline-block', position: 'relative',       marginLeft:'5px'}}>
  <input
    style={{
      width: '20px',
      height: '20px',
      margin: 0,
      padding: 0,
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
    }}
    type="checkbox"
    onChange={() => {
        setIsChecked(isChecked => !isChecked);

    }}
    defaultChecked={isChecked}
  />
  <div
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: isChecked ? '#8C1D2F' : 'transparent',
      border: '1px solid #8C1D2F',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    {isChecked && <div style={{ color: 'white' }}>✓</div>}
  </div>
</div>

                    {/* <input type="checkbox" id="checkbox"  {...register("checkbox")}/> */}
                </label>
            </div>
            <div onClick={()=> {
                    setIsOpenPasswordChange(true); 
                    setIsOpenRegistration(false); 
                    setPast('change');
                }
                } style={{fontWeight:'700'}} className='password-forgot'>Forgot password ?</div>
            
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
            <div className='orRegistration'>
                <div className='lineReg'>

                </div>
                <h3 className='orRegistrationText'>ან დარეგისტრირდი</h3>
                <div className='lineReg'>

                </div>
            </div>
            <button onClick={()=>setIsLoginOrRegistration(true)} className='orRegistrationButton' >
                Registration
            </button>
            <img className='logoRegistration' src="../../../public/img/Group4.png" alt="Main Logo" />
    </div>
        
    )
}


