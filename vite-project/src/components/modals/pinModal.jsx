import React from 'react'
import ReactDom from 'react-dom'
import './pinmodal.css'



export default function PinModal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='overlay-style11' onClick={onClose} />
        <div className='modal-styles11' >
            <button className='button-x11' onClick={onClose}><ion-icon className='icon-modal' size='large' name="close"></ion-icon></button>
            {children}
        </div>
    </>,
    document.getElementById('portal2')
  )
}