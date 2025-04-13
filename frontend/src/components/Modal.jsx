import React from 'react';
import '../styles/main.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="modal-close">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
