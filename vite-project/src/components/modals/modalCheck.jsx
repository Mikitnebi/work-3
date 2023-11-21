import React, { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import { StoreContextRecipe } from '../../App';
import { manuState } from '../../state/State/index1'
import './modalChek.css'


export default function ModalChek({tableNumber,position,status,id,img,aditional,person,data,name, open, children, onClose,menu }) {

    // const dishes = Object.values(stateManu);
    // const dishesKeys = Object.keys(stateManu); 
    // const disheName = Object.values(stateManuName);
    // const dishePrice= Object.values(stateManuPrice);
    let payment = 0;
    if (!open) return null
    const handleDelete = (key) => {
      setMenu((prevMenu) => {
        const updatedMenu = new Map(prevMenu);
        updatedMenu.delete(key);
        return updatedMenu;
      });
    };

    const { stateRecipe,dispatchRecipe } = useContext(StoreContextRecipe);
const handleAccept = () => {
    const tableNumber = window.prompt('Enter table number:');
    if (tableNumber === null || isNaN(tableNumber)) {
      // User canceled the prompt or entered an invalid number
      return;
    }

    // Convert the entered table number to a number
    const parsedTableNumber = parseInt(tableNumber, 10);

    dispatchRecipe({
      type: "chooseTable",
      value: {
        id: id,
        number: parsedTableNumber,
      },
    });

    dispatchRecipe({
      type: "acceptRequst",
      value: {
        id: id,
      },
    });

    onClose();
  };
  return ReactDom.createPortal(
    <>
      <div className='overlay-style' onClick={onClose} />
        <div className='modal-styles22' >
          <button className='button-x-check' onClick={onClose}><ion-icon className='button-x-check' size='large' name="close"></ion-icon></button>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}> 

            <figure className="likes__fig">
                        <img src={img} alt='client photo'/>
            </figure>
            <h4 className="likes__name">{name}</h4>

          </div>
          <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:"100%",marginTop:"20px"}}>
            <p className="likes__author">{`Person - ${person}   `}</p>
            <p className="likes__author">{` Date - ${data} `}</p>
          </div>
          
          <p className="likes__author-aditional" >{`client's desire - ${aditional}`}</p>

            <div className='chek-div'>
{            
Array.from(menu.entries()).map(([key, value]) =>{
  if(value[0] != 0){
    payment = payment + value[1]*value[0];
    return(
      <>
        <div className='chek-dishes' key={key}> {` ${value[0]} ${value[2]} .................................... ჯამში ${value[1]*value[0]} $`}
          <button onClick={(e) => {
            // console.log(disheName[index])
            handleDelete(key);
          }} className='delete-dish'><ion-icon className='icon-modal-check' size="large" name="close"></ion-icon></button>
        </div>
       
      </>
    )
  }

})
}


              <div className='payment'>{`: ჯამში ${payment} $`}</div>
              
              </div>
              {
                status ?
                <div className='button-flex-book'>
                <button className='book-button-green' onClick={handleAccept}>
                  Accept
                </button>
                <button
                  className='book-button-red'
                  onClick={() => {
                    dispatchRecipe({
                      type: "rejectRequest",
                      value: {
                        id: id,
                      },
                    });
                    dispatchRecipe({
                      type: "acceptRequst",
                      value: {
                        id: id,
                      },
                    });
                    onClose();
                  }}
                >
                  Reject
                </button>
              </div>
          :
            position ?
            <>
            <h3 className='position-client-accept'>Accepted</h3>
            <h3 className='position-client-table'>{`Table's number is - ${tableNumber}`}</h3>
            </>
            :
            <h3 className='position-client-reject'>Rejected</h3>
              }
              
        </div>
    </>,
    document.getElementById('portal6')
  )
}







// {Array.from(menu.entries()).map(([key, value]) => (
//   <div key={key}>{`${key}: ${value}`}</div>
// ))}