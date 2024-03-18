
import { Waypoint } from "react-waypoint"
import "./package.css"
import { useState } from "react";


export default function Packages ( ) {

    const [isRow1Visible, setRow1Visible] = useState(false);

    const handleRow1Enter = () => {
      setRow1Visible(true);
    };

    return(
        <section id="packages" class="section-plans js--section-plans">
    <div class="row">
        <h2 style={{color:"#8C1D2F"}}>Start eating healthy today</h2>
    </div>
    <Waypoint onEnter={handleRow1Enter}>

    <div  className={`row2 ${isRow1Visible ? 'animate__animated animate__fadeInTopRight' : ''}`} style={{ transition: 'opacity 1s, transform 2s' }}>
        <div class="col3 span-1-of-3 js--wp-3">
            <div class="plan-box">
                <div>
                    <h3 style={{color:'wheat'}}>Premium</h3>
                    <p class="plan-price"> 399$<span> / month </span></p>
                    <p class="plan-price-meal"> That’s only 13.30$ per meal</p>
                </div>
                <div>
                    <ul> 
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            1 meal every day
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Order 24/7
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Access to newest creations
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Free deliver
                        </li>
                    </ul>
                </div>
                <div>
                    <a href="" class="btn btn-full">Sign up</a>
                </div>
            </div>
        </div>
        <div class="col3 span-1-of-3">
            <div class="plan-box">
                <div>
                    <h3 style={{color:'wheat'}}>Pro</h3>
                    <p class="plan-price"> 149$<span> / month</span></p>
                    <p class="plan-price-meal"> that’s only 14.90$ per meal</p>
                </div>
                <div>
                    <ul>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            1 meal 10 days/month
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Order 24/7
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Access to newest creations
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Free deliver
                        </li>
                    </ul>
                </div>
                <div>
                    <a href="" class="btn btn-ghost">Sign up</a>
                </div>
            </div>
        </div>
        <div class="col3 span-1-of-3">
            <div class="plan-box">
                <div>
                    <h3 style={{color:'wheat'}}>Starter</h3>
                    <p class="plan-price"> 19$ <span> / meal </span> </p>
                    <p class="plan-price-meal"> that’s only 14.90$ per meal</p>
                </div>
                <div>
                    <ul>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            1 meal
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Order from 8 am to 12 pm
                            </li>
                        
                         <li><ion-icon class="icon-small" name="close-outline"></ion-icon>
                         Access to newest creations
                         </li>
                         <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            Free deliver
                        </li>
                    </ul>
                </div>
                <div>
                    <a href="" class="btn btn-ghost">Sign up</a>
                </div>
            </div>
        </div>
    </div>
    </Waypoint>
  </section>
    )
}