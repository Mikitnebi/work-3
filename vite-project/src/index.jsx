import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';

import './App.css'
import RegistrationModal from './components/modals/registrationModal'
import { RegisterCompany } from './components/firstRegistration'
import { userReducer } from './state/reducer/userR'
import { userState } from './state/State/userS'
import { recipeReducer } from './state/reducer'
import { recipeState } from './state/State'
import { PinCode } from './components/pincode'
import PinModal from './components/modals/pinModal'
import { Information } from './components/information'
import InformationModal from './components/modals/informationModal'
import { LastRegistration } from './components/lastRegistration';
import { restaurantReducer } from './state/reducer/restaurant';
import { restaurantState } from './state/State/restaurant';
import LoginModal from './components/modals/loginModal';
import { Enter } from './components/enter';
import { Waypoint } from 'react-waypoint';
import Tables from './components/tables';
import Reservations from './components/reservations';
import { StoreContextRecipe } from './App';


export default function MainScreen () {

    const navigation = useNavigate()
    const { isSearchVisible, setIsSearchVisible,stateRestaurant, dispatchRestaurant,stateUser, dispatchUser, stateRecipe, dispatchRecipe } = useContext(StoreContextRecipe);
    const [p, setP] = useState(false);
    const [isOpenRegistration, setIsOpenRegistration] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)
  
    const [isOpenPincode, setIsOpenPincode] = useState(false)
    const [isOpenInformation, setIsOpenInformation] = useState(false)
console.log(stateUser)
    return(
        <>
           <header id='home' className='restaurant-interface'>
        
        <nav className={p ? "stick" : ""} >
        <div  className='line'></div>
        <ScrollLink
className='title-nav'
to="home"
spy={true}
smooth={true}
offset={-1000}
duration={500}
>         <div className='title'>
            <img src="/favicon.png" alt="Logo" className="header__logo"/>
            <span>Mikitani</span>
          </div>
          </ScrollLink>   
          <ul className='ul-tt-1'>
          <li style={ !p ? { borderBottom: "2.5px solid rgb(234, 178, 11)"} : { borderBottom: "none" }}>
          <ScrollLink
className='home'
to="home"
spy={true}
smooth={true}
offset={-1000}
duration={500}
>                      
               Home</ScrollLink>
            </li>
            <li style={ isSearchVisible ? { borderBottom: "2.5px solid rgb(234, 178, 11)"} : { borderBottom: "none" }}>
            <Link
className='book'
to="/table"

>
Table
</Link>
            </li>
            {/* <li style={ isSearchVisible ? { borderBottom: "2.5px solid rgb(234, 178, 11)"} : { borderBottom: "none" }}>
              <Link  className='book' to="search" spy='true' smooth='true' offset={0} duration={500}      
               >Book Here</Link>
            </li> */}
            <li>
            <Link
className='requests'
to="/book"
spy={true}
smooth={true}
offset={-50}
duration={500}
>
Requests
</Link>                 
            </li>


        </ul> 
        <ul className='ul-tt'>
        {
        !stateUser?.isRegistered  ?

            <>
        <ScrollLink
className='register'
to="home"
onClick={() => setIsOpenRegistration(true)}
spy={true}
smooth={true}
offset={-1000}
duration={500}
>
Register
</ScrollLink>
        <h1 className='slash'>/</h1>
        <ScrollLink
className='login-nav'
to="home"
onClick={() => setIsOpenLogin(true)}  spy={true}
smooth={true}
offset={-1000}
duration={500}
>
Log In
</ScrollLink>
</>
: 
<ScrollLink className='register' to="home" onClick={()=>navigation('/Profile')} spy={true} smooth={true} offset={-1000} duration={500}><ion-icon className="user-icon" size="large" name="person-circle-outline"></ion-icon></ScrollLink>
}

        </ul>

        </nav>
        <div className='main-words '>
          <h1>For the love of delicious food...</h1> 
          <h1>Where every flavor tells a story...</h1>
        </div> 
    <Link className='book-button' to="table"   >See Your Tables</Link>

      
        <LoginModal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
        {
          <Enter  onClose={() => setIsOpenLogin(false)}/>

        }
      </LoginModal>

      <RegistrationModal open={isOpenRegistration} onClose={() => setIsOpenRegistration(false)}>
        {
          <RegisterCompany openPincode={setIsOpenPincode} onClose={() => setIsOpenRegistration(false)}/>

        }
      </RegistrationModal>
       
    <PinModal open={isOpenPincode} onClose={() => setIsOpenPincode(false)}>
            <PinCode setInformation={setIsOpenInformation} close={ setIsOpenPincode}/>
    </PinModal>
    <InformationModal open={isOpenInformation} onClose={() => setIsOpenInformation(false)}>
        <Information setInformation={setIsOpenInformation} close={setIsOpenInformation}/>
    </InformationModal>
    <Waypoint onLeave={({ previousPosition, currentPosition, event }) => {
      setP(true)
      }} 
      onEnter={ ({ previousPosition, currentPosition, event }) => {
        setP(false)
        }}>
          <span  className='waypointSpan'></span>
    </Waypoint> 
    </header>

    {/* <Element name="table" className="element">
<Tables />
</Element> */}


</>
    )
}