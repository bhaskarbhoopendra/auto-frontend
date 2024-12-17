import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{title}</h2>
                <p>Please Enter your Card Details</p>
              </div>
              <button onClick={onClose} className="modal-close">
                &times;
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
