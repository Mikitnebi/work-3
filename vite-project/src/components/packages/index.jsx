
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
        <h2 >Start eating healthy today</h2>
    <Waypoint onEnter={handleRow1Enter}>

    <div  className={`row2 ${isRow1Visible ? 'animate__animated animate__fadeInDown' : ''}`} style={{ transition: 'opacity 1s, transform 2s' }}>
        <div class="col3 span-1-of-3 js--wp-3">
            <div class="plan-box">
                <div>
                    <h3 style={{color:'wheat'}}>Premium</h3>
                    <p class="plan-price"> 499.99 ₾<span> / month </span></p>
                    <p class="plan-price-meal"> That’s only 13.30$ per meal</p>
                </div>
                <div>
                    <ul> 
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            მაგიდების მენეჯმენტი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            სტატისტიკური ანალიზი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            რეზერვაცია
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            დისტრიბუცია
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            აქციების მართვის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            ელექტრონული მენიუ
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            მომხმარებლების მენეჯმენტი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            ელექტრონული გადახდის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            თანამშრომლების მართვის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            {'suggestion-ად ამოგდება (რეკლამა)'}
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
                    <p class="plan-price"> 399.99 ₾<span> / month</span></p>
                    <p class="plan-price-meal"> that’s only 14.90$ per meal</p>
                </div>
                <div>
                    <ul>
                    <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            მაგიდების მენეჯმენტი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            სტატისტიკური ანალიზი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            რეზერვაცია
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            დისტრიბუცია
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            აქციების მართვის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            ელექტრონული მენიუ
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            მომხმარებლების მენეჯმენტი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            ელექტრონული გადახდის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            თანამშრომლების მართვის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            {'suggestion-ად ამოგდება (რეკლამა)'}
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
                    <p class="plan-price"> 249.99 ₾ <span> / meal </span> </p>
                    <p class="plan-price-meal"> that’s only 14.90$ per meal</p>
                </div>
                <div>
                    <ul>
                    <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            მაგიდების მენეჯმენტი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            სტატისტიკური ანალიზი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            რეზერვაცია
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            დისტრიბუცია
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            აქციების მართვის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            ელექტრონული მენიუ
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            მომხმარებლების მენეჯმენტი
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="checkmark-outline"></ion-icon>
                            ელექტრონული გადახდის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            თანამშრომლების მართვის სისტემა
                        </li>
                        <li>
                            <ion-icon class="icon-small" name="close-outline"></ion-icon>
                            {'suggestion-ად ამოგდება (რეკლამა)'}
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