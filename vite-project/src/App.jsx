import 'animate.css';
import '../public/fonts/bpg_nino_mtavruli_bold.ttf';
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
import HomePage from './homePage';
import TableManagment from './components/home/tableManagment';
import MenuHomePage from './components/home/menu';
import StuffHomePage from './components/home/stuf';
import Statistics from './components/home/statistic';
import Offers from './components/home/offers';
import Discounts from './components/home/discount';
import Distribution from './components/home/distribution';
import ProfileHomePage from './components/home/profile';
import Help from './components/home/help';
import Settings from './components/home/settings';
import * as signalR from "@microsoft/signalr";

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

  // useEffect(()=>{
  //   let t=localStorage.getItem('tablesInfo')
  //   console.log(t)
  // },[])


  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Create and start SignalR connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://54.93.212.178/systemHub')
      .build();

    newConnection.start()
      .then(() => {
        console.log('SignalR connected');
        // Optionally, you can perform additional actions upon successful connection
      })
      .catch(error => console.error(error));

    // Save the connection to state
    setConnection(newConnection);

    // Cleanup function
    // return () => {
    //   if (newConnection) {
    //     newConnection.stop();
    //   }
    // };
  }, []);



  return (
    <>
    <StoreContextRecipe.Provider value={{isSearchVisible, setIsSearchVisible,stateRestaurant, dispatchRestaurant,stateUser, dispatchUser, stateRecipe, dispatchRecipe}}>

   {/* <header  className='restaurant-interface'>
  
    </header> */}

      
     

          <Routes>
            <Route path='/finalRegistration' element={<LastRegistration/>}/>
            <Route path='/home' element={<MainScreen stateRestaurant={stateRestaurant}/>}/>
            <Route path='/Profile' element={<Profile stateRestaurant={stateRestaurant}/>}/>
            <Route path='/book' element={<Reservations/>}/>
            <Route path='/table' element={<Tables/>}/>
            <Route path='/' element={<HomePage/>}/>


            <Route path='/homePage/tables' element={<TableManagment/>}/>
            <Route path='/homePage/menu' element={<MenuHomePage/>}/>
            <Route path='/homePage/stuff' element={<StuffHomePage/>}/>
            <Route path='/homePage/statistics' element={<Statistics/>}/>
            <Route path='/homePage/offers' element={<Offers/>}/>
            <Route path='/homePage/discounts' element={<Discounts/>}/>
            <Route path='/homePage/distribution' element={<Distribution/>}/>
            <Route path='/homePage/myProfile' element={<ProfileHomePage/>}/>
            <Route path='/homePage/help' element={<Help/>}/>
            <Route path='/homePage/settings' element={<Settings/>}/>




          </Routes>
          
    </StoreContextRecipe.Provider>

    </>
  )
}

export default App
