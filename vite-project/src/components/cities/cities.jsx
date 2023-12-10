
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

        <div className={`row ${isRow1Visible ? 'animate__animated animate__fadeInLeft' : ''}`} style={{ transition: 'opacity 1s, transform 2s' }}>
            <div class="col1 span-1-of-4 box">
                <img src="../public/img/lisbon-3.jpg" alt="lisabon"/>
                <h3>Lisabon</h3>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    1600+ happy eaters
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="star"></ion-icon>
                    60+ top chefs
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-twitter"></ion-icon>
                    @omnifood_lx
                </div>
            </div>
            <div class="col1 span-1-of-4 box">
                <img src="../public/img/san-francisco.jpg" alt="san francisco"/>
                <h3>San francisko</h3>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    3700+ happy eaters
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="star"></ion-icon>
                    160+ top chefs
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-twitter"></ion-icon>
                    @omnifood_sf
                </div>
            </div>
            <div class="col1 span-1-of-4 box">
                <img src="../public/img/berlin.jpg" alt="berlin"/>
                <h3>Berlin</h3>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    2300+ happy eaters
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="star"></ion-icon>
                    110+ top chefs
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-twitter"></ion-icon>
                    @omnifood_berlin
                </div>
            </div>
            <div class="col1 span-1-of-4 box">
                <img src="../public/img/london.jpg" alt="london"/>
                <h3>London</h3>
                <div class="city-features">
                    <ion-icon class="icon-small" name="person"></ion-icon>
                    1200+ happy eaters
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="star"></ion-icon>
                    50+ top chefs
                </div>
                <div class="city-features">
                    <ion-icon class="icon-small" name="logo-twitter"></ion-icon>
                    @omnifood_london
                </div>
            </div>
        </div>
        </Waypoint>
      </section>
    )
}