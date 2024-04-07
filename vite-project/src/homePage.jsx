import 'animate.css';
import { createContext, useContext, useEffect, useReducer, useState, useRef } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';

import './App.css';
import RegistrationModal from './components/modals/registrationModal';
import { RegisterCompany } from './components/firstRegistration';
import { userReducer } from './state/reducer/userR';
import { userState } from './state/State/userS';
import { recipeReducer } from './state/reducer';
import { recipeState } from './state/State';
import { PinCode } from './components/pincode';
import PinModal from './components/modals/pinModal';
import { Information } from './components/information';
import InformationModal from './components/modals/informationModal';
import { LastRegistration } from './components/lastRegistration';
import { restaurantReducer } from './state/reducer/restaurant';
import { restaurantState } from './state/State/restaurant';
import LoginModal from './components/modals/loginModal';
import { Enter } from './components/enter';
import { Waypoint } from 'react-waypoint';
import Tables from './components/tables';
import Reservations from './components/reservations';
import { StoreContextRecipe } from './App';
import AboutUs from './components/about/aboutUs';
import Cities from './components/cities/cities';
import Packages from './components/packages';
import Footer from './components/footer';
import { MainLogin } from './components/enter/login';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const navigation = useNavigate();
  const {
    isSearchVisible,
    setIsSearchVisible,
    stateRestaurant,
    dispatchRestaurant,
    stateUser,
    dispatchUser,
    stateRecipe,
    dispatchRecipe,
  } = useContext(StoreContextRecipe);
  const [p, setP] = useState(false);
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const [isOpenPincode, setIsOpenPincode] = useState(false);
  const [isOpenInformation, setIsOpenInformation] = useState(false);
  console.log(stateUser);
  const [img, setImg] = useState(5);
  const [animationClass, setAnimationClass] = useState('');
  const animationRef = useRef(null);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);






  const [isLoginOrRegistration, setIsLoginOrRegistration] = useState(false)
  const [isOpen,setisOpen] = useState(false)


  return (
    <>
      <header
        id="home"
        ref={headerRef} // Use the ref here
        className="restaurant-interface"
      >
          <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          // Specify the path to your video file
          src="../public/pexels-c-technical-6839664(Original)_1.mp4"
        />
              <div className="line"></div>

        <nav className={p ? 'stick' : 'nonStick'}>
          <ScrollLink
            className="title-nav"
            to="home"
            spy={true}
            smooth={true}
            offset={-1000}
            duration={500}
          >
            <div className="title">
              <img src={!p ? "../dist/custom-restaurant-tables-david-stine+4.jpg" : "../dist/img/Group4.png"} alt="Logo" className="header__logo" />
              <span>Mikitani</span>
            </div>
          </ScrollLink>
          {
            !isOpen &&
            <div className="open-icon">
              <ion-icon onClick={()=>setisOpen(!isOpen)} name="list-outline"></ion-icon>

              </div>
          }
          
          <ul className="ul-tt-1-bar">
            {
             isOpen &&
              <div  className="close-icon" >
              <ion-icon onClick={()=>setisOpen(!isOpen)} name="close-outline"></ion-icon>

              </div>

            }
            {
              isOpen && 
              (
                <>
                     <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="home"
                spy={true}
                smooth={true}
                offset={-1000}
                duration={500}
              >
                Home
              </ScrollLink>
            </li>
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                About Us
              </ScrollLink>
            </li>
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="city"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Our Cities
              </ScrollLink>
            </li>
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="packages"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Packages
              </ScrollLink>
            </li>
                </>
              )
            }
       
          </ul>

          <ul className="ul-tt-1">
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="home"
                spy={true}
                smooth={true}
                offset={-1000}
                duration={500}
              >
                Home
              </ScrollLink>
            </li>
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                About Us
              </ScrollLink>
            </li>
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="city"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Our Cities
              </ScrollLink>
            </li>
            <li
              // style={
              //   !p
              //     ? { borderBottom: '2.5px solid rgb(234, 178, 11)' }
              //     : { borderBottom: 'none' }
              // }
            >
              <ScrollLink
                className="home"
                to="packages"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Packages
              </ScrollLink>
            </li>
          </ul>
          <ul className="ul-tt">
              <>
                <ScrollLink
                  className="register1"
                  to="home"
                  onClick={() => setIsOpenRegistration(true)}
                  spy={true}
                  smooth={true}
                  offset={-1000}
                  duration={500}
                >
                  Sign Up
                </ScrollLink>
                
              </>
            
          </ul>
        </nav>


        
        <Link
          className={`book-button ${animationClass}`}
          // to="table"
          onClick={() => {setIsOpenRegistration(true); setIsLoginOrRegistration(true)}}
          ref={buttonRef} // Use the ref here

        >
            დარეგისტრირდი
        </Link>
        

        <LoginModal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
          {
            <Enter onClose={() => setIsOpenLogin(false)} />
          }
        </LoginModal>

        <RegistrationModal setIsLoginOrRegistration={setIsLoginOrRegistration} open={isOpenRegistration} onClose={() => setIsOpenRegistration(false)}>

          {
            !isLoginOrRegistration ?
            <MainLogin setIsLoginOrRegistration={setIsLoginOrRegistration} openPincode={setIsOpenPincode} onClose={() => setIsOpenRegistration(false)} />
            :
            <RegisterCompany  setIsLoginOrRegistration={setIsLoginOrRegistration} openPincode={setIsOpenPincode} onClose={() => setIsOpenRegistration(false)}/>
          }
        </RegistrationModal>

        <PinModal open={isOpenPincode} onClose={() => setIsOpenPincode(false)}>
          <PinCode setInformation={setIsOpenInformation} close={setIsOpenPincode} />
        </PinModal>

        <InformationModal open={isOpenInformation} onClose={() => setIsOpenInformation(false)}>
          <Information setInformation={setIsOpenInformation} close={setIsOpenInformation} />
        </InformationModal>

        <Waypoint
          onLeave={({ previousPosition, currentPosition, event }) => {
            setP(true);
          }}
          onEnter={({ previousPosition, currentPosition, event }) => {
            setP(false);
          }}
        >
          <span className="waypointSpan"></span>
        </Waypoint>
      </header>
      <AboutUs/>
      <Cities/>
      <Packages/>
      <Footer/>
    </>
  );
}
