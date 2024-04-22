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
import { useNavigate } from 'react-router-dom'





  

export const RegisterCompany = ({setIsLoginOrRegistration,onClose,openPincode, setIsOpenPincode ,setInformation, }) =>{
    const {dispatchUser,stateUser } = useContext(StoreContextRecipe);
    const [isLoading, setIsLoading] = useState(false);
    const [isUsed,setIsUsed] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [isError,setIsError] = useState(false)
const navigation = useNavigate()
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
        name: yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'English name must contain only English letters')
        .min(5,'Company name must be at least 5 characters')
        .max(15,'Company name must be less then  15 characters')
        .required('Company name is required'),
      name1: yup
        .string()
        .matches(/^[\u10A0-\u10FF]+$/, 'Georgian name must contain only Georgian letters')
        .min(5,'Company name must be at least 5 characters')
        .max(15,'Company name must be less then  15 characters')
        .required('Company name is required'),

        email: yup.string().email().required(),
        card: yup.number().typeError("Phone number must be a number").required("phone number is required"),

        // password: yup.string().min(5).max(10).required(),
        // confirmPassword: yup
        //   .string()
        //   .oneOf([yup.ref("password"), null], "Passwords don't match")
        //   .required(),
        // checkbox: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
        // checkbox1: yup.boolean(),
        // location:yup.string().max(30).required(),

      });
    
      
      const selectedSchema =  schema;
    
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(selectedSchema),
      });
    var isOption = true
   const navigate = useNavigate()
    const onSubmit = (date) =>{
        console.log(isChecked)
        console.log(isError)
        if(!isChecked){
            setIsError(true)
        } else {

        
       
        setIsLoading(true)
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "isRegistered",
        //     value: true
        // })
        // // setPast('company')
        // onClose()
        // openPincode(true);
        // setIsOpenPincode(true);
        // setInformation(true);
        
        // dispatchUser({
        //     type: "changeUserInformation",
        //     propertyId: "password",
        //     value: date.password
        // })
        //  dispatchUser({
        //         type: "changeUserInformation",
        //         propertyId: "name",
        //         value: date.name
        //     })
        //     dispatchUser({
        //         type: "changeUserInformation",
        //         propertyId: "name1",
        //         value: date.name1
        //     })
        //     dispatchUser({
        //         type: "changeUserInformation",
        //         propertyId: "email",
        //         value: date.email
        //     })
        //     dispatchUser({
        //         type: "changeUserInformation",
        //         propertyId: "number",
        //         value: date.card
        //     })
            
        // onClose()
        // openPincode(true);


        dispatchUser({
            type: "changeUserInformation",
            propertyId: "name",
            value: date.name
        })
        dispatchUser({
            type: "changeUserInformation",
            propertyId: "name1",
            value: date.name1
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
        axios
        .post("http://54.93.212.178/Anonymous/RestaurantIntro",{
            businessNameGeo:date.name1,
            businessNameEng:date.name,
            phoneNumber:date.card+"",
            emailAddress:date.email,
            regionId:1
        })            .then(response =>{
                console.log(response)
                console.log('good');

                dispatchUser({
            type: "changeUserInformation",
            propertyId: "isRegistered",
            value: true
        })
        // setPast('company')
        openPincode(true);
        // setIsOpenPincode(true);
        // setInformation(true);


         
            
            // RESTAURANT_WITH_THIS_MAIL_ALREADY_EXISTED
            })
            .catch(error =>{
                console.log(error.response.data.errorType);
                console.log('error');
                if(error.response.data.errorType === "RESTAURANT_WITH_THIS_MAIL_ALREADY_EXISTED"){
                    setIsUsed(true)
                } else {
                    setIsUsed(false)
                }
            })
            .finally(() => {
                setIsLoading(false);
                
            });
       


           
            // console.log(stateUser.name)
            // navigation('/home')
        }
        navigate("/finalRegistration")

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
        <div className='auth-name-register'>
            <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}} >შექმენი შენი რესტორნის ანგარიში</h3>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form" >

        <div class="coolinput1">
            <label style={{fontFamily: 'YourCustomFont, sans-serif'}} for="input" class="text">კომპანიის სახელი ქართულად   <ion-icon  name="person"></ion-icon></label>
            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="text" placeholder="შეიყვანეთ კომპანიის სახელი ქართულად" name="input" class="input"  {...register("name")}/>
            <small>{ errors.name?.message }</small>

        </div>

            {/* <div className="form-control">
                <label >Company Name in english    <ion-icon name="person"></ion-icon>
                <input type="text" id="username" placeholder="Enter Company name in english" {...register("name")}/>
                </label>  
                <small>{ errors.name?.message }</small>
            </div> */}

        <div class="coolinput1">
            <label style={{fontFamily: 'YourCustomFont, sans-serif'}} for="input" class="text">კომპანიის სახელი ინგლისურად   <ion-icon  name="person"></ion-icon></label>
            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="text" placeholder="შეიყვანეთ კომპანიის სახელი ინგლისურად" name="input" class="input"  {...register("name1")}/>
            <small>{ errors.name1?.message }</small>

        </div>


            {/* <div className="form-control">
                <label >Company Name in georgian    <ion-icon name="person"></ion-icon>
                <input type="text" id="username" placeholder="Enter Company name in georgian" {...register("name1")}/>
                </label>  
                <small>{ errors.name1?.message }</small>
                

            </div> */}


        <div class="coolinput1">
            <label style={{fontFamily: 'YourCustomFont, sans-serif'}} for="input" class="text">იმეილი   <ion-icon  name="mail"></ion-icon></label>
            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="email" placeholder="შეიყვანეთ კომპანიის იმეილი" name="input" class="input"  {...register("email")}/>
            <small>{errors.email?.message }</small>
                {
                    isUsed ?                 
                    <small>Email is already used</small> : <></>

                }
        </div>
            
            {/* <div className="form-control">
                <label > email    <ion-icon name="mail"></ion-icon>
                <input type="email" id="email" placeholder="Enter your emali" {...register("email")}/>
                </label>
                <small>{errors.email?.message }</small>
                {
                    isUsed ?                 
                    <small>Email is already used</small> : <></>

                }
            </div> */}

        <div class="coolinput1">
            <label style={{fontFamily: 'YourCustomFont, sans-serif'}} for="input" class="text">კომპანიის ნომერი   <ion-icon  name="call"></ion-icon></label>
            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="number" placeholder="შეიყვანეთ კომპანიის ნომერი" name="input" class="input"  {...register("card")}/>
            <small>{errors.card?.message }</small>

        </div>


            {/* <div className="form-control">
                <label > Phone Number    <ion-icon name="call"></ion-icon>
                <input type="number" id="number" placeholder="Enter your phone number" {...register("card")}/>
                </label>
                <small>{errors.card?.message }</small>
            </div> */}

            
            <div className="form-control">
                <label style={{fontFamily: 'YourCustomFont, sans-serif'}}  > ქალაქი    <ion-icon name="earth"></ion-icon> </label>
                <SelectInput isEdit={true} type={true} defaultValue="თბილისი" options={options} onChange={handleOptionChange} />

                {/* <label > City/Region    <ion-icon name="earth"></ion-icon>
                <input type="text" id="location" placeholder="Enter your company's location" {...register("location")}/>
                </label>
                <small>{errors.location?.message }</small> */}
            </div>
            

            {/* <div className="form-control">
                <label > {t("password")}     <ion-icon name="finger-print"></ion-icon>
                <input type={passwordVisible ? 'text' : 'password'} id="password" placeholder="Enter your password" {...register("password")}/>
                </label>
                <div className="password-toggle-div">
                <ion-icon size="small" name={passwordVisible ? "eye-off" : "eye"}
                    onClick={togglePasswordVisibility}
                    className="password-toggle">
                    {passwordVisible ? 'Hide' : 'Show'}
                    </ion-icon>
                </div>
                <small>{errors.password?.message }</small>
            </div> */}
            {/* <div className="form-control">
                <label > {t("confirmPassword")} <ion-icon name="finger-print"></ion-icon>
                <input type={passwordVisible1 ? 'text' : 'password'} id="password2" placeholder="Confirm Password" {...register("confirmPassword")}/>
                </label>
                <div className="password-toggle-div">
                <ion-icon size="small" name={passwordVisible1 ? "eye-off" : "eye"}
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
                <label style={{fontFamily: 'YourCustomFont, sans-serif'}} > I agree to the Terms and Conditions
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
        if(isChecked){
            setIsError(true)
            setIsChecked(false)
        } else {
            setIsError(false)
            setIsChecked(true)
        }
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
</div>                  </label>
{
    isError && <small>{"You must accept the terms and conditions"}</small>

}
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
            <img onClick={()=> setIsLoginOrRegistration(false)} className='logoRegistrationForRegistartion' src="public/img/Group4.png" alt="Main Logo" />

    </div>
        
    )
}

