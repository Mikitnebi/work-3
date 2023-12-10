import React from 'react'
import ReactDom from 'react-dom'
import './registration.css'



export default function ParentMenuModal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal( 
    <>
      <div className='overlay-style' onClick={onClose} />
        <div style={{overflow:'scroll',width:'80%',height:'90%'}} className='modal-styles' >
            <button className='button-x33' onClick={onClose}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
            {children}
        </div>
    </>,
    document.getElementById('portal4')
  )
}