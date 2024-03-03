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

  let image = [
    '../public/jason-leung-poI7DelFiVA-unsplash.jpg',
    '../public/brooke-lark-R18ecx07b3c-unsplash.jpg',
    '../victoria-shes-Qa29U4Crvn4-unsplash.jpg',
    '../public/custom-restaurant-tables-david-stine+4.jpg',
    '../public/jay-wennington-N_Y88TWmGwA-unsplash.jpg',
  ];

  const handleLeftArrowClick = () => {
    setAnimationClass('animate__animated animate__fadeInUp');
    setImg((prevImg) => ((prevImg - 2 + image.length) % image.length) + 1);
  };

  const handleRightArrowClick = () => {
    setAnimationClass('animate__animated animate__fadeInUp');
    setImg((prevImg) => (prevImg % image.length) + 1);
  };

  const handleSeeTablesClick = () => {
    setAnimationClass('animate__animated animate__fadeInUp');
    // Add your logic for the "See Your Tables" link click event
  }; 
  const changeImage = () => {
    setAnimationClass('animate__animated animate__fadeInUp');
    setImg((prevImg) => (prevImg % image.length) + 1);
  };
  

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.classList.add('fade-in');
      animationRef.current.classList.add('animate__animated', 'animate__fadeInUp');
      buttonRef.current.classList.add('animate__animated', 'animate__fadeInUp');
      const animationTimeout = setTimeout(() => {
        headerRef.current.classList.remove('fade-in');
        animationRef.current.classList.remove('animate__fadeInUp');
        buttonRef.current.classList.remove('animate__fadeInUp');

      }, 1000);

      return () => clearTimeout(animationTimeout);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeImage();
    }, 5000); // Change image every 2 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [img]);

  useEffect(() => {
    // Remove the animation class after the animation completes
    if (animationRef.current) {
      const animationElement = animationRef.current;
      const handleAnimationEnd = () => {
        setAnimationClass('');
        animationElement.removeEventListener('animationend', handleAnimationEnd);
      };

      animationElement.addEventListener('animationend', handleAnimationEnd);

      return () => {
        animationElement.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [animationClass]);

  const [isLoginOrRegistration, setIsLoginOrRegistration] = useState(false)

  return (
    <>
      <header
        id="home"
        ref={headerRef} // Use the ref here
        className="restaurant-interface"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image[img - 1]})`,
        }}
      >
        <div className="slider">
          <button className="arrow-button" onClick={handleLeftArrowClick}>
            &larr;
          </button>
          <button className="arrow-button" onClick={handleRightArrowClick}>
            &rarr;
          </button>
        </div>
        <nav className={p ? 'stick' : ''}>
          <div className="line"></div>
          <ScrollLink
            className="title-nav"
            to="home"
            spy={true}
            smooth={true}
            offset={-1000}
            duration={500}
          >
            <div className="title">
              <img src="/favicon.png" alt="Logo" className="header__logo" />
              <span>Mikitani</span>
            </div>
          </ScrollLink>
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
        {
          (img == 1 || img == 3 || img == 5) ?
        <div ref={animationRef} className={`main-words ${animationClass}`}>
          <h1>For the love of delicious food...</h1>
          <h1>Where every flavor tells a story...</h1>
        </div> :
        <div ref={animationRef} className={`main-words1 ${animationClass}`}>
        <h1>Making your life easy...</h1>
        <h1>With touch of technology...</h1>
      </div>
        }
        {
          (img == 1 || img == 3 || img == 5) ?
          <Link
          className={`book-button ${animationClass}`}
          // to="table"
          onClick={() => setIsOpenRegistration(true)}
          ref={buttonRef} // Use the ref here

        >
            Try Our Service
        </Link> : <div className='bookButons'> 
        <ScrollLink
          className={`book-button1 ${animationClass}`}
          // to="table"
          ref={buttonRef} // Use the ref here
          to="about"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
        
            About us
        </ScrollLink>
        <ScrollLink
          className={`book-button2 ${animationClass}`}
          // to="table"
          ref={buttonRef} // Use the ref here
          to="packages"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
        
            Our Packages
        </ScrollLink>
        </div>
        }

        

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
