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


export default function TableMenegmentModal({handleFinalSave,setSelectedTableNumber,setIsOpenRegistration,isQuestion,setIsQuestion,isEdit,handleOptionChange1,options,handleSaveTable,handleCancelTable,handleDeleteTable,selectedShapeIndex,shapes,selectWidth,handleTableDetailsChange,selectedShapeDetails, open, children, onClose }) {
  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div className='overlay-styleTables' onClick={onClose} />
        <div className='modal-stylesTables' >
            {/* <button className='button-xTables' onClick={onClose}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button> */}
            {
              isQuestion ? 
              <div  className="doYouHave-modal">
             <ion-icon onClick={onClose}  size='medium' name="close"></ion-icon>
             {/* <label style={{display:'flex', width:'100%' ,alignItems:'center',justifyContent:'flex-start' }}>
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
          
              </label>  */}
        <div>
        {
                          shapes[selectedShapeIndex].isFree ? 
                          "        დარწმუნებული ხართ რომ გსურთ ანგარიშის გახსნა ? " :
                          "        დარწმუნებული ხართ რომ გსურთ ანგარიშის დახურვა ? "
            }
        
        <span onClick={() => {
            // Toggle the value of isFree
           
            // Save logic
            handleSaveTable(3);
            // handleFinalSave()
            // Close modal
            onClose();
            setSelectedTableNumber(null)
        }}>
            კი
        </span>
        <span onClick={()=>
        {
          handleCancelTable();            
          handleFinalSave();
          setSelectedTableNumber(null);
          onClose();}}>არა</span>  
        </div>
       
      </div>
              :
              <div className="details-form-managment">
              {
                          selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
                  <>
                   <label style={{color:"#8C1D2F",fontSize:'18px',fontFamily: 'YourCustomFont, sans-serif'}}>
                მაგიდის ნომერი:
                <input
                                style={{fontFamily: 'YourCustomFont, sans-serif'}}

                disabled={isEdit}
                  type="number"
                  value={selectedShapeDetails.tableNumber}
                  onChange={(e) => handleTableDetailsChange('tableNumber', e.target.value)}
                />
              </label>
              <label                 style={{fontFamily: 'YourCustomFont, sans-serif'}}>
                მაქსიმალური ტევადობა:
                <input
                style={{fontFamily: 'YourCustomFont, sans-serif'}}
                      disabled={isEdit}
                  type="number"
                  value={selectedShapeDetails.maxPeopleAmount}
                  onChange={(e) => handleTableDetailsChange('maxPeopleAmount', e.target.value)}
                />
              </label>
              <label                 style={{fontFamily: 'YourCustomFont, sans-serif'}}>
                მინიმალური ტევადობა:
                <input
                                style={{fontFamily: 'YourCustomFont, sans-serif'}}

                      disabled={isEdit}
                  type="number"
                  value={selectedShapeDetails.minPeopleAmount}
                  onChange={(e) => handleTableDetailsChange('minPeopleAmount', e.target.value)}
                />
              </label>
              <label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start',fontFamily: 'YourCustomFont, sans-serif' }}>
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
                fontFamily: 'YourCustomFont, sans-serif',
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
          <label style={{display:'flex',flexDirection:'column', width:'100%' ,alignItems:'flex-start',fontFamily: 'YourCustomFont, sans-serif' }}>
            მაგიდის ტიპი
          <SelectInput isEdit={!isEdit} defaultValue={options[selectedShapeDetails.colorIndex]} options={options} onChange={handleOptionChange1} />
          
          </label> : <></>
              }
              {
                          selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
                          <>
                          <label style={{display:'flex', width:'100%' ,alignItems:'center',justifyContent:'flex-start',fontFamily: 'YourCustomFont, sans-serif' }}>
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
          
          
                        
                        </>
                        : <></>
              }
          
             
              {
                    selectedShapeDetails.type != 'ladder' && selectedShapeDetails.type != 'door' ?
          <>
          
          <button style={{fontFamily: 'YourCustomFont, sans-serif'}}  className='button-details button1' onClick={handleSaveTable}>
            შენახვა
            <ion-icon name="checkmark-outline"></ion-icon>
            </button>
              <button style={{fontFamily: 'YourCustomFont, sans-serif'}}   className='button-details button2' onClick={handleCancelTable}>
                გამოსვლა
                <ion-icon name="arrow-undo-outline"></ion-icon>
                </button>
              {
                !isEdit &&     <button  style={{fontFamily: 'YourCustomFont, sans-serif'}}  className='button-details button3' onClick={handleDeleteTable}>
                  წაშლა 
                <ion-icon name="trash-outline"></ion-icon>
                </button>
          
              }    </> 
              :
              <div style={{display:'flex', width:'100%', justifyContent:'space-between',height:"100%",alignItems:'center'}}>
              <button style={{ width:'40%',fontFamily: 'YourCustomFont, sans-serif'}} className='button-details button2' onClick={handleCancelTable}>
                გამოსვლა
                <ion-icon name="arrow-undo-outline"></ion-icon>
                </button>
              {
                !isEdit &&     <button style={{ width:'40%',fontFamily: 'YourCustomFont, sans-serif'}} className='button-details button3' onClick={handleDeleteTable}>
                  წაშლა
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
          
              }
              </div>
              }
          
              
            </div>
            }
   
        </div>
    </>,
    document.getElementById('portal9')
  )
}