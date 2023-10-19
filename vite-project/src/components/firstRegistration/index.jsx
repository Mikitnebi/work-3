import './first.css'
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { StoreContextRecipe } from '../../App'
import { useContext, useState } from 'react'
import SelectInput from '../selecter'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'





  

export const RegisterCompany = ({onClose,openPincode, setIsOpenPincode ,setInformation, }) =>{
    const {dispatchUser,stateUser } = useContext(StoreContextRecipe);
    const [isLoading, setIsLoading] = useState(false);

    const options = ['თბილისი', 'ქუთაისი', 'ბათუმი',"თელავი","ზუგდიდი","მცხეთა","მესტია","სიღნაღი","სხვა"];
    // const [region, setRegion] = useState('');
    const handleOptionChange = (selectedValue) => {
      console.log('Selected option:', selectedValue);
      switch (selectedValue) {
        case 'თბილისი':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 1
            })            
            break;
        case 'ქუთაისი':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 2
            })
            break;
         case 'ბათუმი':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 3
            })
            break;
        case 'თელავი':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 4
            })
            break;
        case 'ზუგდიდი':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 5
            })
            break; 
        case 'მცხეთა':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 6
            })
            break;
        case 'მესტია':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 7
            })
            break;
        case 'სიღნაღი':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 8
            })
            break;
        case 'სხვა':
            dispatchUser({
                type: "changeUserInformation",
                propertyId: "region",
                value: 9
            })
            break;      

        default:
            break;
      }
    };
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible1, setPasswordVisible1] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
      const togglePasswordVisibility1 = () => {
        setPasswordVisible1(!passwordVisible1);
      };

      const schema = yup.object().shape({
        name: yup.string().min(5).max(15).required(),
        email: yup.string().email().required(),
        // password: yup.string().min(5).max(10).required(),
        // confirmPassword: yup
        //   .string()
        //   .oneOf([yup.ref("password"), null], "Passwords don't match")
        //   .required(),
        checkbox: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
        // checkbox1: yup.boolean(),
        // location:yup.string().max(30).required(),
        card: yup.number().required(),

      });
    
      
      const selectedSchema =  schema;
    
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(selectedSchema),
      });
    var isOption = true
   
    const onSubmit = (date) =>{
       
        setIsLoading(true)

        axios
            .post("http://3.66.89.33/Restaurant/registration",
            {
                businessName:date.name,
                phoneNumber:date.card + "",
                emailAddress:date.email,
                regionId:1
            })
            .then(response =>{
                console.log(response)
                // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "isRegistered",
        //     value: true
        // })
        // setPast('company')
        onClose()
        openPincode(true);
        // setIsOpenPincode(true);
        // setInformation(true);
        dispatchUser({
            type: "changeUserInformation",
            propertyId: "name",
            value: date.name
        })
        dispatchUser({
            type: "changeUserInformation",
            propertyId: "email",
            value: date.email
        })
        dispatchUser({
            type: "changeUserInformation",
            propertyId: "number",
            value: date.card
        })
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "password",
        //     value: date.password
        // })
        
            })
            .catch(error =>{
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

   
    

    // function usernameMin (type) {
    //     if(type == "min"){
    //         return t("usernameMin");
    //     }
    //     if(type == "max"){
    //         return t("usernameMax");
    //     }
    //     if(type == "required"){
    //         return t("usernameRequired");
    //     }
    // }
    return (
   
    <div className="conteiner">

        <form onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form" >
            <div className="form-control">
                <label >Company Name     <ion-icon name="person-outline"></ion-icon>
                <input type="text" id="username" placeholder="Enter Company name" {...register("name")}/>
                </label>  
                <small>{ errors.name?.message }</small>
            </div>
            
            <div className="form-control">
                <label > email    <ion-icon name="at-outline"></ion-icon>
                <input type="email" id="email" placeholder="Enter your emali" {...register("email")}/>
                </label>
                <small>{errors.email?.message }</small>
            </div>
            <div className="form-control">
                <label > Phone Number    <ion-icon name="call-outline"></ion-icon>
                <input type="number" id="number" placeholder="Enter your phone number" {...register("card")}/>
                </label>
                <small>{errors.card?.message }</small>
            </div>
            <div className="form-control">
                <label > City/Region    <ion-icon name="earth-outline"></ion-icon> 
                    <SelectInput defaultValue="თბილისი" options={options} onChange={handleOptionChange} />
                </label>
                {/* <label > City/Region    <ion-icon name="earth-outline"></ion-icon>
                <input type="text" id="location" placeholder="Enter your company's location" {...register("location")}/>
                </label>
                <small>{errors.location?.message }</small> */}
            </div>
            

            {/* <div className="form-control">
                <label > {t("password")}     <ion-icon name="finger-print-outline"></ion-icon>
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
            {/* <div className="form-control">
                <label > {t("confirmPassword")} <ion-icon name="finger-print-outline"></ion-icon>
                <input type={passwordVisible1 ? 'text' : 'password'} id="password2" placeholder="Confirm Password" {...register("confirmPassword")}/>
                </label>
                <div className="password-toggle-div">
                <ion-icon size="small" name={passwordVisible1 ? "eye-off-outline" : "eye-outline"}
                    onClick={togglePasswordVisibility1}
                    className="password-toggle">
                    {passwordVisible1 ? 'Hide' : 'Show'}
                    </ion-icon>
                </div>
                <small>{errors.confirmPassword?.message}</small>
            </div> */}
            {/* <div className="form-control2">
                <label > Remember your accaunt ?
                    <input type="checkbox" id="checkbox1"  {...register("checkbox1")}/>
                </label>
            </div> */}
            <div className="form-control2">
                <label > I agree to the Terms and Conditions
                    <input type="checkbox" id="checkbox"  {...register("checkbox")}/>
                </label>
                <small>{errors.checkbox?.message }</small>
            </div>
            
            <button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <span>
                        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                    </span>
                ) : (
                    "Register"
                )}
            </button>        </form>
    </div>
        
    )
}

