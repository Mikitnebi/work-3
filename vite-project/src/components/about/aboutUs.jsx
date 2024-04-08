import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import './about.css';

export default function AboutUs() {
  const [isRow1Visible, setRow1Visible] = useState(false);

  const handleRow1Enter = () => {
    setRow1Visible(true);
  };

  return (
    <section id='about' className="section-features">
      <div className="row">
        <h2 className="aboutH2">BEST SERVICE &mdash; FOR THE BEST RESTAURANTS</h2>
        <p className="long-copy">
          Hello, we're Omnifood, your new premium food delivery service. We know
          you're always busy. No time for cooking. So let us take care of that,
          we're really good at it, we promise!
        </p>
      </div>
      <Waypoint onEnter={handleRow1Enter}>
        <div className={`about-us-section ${isRow1Visible ? 'animate__animated animate__fadeInUp' : ''}`} style={{ transition: 'opacity 1s, transform 2s' }}>

        <div class="card1">

        <div class="align">
        <span class="red"></span>
        <span class="red"></span>
        <span class="red"></span>
    </div> 
    <div className='card1-div'>
    <ion-icon name="bookmark-outline" ></ion-icon>
     <h1>რეზერვაცია</h1>
    </div>

<div>
<p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
    </p>
</div>
  
</div>


<div class="card1">


<div class="align">
<span class="red"></span>
<span class="red"></span>
<span class="red"></span>
</div>
<div className='card1-div'>
         <ion-icon name="grid-outline"></ion-icon> 

<h1>მაგიდების მენეჯმენტი</h1>
</div>

<div>
<p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
    </p>
</div>
</div>


<div class="card1">


<div class="align">
<span class="red"></span>
<span class="red"></span>
<span class="red"></span>
</div>
<div className='card1-div'>
<ion-icon name="qr-code-outline"></ion-icon>
<h1>ელ-მენიუ</h1>
</div>
<div>
<p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
    </p>
</div>
</div>


<div class="card1">


<div class="align">
<span class="red"></span>
<span class="red"></span>
<span class="red"></span>
</div>
<div className='card1-div'>
<ion-icon name="qr-code-outline"></ion-icon>
<h1>qr-კოდები</h1>

</div>
<div>
<p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
    </p>
</div>
</div>
   
        </div>
      </Waypoint>
    </section>
  );
}




// <div class="flip-card">
// <div class="flip-card-inner">
//     <div class="flip-card-front">
//         <p class="title-flip">დაჯავშნის სისტემა</p>
//         <p className='about-us-icons'> 
//         <ion-icon name="bookmark-outline" ></ion-icon>
//         </p>
//     </div>
//     <div class="flip-card-back">
//       <div className='backside-about-us'> 
//       <p>1. კაროჩე, ...</p>
//         <p>2. ხოდა, ...</p>
//         <p>3. პატამუჩტა, ...</p>
//       </div>
        
//     </div>
// </div>
// </div>
// <div class="flip-card">
// <div class="flip-card-inner">
//     <div class="flip-card-front">
//         <p class="title-flip">მაგიდების მენეჯმენტი</p>
//         <p className='about-us-icons'>
//         <ion-icon name="grid-outline"></ion-icon> 
//         </p>
//     </div>
//     <div class="flip-card-back">
//         <div className='backside-about-us'> 
//       <p>1. კაროჩე, ...</p>
//         <p>2. ხოდა, ...</p>
//         <p>3. პატამუჩტა, ...</p>
//       </div>
//     </div>
// </div>
// </div>
// <div class="flip-card">
// <div class="flip-card-inner">
//     <div class="flip-card-front">
//         <p class="title-flip">ელ-მენიუ</p>
//         <p className='about-us-icons'> 
//         <ion-icon name="restaurant-outline"></ion-icon>
//         </p>
//     </div>
//     <div class="flip-card-back">
//         <div className='backside-about-us'> 
//       <p>1. კაროჩე, ...</p>
//         <p>2. ხოდა, ...</p>
//         <p>3. პატამუჩტა, ...</p>
//       </div>
//     </div>
// </div>
// </div>
// <div class="flip-card">
// <div class="flip-card-inner">
//     <div class="flip-card-front">
//         <p class="title-flip">QR-კოდები</p>
//         <p className='about-us-icons'> 
//         <ion-icon name="qr-code-outline"></ion-icon>
//         </p>
//     </div>
//     <div class="flip-card-back">
//         <div className='backside-about-us'> 
//       <p>1. კაროჩე, ...</p>
//         <p>2. ხოდა, ...</p>
//         <p>3. პატამუჩტა, ...</p>
//       </div>
//     </div>
// </div>
// </div>