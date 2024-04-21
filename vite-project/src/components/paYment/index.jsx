import { useNavigate } from 'react-router-dom'
import './style.css'
import { useContext } from 'react';
import { StoreContextRecipe } from "../../App";
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
export default function Payment  ( ) {

    const Navigate = useNavigate()
    const { paymentInformation,setPaymentInformation } = useContext(StoreContextRecipe);
    const schema = yup.object().shape({
        cardHolderName: yup.string()
            .required('Cardholder name is required'),
    
        cardNumber: yup.string()
            .matches(/^\d{16}$/, 'Must be a 16-digit number')
            .required('Card number is required'),
    
        expireDate: yup.string()
            .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiration date')
            .required('Expiration date is required'),
    
        cvv: yup.string()
            .matches(/^\d{3}$/, 'Must be a 3-digit number')
            .required('CVV is required')
    });
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = (date) =>{
      }
    return(
        <div className='payment-container'>
            <div className='payment-main-container'>
            <img style={{zIndex:'2000'}} className='home-paige-logo' src="../../../public/img/Group4.png" alt="" />

                <div className='main-information'>
                    <div className='backAndLine' onClick={()=>Navigate('/homePage/offers')}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}}>უკან დაბრუნება</h3>
                    </div>
                    <div className='Payment-info'>
                        <h3 style={{fontFamily: 'YourCustomFont, sans-serif'}}>{`"${paymentInformation?.title}"`}</h3>
                        <p style={{fontFamily: 'YourCustomFont, sans-serif'}}>{paymentInformation?.body}</p>
                    </div>

                    <div className='payment-method'>
                    <h3 style={{fontFamily: 'YourCustomFont, sans-serif' ,color:'#58121D'}}>გადახდის დეტალები</h3>
                    <div> 
                    
                        <img src="../../../cards/png-clipart-mastercard-logo-logo-payment-visa-mastercard-paypal-mastercard-icon-text-service.png" alt="" />
           
                        <img src="../../../cards/png-clipart-visa-logo-credit-card-debit-card-payment-card-bank-visa-blue-text.png" alt="" />        
                    
                        <img src="../../../cards/png-clipart-logo-american-express-payment-computer-icons-brand-american-express-blue-text.png" alt="" />

                    
                        <img src="../../../cards/png-clipart-paypal-logo-business-computer-icons-payment-paypal-text-payment.png" alt="" />
  
                    </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <div  class="coolinput1">
                            <label style={{fontFamily: 'YourCustomFont, sans-serif',backgroundColor:'transparent',top:'-3px',marginLeft:'0'}} for="input" class="text">სახელი ბარათზე / Name on card   <ion-icon  name="person"></ion-icon></label>
                            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="text" placeholder="შეიყვანეთ სახელი" name="input" class="input"  {...register("cardHolderName")}/>
                            <small>{ errors.cardHolderName?.message }</small>

                        </div>
                        <div  class="coolinput1">
                            <label style={{fontFamily: 'YourCustomFont, sans-serif',backgroundColor:'transparent',top:'-3px',marginLeft:'0'}} for="input" class="text">ბარათის ნომერი / Card Number   <ion-icon name="card-outline"></ion-icon></label>
                            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="text" placeholder="შეიყვანეთ ბარათის ნომერი" name="input" class="input"  {...register("cardNumber")}/>
                            <small>{ errors.cardNumber?.message }</small>

                        </div>
                        <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div  style={{width:'45%'}} class="coolinput1">
                            <label style={{fontFamily: 'YourCustomFont, sans-serif',backgroundColor:'transparent',top:'-3px',marginLeft:'0'}} for="input" class="text">ვადა   <ion-icon name="calendar-outline"></ion-icon></label>
                            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="text" placeholder="ვადა" name="input" class="input"  {...register("expireDate")}/>
                            <small>{ errors.expireDate?.message }</small>

                        </div>
                        <div style={{width:'45%'}}  class="coolinput1">
                            <label style={{fontFamily: 'YourCustomFont, sans-serif',backgroundColor:'transparent',top:'-3px',marginLeft:'0'}} for="input" class="text">CVV   <ion-icon name="ellipsis-horizontal-outline"></ion-icon></label>
                            <input style={{fontFamily: 'YourCustomFont, sans-serif'}} type="text" placeholder="CVV კოდი" name="input" class="input"  {...register("cvv")}/>
                            <small>{ errors.cvv?.message }</small>

                        </div>
                        </div>
                        
                    </form>
                    <div className='total-payment'>
                        <div>
                            <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>პაკეტის ფასი</h3>
                            <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>{`${100} ₾`}</h3>
                        </div>
                        <div>
                        <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>მომსახურების საფასური</h3>
                        <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>{`${20} ₾`}</h3>

                        </div>
                        <div>
                        <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>ჯამური თანხა</h3>
                        <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>{`${120} ₾`}</h3>

                        </div>
                    </div>
                    <div className='payment-button'>
                    <span style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>{'₾₾₾'}</span>
                    <div>
                        <h3 style={{fontFamily: 'YourCustomFont, sans-serif',color:'#58121D'}}>გადახდა</h3>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                </div>
                </div>
                
                <div className='payment-photo'>
                    <img src="../../../PHONE1.png" alt="" />
                </div>
                
            </div>
        </div>
    )
}