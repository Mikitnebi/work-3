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
        <div className={`row1 ${isRow1Visible ? 'animate__animated animate__fadeInUp' : ''}`} style={{ transition: 'opacity 1s, transform 2s' }}>
          <div className="col span-1-of-4 box">
            <ion-icon name="infinite-outline" className="icon-big"></ion-icon>
            <h3 className="aboutH3">Up to 365 days/year</h3>
            <p>
              Never cook again! We really mean that. Our subscription plans include
              up to 365 days/year coverage. You can also choose to order more
              flexibly if that's your style.
            </p>
          </div>
          <div className="col span-1-of-4 box">
            <ion-icon name="stopwatch-outline" className="icon-big"></ion-icon>
            <h3 className="aboutH3">Ready in 20 minutes</h3>
            <p>
              You're only twenty minutes away from your delicious and super healthy meals delivered right to your home. We work with the best chefs in each town to ensure that you're 100% happy.
            </p>
          </div>
          <div className="col span-1-of-4 box">
            <ion-icon name="nutrition-outline" className="icon-big"></ion-icon>
            <h3 className="aboutH3">100% organic</h3>
            <p>
              All our vegetables are fresh, organic and local. Animals are raised
              without added hormones or antibiotics. Good for your health, the
              environment, and it also tastes better!
            </p>
          </div>
          <div className="col span-1-of-4 box">
            <ion-icon name="cart-outline" className="icon-big"></ion-icon>
            <h3 className="aboutH3">Order anything</h3>
            <p>
              We don't limit your creativity, which means you can order whatever
              you feel like. You can also choose from our menu containing over 100
              delicious meals. It's up to you!
            </p>
          </div>
        </div>
      </Waypoint>
    </section>
  );
}
