
import ReactDom from 'react-dom'
import './tableManagmentmodal.css'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { limitRecipeTitle } from '../../utils';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Line, Text } from 'react-konva';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import SelectInput from '../selecter';
import TransformableRectangle from '../addTables/TransformerRect';
import TransformableCircle from '../addTables/TransformerCircle';
import TransformableThird from '../addTables/TransformerThird';
import TransformableLedder from '../addTables/TransformerLedder';
import TransformableDoor from '../addTables/TransformerDoor';
import { Container } from '@mui/material';
const tagOptions = [
  { value: '#lemon', label: '#lemon' },
  { value: '#meat', label: '#meat' },
  { value: '#cheese', label: '#cheese' },
  { value: '#salt', label: '#salt' },
];

const GeorgiantagOptions = [
  { value: '#ლიმონი', label: '#ლიმონი' },
  { value: '#ხორცი', label: '#ხორცი' },
  { value: '#ყველი', label: '#ყველი' },
  { value: '#მარილი', label: '#მარილი' },
];


export default function MenuManagmentDishModal ({setSelectedItem1,menuSections,setMenuSections,handleFinalSave,simpleErrors,updateMenuItemForModal,selectedItemIndex,selectedSectionIndex, open, children, onClose,selectedItem1 }) {
 
  const [editedItem, setEditedItem] = useState(); // Initialize editedItem state
  useEffect(() => {
    setEditedItem(selectedItem1)
  }, [selectedItem1]); 



  const [selectWidth, setSelectWidth] = useState('100%'); // Initial width set to 100%
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth; // Get the screen width

      setSelectWidth(`${screenWidth*20.7/100}px`); // Set the width of the Select component
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Initialize width on mount
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  const handleSave = () => {
    console.log(editedItem)
    // Update the main state with the edited item
    updateMenuItemForModal(selectedSectionIndex, selectedItemIndex, editedItem);
    handleFinalSave(true)
    setSelectedItem1(editedItem)
    setIsEdit(!isEdit)
};

const handleCancel = () => {
  setIsEdit(!isEdit)
    // Reset editedItem to selectedItem1
    setEditedItem(selectedItem1);
};

  
  const [isEdit, setIsEdit] = useState(false); // Initial width set to 100%

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlay-styleManu' onClick={onClose} />
        <div className='modal-stylesManu' >
            <button className='button-xTables' onClick={onClose}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
            <div className='item-photo'>
    
            </div>
            <div className='manu-modal-isEdit'>
              {
                isEdit ?
                <div>
                <label htmlFor="create-outline" onClick={handleCancel}>დაბრუნება 
                <ion-icon name="close-outline"></ion-icon>
                </label>
                <label htmlFor="create-outline" onClick={handleSave}>შენახვა 
                <ion-icon name="checkmark-outline"></ion-icon>
                </label>
                </div>
                :
                <label htmlFor="create-outline" onClick={()=>setIsEdit(!isEdit)}>შეცვლა 
                <ion-icon name="create-outline"></ion-icon>
                </label>
              }
             
            </div>
            <div className="menu-item-modal">
              <div>
              <label  htmlFor={`dishName-${selectedSectionIndex}-${selectedItemIndex}`}>ინგლისური სახელი:</label>

<input
style={simpleErrors[`itemName${selectedSectionIndex}-${selectedItemIndex}`] ? {borderColor:'#cc314b',borderWidth:'2px'}:{border:'none'}}
  type="text"
  placeholder="კერძის ინგლისური სახელი"
  value={editedItem.name}
  onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}

  id={`dishName-${selectedSectionIndex}-${selectedItemIndex}`}
  disabled={!isEdit}
/>
{/* {simpleErrors[`itemName${selectedSectionIndex}-${selectedItemIndex}`] && 
  <div className="error-message">
    შეიყვანეთ კერძის სახელი ინგლისურად
  </div>
  
} */}
<label  htmlFor={`georgianDishName-${selectedSectionIndex}-${selectedItemIndex}`}>ქართული სახელი:</label>

<input
  disabled={!isEdit}
  style={simpleErrors[`itemGeorgianName${selectedSectionIndex}-${selectedItemIndex}`] ? {borderColor:'#cc314b',borderWidth:'2px'}:{border:'none'}}

type="text"
placeholder="კერძის ქართული სახელი"
value={editedItem.georgianName}
onChange={(e) => setEditedItem({ ...editedItem, georgianName: e.target.value })}


id={`georgianDishName-${selectedSectionIndex}-${selectedItemIndex}`}
/>
{/* {simpleErrors[`itemGeorgianName${selectedSectionIndex}-${selectedItemIndex}`] && 
<div className="error-message">
შეიყვანეთ კერძი ქართულად
</div>
} */}
              </div>
<div>
<label  htmlFor={`DishDescription-${selectedSectionIndex}-${selectedItemIndex}`}>აღწერა ინგლისურად:</label>

<textarea className="menuTextArea"
  disabled={!isEdit}
  style={simpleErrors[`itemDescription${selectedSectionIndex}-${selectedItemIndex}`] ? {borderColor:'#cc314b',borderWidth:'2px'}:{border:'none'}}

placeholder="კერძის აღწერა ინგლისურად"
value={editedItem.description}
onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}

id={`DishDescription-${selectedSectionIndex}-${selectedItemIndex}`}
/>

<label  htmlFor={`GeorgianDishDescription-${selectedSectionIndex}-${selectedItemIndex}`}>აღწერა ქართულად:</label>

<textarea className="menuTextArea"
  disabled={!isEdit}
  style={simpleErrors[`itemGeorgianDescription${selectedSectionIndex}-${selectedItemIndex}`] ? {borderColor:'#cc314b',borderWidth:'2px'}:{border:'none'}}

placeholder="კერძის აღწერა ქართულად"
value={editedItem.georgianDescription}
onChange={(e) => setEditedItem({ ...editedItem, georgianDescription: e.target.value })}


id={`GeorgianDishDescription-${selectedSectionIndex}-${selectedItemIndex}`}
/>
{/* {simpleErrors[`itemGeorgianDescription${selectedSectionIndex}-${selectedItemIndex}`] && 
<div className="error-message">
შეიყვანეთ კერძის აღწერა ქართულად
</div>
} */}
</div>
<div>
          <label  htmlFor={`image-${selectedSectionIndex}-${selectedItemIndex}`}>კერძის ფოტო:</label>

<input
  disabled={!isEdit}
  style={simpleErrors[`itemImage${selectedSectionIndex}-${selectedItemIndex}`] ? {borderColor:'#cc314b',borderWidth:'2px'}:{border:'none'}}

id={`image-${selectedSectionIndex}-${selectedItemIndex}`}
  type="file"
  accept=".jpg, .jpeg, .png, .gif"
  // onChange={(e) => setEditedItem({ ...editedItem, georgianDescription: e.target.value })}

  // onChange={(e) => {
  //   const file = e.target.files[0];
  //   updateMenuItem(
  //     selectedSectionIndex,
  //     selectedItemIndex,
  //     "image",
  //     URL.createObjectURL(file)
  //   );
  // }}
/>



<label  htmlFor={`DishPrice-${selectedSectionIndex}-${selectedItemIndex}`}>კერძის ფასი:</label>

<input
  disabled={!isEdit}
  style={simpleErrors[`itemPrice${selectedSectionIndex}-${selectedItemIndex}`] ? {borderColor:'#cc314b',borderWidth:'2px'}:{border:'none'}}

  type="number"
  placeholder="კერძის ფასი"
  value={editedItem.price}
  onChange={(e) => setEditedItem({ ...editedItem, price: e.target.value })}


  id={`DishPrice-${selectedSectionIndex}-${selectedItemIndex}`}
/>

          </div>
        </div>
        <div className='ingredients-modal'>
          <div>
          <label  htmlFor={`ingredients-${selectedSectionIndex}-${selectedItemIndex}`}>ინგრედიენტები:</label>

<Select
value={editedItem.ingredients}
onChange={(selectedOption) => setEditedItem({ ...editedItem, ingredients: selectedOption })}

 options={tagOptions}
isMulti
styles={{
control: (baseStyles, state) => ({
...baseStyles,
color: 'red',
borderColor: state.isFocused ? '#8C1D2F' : '#8C1D2F',
'&:hover': {
borderColor: '#8C1D2F', // Change border color on hover
},
width: selectWidth,
backgroundColor: '#D9D9D9',
outline: 'none', // Remove default outline,
border: '1px solid #8C1D2F',
// This line disable the blue border
boxShadow: 'none'
}),
multiValue: (baseStyles) => ({
...baseStyles,
backgroundColor: '#C6B0B4', // Set the background color for added tags
}),
dropdownIndicator: (baseStyles, state) => ({
...baseStyles,
color: state.isFocused ? '#8C1D2F' : '#8C1D2F', // Change the color when focused
}),
}}
id={`ingredients-${selectedSectionIndex}-${selectedItemIndex}`}
isDisabled={!isEdit}

/>
{simpleErrors[`itemIngredients${selectedSectionIndex}-${selectedItemIndex}`] && 
<div className="error-message">
შეიყვანეთ ინგრედიენტები
</div>
}
          </div>

<div>
<label  htmlFor={`GeorgianIngredients-${selectedSectionIndex}-${selectedItemIndex}`}>ინგრედიენტები ქართულად:</label>


<Select
value={editedItem.georgianIngredients}
onChange={(selectedOption) => setEditedItem({ ...editedItem, georgianIngredients: selectedOption })}

 options={GeorgiantagOptions}
isMulti
styles={{
control: (baseStyles, state) => ({
...baseStyles,
color: 'red',
borderColor: state.isFocused ? '#8C1D2F' : '#8C1D2F',
'&:hover': {
borderColor: '#8C1D2F', // Change border color on hover
},
width: selectWidth,
backgroundColor: '#D9D9D9',
outline: 'none', // Remove default outline,
border: '1px solid #8C1D2F',
// This line disable the blue border
boxShadow: 'none'
}),
multiValue: (baseStyles) => ({
...baseStyles,
backgroundColor: '#C6B0B4', // Set the background color for added tags
}),
dropdownIndicator: (baseStyles, state) => ({
...baseStyles,
color: state.isFocused ? '#8C1D2F' : '#8C1D2F', // Change the color when focused
}),
}}
id={`GeorgianIngredients-${selectedSectionIndex}-${selectedItemIndex}`}
isDisabled={!isEdit}

/>
{simpleErrors[`itemGeorgianIngredients${selectedSectionIndex}-${selectedItemIndex}`] && 
<div className="error-message">
შეიყვანეთ ინგრედიენტები ქართულად
</div>
}
</div>

        </div>  

        <div className='manu-modal-buttons'>
          <button>წაშლა</button>
          
          <button>დეაქტივაცია</button>
        </div> 
      
        </div>
    </>,
    document.getElementById('portal10')
  )
} 

