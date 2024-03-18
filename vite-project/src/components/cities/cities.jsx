
import { Waypoint } from "react-waypoint"
import "./city.css"
import { useState } from "react";


export default function Cities ( ) {

    const [isRow1Visible, setRow1Visible] = useState(false);

    const handleRow1Enter = () => {
      setRow1Visible(true);
    }; 

    return(
        <section id="city" class="section-cities">
        <div class="row">
            <h2> We're currently in these cities
            </h2>
        </div>
        <Waypoint onEnter={handleRow1Enter}>

        <div className={`cities-div ${isRow1Visible ? 'animate__animated animate__fadeInLeft' : ''}`} style={{ transition: 'opacity 1s, transform 2s' }}>
      
        <div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  

      
  <img className="cities-img1" src="../public/picasso.png" alt="" />
  
      
      <div class="infotop">
      <div class="city-features">
                    <ion-icon class="icon-small" name="restaurant"></ion-icon>
                    1600+ მომხმარებელი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    60+ რესტორანი
                </div>  </div>
</div>


<div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  

  <img className="cities-img2" src="../public/andza.png" alt="" />


      <div class="infotop">
      <div class="city-features">
                    <ion-icon class="icon-small" name="restaurant"></ion-icon>
                    1600+ მომხმარებელი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    60+ რესტორანი
                </div>  </div>
</div>


<div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  
  <img className="cities-img3" src="../public/ანბანი.png" alt="" />


      <div class="infotop">
      <div class="city-features">
                    <ion-icon class="icon-small" name="restaurant"></ion-icon>
                    1600+ მომხმარებელი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    60+ რესტორანი
                </div>  </div>
</div>
      
      
      
      
      
      
      
      
        {/* <div class="card">
  <div class="first-content">
  <img className="cities-img1" src="../public/andza.png" alt="" />
  </div>
  <div class="second-content">
                <div class="city-features">
                    <ion-icon class="icon-small" name="restaurant"></ion-icon>
                    1600+ მომხმარებელი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    60+ რესტორანი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-facebook"></ion-icon>
                    @omnifood_lx
                </div>  
    </div>


</div>
<div class="card">
  <div class="first-content">
    <img className="cities-img" src="../public/picasso.png" alt="" />
  </div>
  <div class="second-content">
                <div class="city-features">
                    <ion-icon class="icon-small" name="restaurant"></ion-icon>
                    3700+ მომხმარებელი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    160+ რესტორანი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-facebook"></ion-icon>
                    @omnifood_sf
                </div>  
    </div>


</div>
<div class="card">
  <div class="first-content">
  <img className="cities-img1" src="../public/ანბანი.png" alt="" />
  </div>
  <div class="second-content">
                <div class="city-features">
                    <ion-icon class="icon-small" name="restaurant"></ion-icon>
                    1200+ მომხმარებელი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    50+ რესტორანი
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-facebook"></ion-icon>
                    @omnifood_london
                </div>  
    </div>


</div> */}


        </div>
        </Waypoint>
      </section>
    )
}