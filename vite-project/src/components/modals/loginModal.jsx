import React from 'react'
import ReactDom from 'react-dom'
import './registration.css'



export default function LoginModal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlay-style' onClick={onClose} />
        <div className='modal-styles' >
            <button className='button-x32' onClick={onClose}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
                <h1 className='register-title' >
                    Welcome to Mikitani.com
                </h1>
            {
                children
            }
        </div>
    </>,
    document.getElementById('portal5')
  )
}