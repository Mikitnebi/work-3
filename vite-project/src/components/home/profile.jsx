import { NavLink, useLocation, useParams } from 'react-router-dom'
import './homePage.css'
import { useState } from 'react';
import { limitRecipeTitle } from '../../utils';



export default function ProfileHomePage () {

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    const params = useParams();
    const location = useLocation();

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className={`homePage-container ${isOpenSideBar ? 'sidebar-open' : 'sidebar-closed'}`}>
        <img className='home-paige-logo' src="../../../public/img/Group4.png" alt="" />
            <nav className='side-NavBar'>
            <ion-icon
    style={{
        color: 'white',
        fontSize: isOpenSideBar ? '150%' : '150%',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        position: isOpenSideBar ? 'absolute' : 'fixed',
        top: isOpenSideBar ? '-5%' : '3%',
        right: isOpenSideBar ? '0' : 'auto',
        display: isOpenSideBar ? 'initial' : 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
    name={isOpenSideBar ? "close-outline" : "list-outline"}
    onClick={() => setIsOpenSideBar(!isOpenSideBar)}
></ion-icon>



<ul> 
            <div className='restaurant-image-name'>
                <div>
                <img className='restaurant-image' src="../../../public/jason-leung-poI7DelFiVA-unsplash.jpg" alt="" />

                </div>
                <div>
                    {
                        isOpenSideBar &&  <span  className='restaurant-name'>მაჭახელა</span >

                    }
                </div>
            </div>
            <NavLink
            key={1}
            className='book3'
            to="/homePage/tables"
            style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => console.log(5)}
        >
            
            <img
                className='homePage-images'
                src={
                    hoveredIndex === 1 || location.pathname === "/homePage/tables"
                        ? "../../../public/homePage/მაგიდებიწ.png"
                        : "../../../public/homePage/მაგიდებით.png"
                }
                alt=""
            />
            {isOpenSideBar ? 'მაგიდების მენეჯმენტი' : null}
        </NavLink>

            <NavLink
                    key={2}
                    className='book3'
                    to="/homePage/menu"
                    style={({ isActive }) => {
                        return isActive ? {
                            backgroundColor: "#D9D9D9",
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            color: '#8C1D2F',
                            fontWeight: '700'
                        } : null
                    }}
                      onMouseEnter={() => handleMouseEnter(2)}
                      onMouseLeave={handleMouseLeave}
                    onClick={() => console.log(5)}
                >
                          <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 2 || location.pathname === "/homePage/menu"
                        ? "../../../public/homePage/მენიუწ.png"
                        : "../../../public/homePage/მენიუთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'მენიუ' : null}

                    
                </NavLink>
            <NavLink
                    key={3}
                    className='book3'
                    to="/homePage/stuff"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(3)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                            <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 3 || location.pathname === "/homePage/stuff"
                        ? "../../../public/homePage/სტაფიწ.png"
                        : "../../../public/homePage/სტაფით.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'სტაფის მენეჯმენტი' : null}

                    
                </NavLink>


            <NavLink
                    key={4}
                    className='book3'
                    to="/homePage/statistics"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(4)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 4 || location.pathname === "/homePage/statistics"
                        ? "../../../public/homePage/სტატისტიკაწ.png"
                        : "../../../public/homePage/სტატისტიკათ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'სტატისტიკა' : null}

                    
                </NavLink>


            <NavLink
                    key={5}
                    className='book3'
                    to="/homePage/offers"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(5)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 5 || location.pathname === "/homePage/offers"
                        ? "../../../public/homePage/აქციებიწ.png"
                        : "../../../public/homePage/აქციებით.png"
                }
                alt="" 
            />
                        {isOpenSideBar ? 'აქციები' : null}

                    
                </NavLink>


            <NavLink
                    key={6}
                    className='book3'
                    to="/homePage/discounts"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 6 || location.pathname === "/homePage/discounts"
                        ? "../../../public/homePage/სეილწ.png"
                        : "../../../public/homePage/სეილთ.png"
                }
                alt="" 
            />
                        {isOpenSideBar ? 'ფასდაკლებები' : null}

                    
                </NavLink>


            <NavLink
                    key={7}
                    className='book3'
                    to="/homePage/distribution"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(7)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 7 || location.pathname === "/homePage/distribution"
                        ? "../../../public/homePage/დისტრწ.png"
                        : "../../../public/homePage/დისტრთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'დისტრიბუცია' : null}

                    
                </NavLink>


            <NavLink
                    key={8}
                    className='book3'
                    to="/homePage/myProfile"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(8)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 8 || location.pathname === "/homePage/myProfile"
                        ? "../../../public/homePage/accountw.png"
                        : "../../../public/homePage/accountt.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'ჩემი ანგარიში' : null}

                    
                </NavLink>


            <NavLink
                    key={9}
                    className='book3'
                    to="/homePage/help"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(9)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 9 || location.pathname === "/homePage/help"
                        ? "../../../public/homePage/დახმარებაწ.png"
                        : "../../../public/homePage/დახმარებათ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'დახმარება' : null}

                    
                </NavLink>


            <NavLink
                    key={10}
                    className='book3'
                    to="/homePage/settings"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(10)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 10 || location.pathname === "/homePage/settings"
                        ? "../../../public/homePage/სეთინგსწ.png"
                        : "../../../public/homePage/სეთინგსთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'პარამეტრები' : null}

                    
                </NavLink>


            </ul>
            <div className='log-out-div'>
                <img className='logout-image' src="../../../public/homePage/გასვლათეთრი.png" alt="" />
                {isOpenSideBar && <span>გამოსვლა</span>}
            </div>
            </nav>

            <div className='content-container'></div>
        </div>
    );
}