import React, {useContext} from "react";
import {  Button } from "react-bootstrap";
import "./FiatModal.css"
import {ThemeContext} from "../context/ThemeContext"


const FiatModal = ({ show, onClose }) => {
  const { theme } = useContext(ThemeContext);
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

        <div className="modal-body">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control search-banks" placeholder="Search Fiat..." aria-describedby="search-addon" />
          </div>
        </div>
        <div class="bank-container-list">
          <div class={`no-data-found text-center ${theme === "dark" ? "color-dark":"color-dark"}`}>No data found</div>
        </div>
        <div className="modal-footer">
         <Button type='submit'  className="custom-btn w-100 mt-4 mb-4">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiatModal;