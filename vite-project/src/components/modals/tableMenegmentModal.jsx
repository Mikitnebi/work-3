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


const tagOptions = [
    { value: '#ფანჯარასთან ახლოს', label: '#ფანჯარასთან ახლოს' },
    { value: '#მყუდრო', label: '#მყუდრო' },
    { value: '#რომანტიული', label: '#რომანტიული' },
    { value: '#ღიაცისქვეშ', label: '#ღიაცისქვეშ' },
  ];


export default function TableMenegmentModal({isEdit,handleOptionChange1,options,handleSaveTable,handleCancelTable,handleDeleteTable,selectedShapeIndex,shapes,selectWidth,handleTableDetailsChange,selectedShapeDetails, open, children, onClose }) {
  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div className='overlay-styleTables' onClick={onClose} />
        <div className='modal-stylesTables' >
            {/* <button className='button-xTables' onClick={onClose}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button> */}
            <div className="details-form-managment">
    {
                selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
        <>
         <label style={{color:"#8C1D2F",fontSize:'18px',fontWeight:'400'}}>
      მაგიდის ნომერი:
      <input
      disabled={isEdit}
        type="number"
        value={selectedShapeDetails.tableNumber}
        onChange={(e) => handleTableDetailsChange('tableNumber', e.target.value)}
      />
    </label>
    <label>
      მაქსიმალური ტევადობა:
      <input
            disabled={isEdit}
        type="number"
        value={selectedShapeDetails.maxPeopleAmount}
        onChange={(e) => handleTableDetailsChange('maxPeopleAmount', e.target.value)}
      />
    </label>
    <label>
      მინიმალური ტევადობა:
      <input
            disabled={isEdit}
        type="number"
        value={selectedShapeDetails.minPeopleAmount}
        onChange={(e) => handleTableDetailsChange('minPeopleAmount', e.target.value)}
      />
    </label>
    <label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start' }}>
      მაგიდის ტეგი:
<Select
isDisabled={isEdit}
  value={selectedShapeDetails.selectedTag}
  onChange={(selectedOption) =>
    handleTableDetailsChange('selectedTag', selectedOption)
  }
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
/>

    </label>
    
        </> : <></>
    }

    {
                      selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
<label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start' }}>
  მაგიდის ტიპი
<SelectInput isEdit={!isEdit} defaultValue={options[selectedShapeDetails.colorIndex]} options={options} onChange={handleOptionChange1} />

</label> : <></>
    }
    {
                selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
                <>
                <label style={{display:'flex', width:'100%' ,alignItems:'center',justifyContent:'flex-start' }}>
                მაგიდა დაჯავშნისთვისაა ?
                
          
                
          
            <input 
              disabled={isEdit}
              type="checkbox"
              onChange={(e) => {
                if(shapes[selectedShapeIndex].isForReservation){
                  handleTableDetailsChange('isForReservation',false)
                } else {
                  handleTableDetailsChange('isForReservation',true)
          
                }
              }}
              style={{width:'5%'}}
              defaultChecked={shapes[selectedShapeIndex]?.isForReservation}
              />
          
              </label>


               <label style={{display:'flex', width:'100%' ,alignItems:'center',justifyContent:'flex-start' }}>
                დაკავებულია ?
                
          
                
          
            <input 

              type="checkbox"
              onChange={(e) => {
                if(shapes[selectedShapeIndex].isFree){
                  handleTableDetailsChange('isFree',false)
                } else {
                  handleTableDetailsChange('isFree',true)
          
                }
              }}
              style={{width:'5%'}}
              defaultChecked={shapes[selectedShapeIndex]?.isFree}
              />
          
              </label> 
              </>
              : <></>
    }

   
    {
          selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
<>

<button  className='button-details button1' onClick={handleSaveTable}>შენახვა</button>
    <button  className='button-details button2' onClick={handleCancelTable}>გამოსვლა</button>
    {
      !isEdit &&     <button  className='button-details button3' onClick={handleDeleteTable}>წაშლა</button>

    }    </> 
    :
    <div style={{display:'flex', width:'100%', justifyContent:'space-between',height:"100%",alignItems:'center'}}>
    <button style={{ width:'40%'}} className='button-details button2' onClick={handleCancelTable}>გამოსვლა</button>
    {
      !isEdit &&     <button style={{ width:'40%'}} className='button-details button3' onClick={handleDeleteTable}>წაშლა</button>

    }
    </div>
    }

    
  </div>
        </div>
    </>,
    document.getElementById('portal9')
  )
}