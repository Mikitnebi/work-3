import { createContext, useReducer, useState } from 'react'
import { NavLink, Route, Routes, } from 'react-router-dom';

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

export const StoreContextRecipe = createContext({});


function App() {
  const [isOpenRegistration, setIsOpenRegistration] = useState(false)
  const [isOpenPincode, setIsOpenPincode] = useState(false)
  const [isOpenInformation, setIsOpenInformation] = useState(false)

  const [stateRecipe, dispatchRecipe] = useReducer(recipeReducer, recipeState);
  const [stateUser, dispatchUser] = useReducer(userReducer, userState);

  const [stateRestaurant, dispatchRestaurant] = useReducer(restaurantReducer, restaurantState);

  return (
    <>
    <StoreContextRecipe.Provider value={{stateRestaurant, dispatchRestaurant,stateUser, dispatchUser, stateRecipe, dispatchRecipe}}>

      <div className='restaurant-interface'>
        <div  className='line'></div>
        <div className='title'>
              <img src="/favicon.png" alt="Logo" className="header__logo  "/>
              <span>Restaurant.com</span>
        </div>

        <div className='registration' onClick={(e) => setIsOpenRegistration(true)}>Registration </div>
          <h1 className='slash'>/</h1>
        <div className='login-nav'>Log in</div>

        <RegistrationModal open={isOpenRegistration} onClose={() => setIsOpenRegistration(false)}>
          {
            <RegisterCompany openPincode={setIsOpenPincode} onClose={() => setIsOpenRegistration(false)}/>

          }
        </RegistrationModal>
      </div>
      <PinModal open={isOpenPincode} onClose={() => setIsOpenPincode(false)}>
              <PinCode setInformation={setIsOpenInformation} close={ setIsOpenPincode}/>
      </PinModal>
      <InformationModal open={isOpenInformation} onClose={() => setIsOpenInformation(false)}>
          <Information setInformation={setIsOpenInformation} close={setIsOpenInformation}/>
      </InformationModal>

          <Routes>
            <Route path='/finalRegistration' element={<LastRegistration/>}/>

          </Routes>
          
    </StoreContextRecipe.Provider>

    </>
  )
}

export default App
