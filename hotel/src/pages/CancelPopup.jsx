// CancelPopup.js
import React from 'react';

const CancelPopup = ({ onClose, totalNights }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Booking Instructions</h2>
          <p>If you cancel the booking after {totalNights} day(s), the refund will be reduced based on the number of days you cancel.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  

export default CancelPopup;
