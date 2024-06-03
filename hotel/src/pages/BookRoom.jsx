import React, { useState } from "react";

const BookRoom = ({ price }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
  
    const perNightPrice = price; 
    const weeklyDiscount = 28; 
    const cleaningFee = 62; 
    const serviceFee = 83; 
    const occupancyTaxesAndFees = 29;
  

    const getTodayDateString = () => {
        const today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
    
        return `${today.getFullYear()}-${month}-${day}`;
      };


    const handleCheckInChange = (e) => {
      setCheckInDate(e.target.value);
      setCheckOutDate('');
    };
  
    const handleCheckOutChange = (e) => {
      setCheckOutDate(e.target.value);
    };
  
    const calculateTotalPrice = () => {
      const numberOfNights = calculateNumberOfNights();
  
      const subtotal = perNightPrice * numberOfNights;
  
      const total = subtotal - weeklyDiscount + cleaningFee + serviceFee + occupancyTaxesAndFees;
  
      return total;
    };
  
    const calculateNumberOfNights = () => {
      if (!checkInDate || !checkOutDate) return 0;
  
      const oneDay = 24 * 60 * 60 * 1000; 
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
  
      const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  
      return diffDays+1;
    };
  return (
    <div className="cost-and-book">
      <div className="booking-card">
        <p>
          <b>${price} </b>/ night
        </p>
        <div className="dates-field">
          <span>
            <label htmlFor="checkIn">CHECK-IN</label>
            <input
              type="date"
              id="checkIn"
              value={checkInDate}
              onChange={handleCheckInChange}
              min={getTodayDateString()}
            />
          </span>
          <span>
            <label htmlFor="checkOut">CHECK-OUT</label>
            <input
              type="date"
              id="checkOut"
              value={checkOutDate}
              onChange={handleCheckOutChange}
              min={checkInDate}
            />
          </span>
        </div>
        <ul>
          <li>
            <p>
              ${perNightPrice} x {calculateNumberOfNights()} nights
            </p>{" "}
            <p>${perNightPrice * calculateNumberOfNights()}</p>
          </li>
          <li>
            <p>Weekly discount</p>{" "}
            <p style={{ color: "red" }}>-${weeklyDiscount}</p>
          </li>
          <li>
            <p>Cleaning fee</p> <p>${cleaningFee}</p>
          </li>
          <li>
            <p>Service fee</p> <p>${serviceFee}</p>
          </li>
          <li>
            <p>Occupancy taxes and fees</p> <p>${occupancyTaxesAndFees}</p>
          </li>
        </ul>
        <span className="total">
          <p>Total</p>
          <p style={{ color: "green", fontWeight: "500" }}>
            ${calculateTotalPrice()}
          </p>
        </span>
        <button className="btn">Continue to Book</button>
      </div>
    </div>
  );
};

export default BookRoom;
