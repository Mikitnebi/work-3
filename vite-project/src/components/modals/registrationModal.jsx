import React from 'react'
import ReactDom from 'react-dom'
import './registration.css'

 

export default function RegistrationModal({setIsLoginOrRegistration, open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlay-style' onClick={()=>{onClose();setIsLoginOrRegistration(false)}} />
        <div className='modal-styles' >
            <button className='button-x32' onClick={()=>{onClose();setIsLoginOrRegistration(false)}}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>

            {
                children
            }
        </div>
    </>,
    document.getElementById('portal')
  )
}