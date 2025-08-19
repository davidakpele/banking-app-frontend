import React, {useContext} from "react";
import { Button } from "react-bootstrap";
import {ThemeContext} from "../context/ThemeContext"
import "./FiatModal.css";

const BankListModal = ({ show, onClose, onSelectBank }) => {
  const { theme } = useContext(ThemeContext);
  if (!show) return null;

  const handleSelect = () => {
    // just an example — replace "Bank ABC" with the actual selected bank
    const selectedBank = "Bank ABC";
    onSelectBank(selectedBank); // ⬅️ calling function from parent
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>✖</button>
          <h4 className="text-center">Select Bank</h4>
        </div>

        <div className="modal-body">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input 
              type="text" 
              className="form-control search-banks" 
              placeholder="Search Bank..." 
              aria-describedby="search-addon" 
            />
          </div>
        </div>

        <div className="bank-container-list">
          <div class={`no-data-found text-center ${theme === "dark" ? "color-dark":"color-dark"}`}>No data found</div>
        </div>

        <div className="modal-footer">
          <Button 
            type="button"  
            className="custom-btn w-100 mt-4 mb-4"
            onClick={handleSelect}  // ⬅️ calls parent function
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BankListModal;