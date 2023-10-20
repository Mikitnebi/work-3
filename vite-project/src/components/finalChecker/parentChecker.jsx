import './style.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { StoreContextRecipe } from '../../App'
import { useContext, useState } from 'react'



export default function ParentChecker ({onClose,setIsParent}) {
    const { setPast,stateUser,t ,dispatchRecipe,setIsOpenPasswordChange,setIsOpenRegistration,dispatchUser} = useContext(StoreContextRecipe);
    
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
        setIsParent(true)
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

        // axios
        //     .post("http://3.66.89.33/Auth/customer-login",{
        //         emailAddress:date.email,
        //         password:date.password
        //     })
        //     .then(response =>{
        //         console.log(response)
         
        //     })
        //     .catch(error =>{
        //         console.log(error);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    }

   
    


    return(
        <div className="enter-box">

        <form onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form" >
            
            <div className="form-control">
                <label >Parent restaurant's email   <ion-icon name="person-outline"></ion-icon>
                <input type="email" id="email" placeholder="Enter your Parent restaurant's email" {...register("email")}/>
                </label>
                <small>{errors.email?.message }</small>
            </div>
            
            <div className="form-control">
                <label > password    <ion-icon name="finger-print-outline"></ion-icon>
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
            {/* <div onClick={()=> {
                    setIsOpenPasswordChange(true); 
                    setIsOpenRegistration(false); 
                    setPast('change');
                }
                } className='password-forgot'>Forgot password ?</div> */}
            {/* <div className="form-control1">
                <label > Remember your accaunt ? 
                    <input type="checkbox" id="checkbox"  {...register("checkbox")}/>
                </label>
            </div> */}
            {/* <span className='enter-span'>Forgot your password?</span> */}

            <button type="submit" >           
                    Next
            </button>        
            </form>
    </div>
       
    )
}