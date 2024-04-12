import React, { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import { StoreContextRecipe } from '../../App';
import { manuState } from '../../state/State/index1'
import './modalChek.css'


export default function ModalChek({tableTags,tableNumber,position,status,id,img,aditional,person,data,name, open, children, onClose,menu }) {
  const [date, time] = data.split(', ');

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

  // Check if the parsed table number is NaN or null
  if (isNaN(parsedTableNumber) || parsedTableNumber === null) {
    // Alert the user that the entered number is invalid
    alert('Please enter a valid table number.');
    return;
  }

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
  

              <div className='reservation-details'>
                <p>რეზერვაციის დეტალები</p>
                <div>
                  <p>დღე</p>
                  <span>{date}</span>
                </div>
                <div>
                  <p>დრო</p>
                  <span>{time}</span>
                </div>
                <div>
                  <p>სტუმრების რაოდენობა</p>
                  <span>{person}</span>
                </div>
                <div>
                  <p>შენიშვნები</p>
                  <span>{aditional}</span>
                </div>
              </div>
              <div className='table-details'>
              <p>მაგიდის დეტალები</p>
              <div>
                  <p>კატეგორია</p>
                    {tableTags.map((tag, index) => (
                      <span key={index}>{tag}{index !== tableTags.length - 1 ? ', ' : ''}</span>
                      ))}
                </div>
                <div>
                  <p>მაგიდის ნომერი</p>
                  <span className='table-number-modal'>{tableNumber}</span>
                </div>

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


<div  className='payment'>{`: ჯამში ${payment} $`}</div>

</div>
              </div>


              {
                status ?
                <div className='button-flex-book'>
                <button className='book-button-modal' onClick={handleAccept}>
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
            <div className='reservation-finish'>
              <h3 className='position-client-accept'>დადასტურებულია !</h3>
              <h3 className='position-client-table'>{`მაგიდის ნომერი არის - ${tableNumber}`}</h3>
            </div>
            :
            <div className='reservation-finish' style={{justifyContent:'center'}}>
             <h3 className='position-client-reject'>უარყოფილია</h3>
            </div>
              }
              
        </div>
    </>,
    document.getElementById('portal6')
  )
}







// {Array.from(menu.entries()).map(([key, value]) => (
//   <div key={key}>{`${key}: ${value}`}</div>
// ))}















// <div className='figure-div-modal'> 

// <img src={img} alt='client photo'/>
// <h4 className="likes__name">{name}</h4>

// </div> 
// <div className='reservation-details-modal' >
// <p className="likes__author">{`სტუმრები - ${person}   `}</p>
// <p className="likes__author">{`თარიღი - ${data} `}</p>
// </div>

// <div className='reservation-details-modal1' >
// <p className="likes__author-aditional" >{`კლიენტის მოთხოვნა - ${aditional}`}</p>

// </div>

// <div className='reservation-details-modal1' >

// <p className="likes__author">{`მაგიდის ტიპი - `}{tableTags.map((tag, index) => (
// <span key={index}>{tag}{index !== tableTags.length - 1 ? ', ' : ''}</span>
// ))}</p>
// </div>


// <div className='chek-div'>
// {            
// Array.from(menu.entries()).map(([key, value]) =>{
// if(value[0] != 0){
// payment = payment + value[1]*value[0];
// return(
// <>
// <div className='chek-dishes' key={key}> {` ${value[0]} ${value[2]} .................................... ჯამში ${value[1]*value[0]} $`}
// <button onClick={(e) => {
// // console.log(disheName[index])
// handleDelete(key);
// }} className='delete-dish'><ion-icon className='icon-modal-check' size="large" name="close"></ion-icon></button>
// </div>

// </>
// )
// }

// })
// }


// <div  className='payment'>{`: ჯამში ${payment} $`}</div>

// </div>