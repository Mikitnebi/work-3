import { Link, NavLink } from 'react-router-dom'
import './style.css'
import ModalChek from '../modals/modalCheck';
import { useState } from 'react';



export default function BookCard ( {tableNumber,position,status,id,img,name,data,person,aditional } ) {

    const [menu, setMenu] = useState(new Map());

    const clearMenu = function ()  {
      setMenu(new Map());
    };
    const [isOpenModal,setIsOpenModal] = useState(false)

    return(
    <ul className="likes__list" >
        <ModalChek tableNumber={tableNumber} position={position} status={status} id={id} img={img} aditional={aditional} person={person} data={data} name={name} menu={menu} setMenu={setMenu} open={isOpenModal} onClose={() => {setIsOpenModal(false);  }}> </ModalChek>   

        <li onClick={()=>setIsOpenModal(true)}>
            <NavLink    className="likes__link" >
                    <figure className="likes__fig">
                        <img src={img} alt='client photo'/>
                    </figure>
                    <div className="likes__data">
                        <h4 className="likes__name">{name}</h4>
                        <p className="likes__author">{`Person - ${person}   `}</p>
                        <p className="likes__author">{` Date - ${data} `}</p>
                    </div>
                    
            </NavLink>
        </li>
    </ul>
    )
}