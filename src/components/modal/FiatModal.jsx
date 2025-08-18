import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./FiatModal.css"


const FiatModal = ({ show, onClose, children }) => {
     if (!show) return null; // don’t render if not visible

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} >
            <div className="modal-header">
                <button className="close-btn" onClick={onClose}>✖</button>
                <h4 className="text-center">Select Fiat</h4>
            </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <button className="confirm-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiatModal;
