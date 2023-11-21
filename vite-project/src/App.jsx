import { createContext, useEffect, useReducer, useState } from 'react'
import { Link, NavLink, Route, Routes, } from 'react-router-dom';
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
import MainScreen from '.';
import Profile from './components/restaurantInformation';

export const StoreContextRecipe = createContext({});


function App() {
  const [isOpenRegistration, setIsOpenRegistration] = useState(false)
  const [isOpenLogin, setIsOpenLogin] = useState(false)

  const [isOpenPincode, setIsOpenPincode] = useState(false)
  const [isOpenInformation, setIsOpenInformation] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [stateRecipe, dispatchRecipe] = useReducer(recipeReducer, recipeState);
  const [stateUser, dispatchUser] = useReducer(userReducer, userState);

  const [stateRestaurant, dispatchRestaurant] = useReducer(restaurantReducer, restaurantState);

  useEffect(()=>{
    let t=localStorage.getItem('tablesInfo')
    console.log(t)
  },[])

  return (
    <>
    <StoreContextRecipe.Provider value={{isSearchVisible, setIsSearchVisible,stateRestaurant, dispatchRestaurant,stateUser, dispatchUser, stateRecipe, dispatchRecipe}}>

   {/* <header  className='restaurant-interface'>
  
    </header> */}

      
     

          <Routes>
            <Route path='/finalRegistration' element={<LastRegistration/>}/>
            <Route path='/' element={<MainScreen stateRestaurant={stateRestaurant}/>}/>
            <Route path='/Profile' element={<Profile stateRestaurant={stateRestaurant}/>}/>
            <Route path='/book' element={<Reservations/>}/>
            <Route path='/table' element={<Tables/>}/>

          </Routes>
          
    </StoreContextRecipe.Provider>

    </>
  )
}

export default App
