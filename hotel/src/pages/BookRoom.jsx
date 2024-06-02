import React, { useState } from "react";

const BookRoom = ({ price }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
  
    // Constants for pricing
    const perNightPrice = 79; // Example per night price
    const weeklyDiscount = 28; // Example weekly discount
    const cleaningFee = 62; // Example cleaning fee
    const serviceFee = 83; // Example service fee
    const occupancyTaxesAndFees = 29; // Example occupancy taxes and fees
  
    // Handle date input changes
    const handleCheckInChange = (e) => {
      setCheckInDate(e.target.value);
    };
  
    const handleCheckOutChange = (e) => {
      setCheckOutDate(e.target.value);
    };
  
    // Calculate total price based on per night price ($79)
    const calculateTotalPrice = () => {
      const numberOfNights = calculateNumberOfNights();
  
      // Calculate subtotal
      const subtotal = perNightPrice * numberOfNights;
  
      // Calculate total including fees and discounts
      const total = subtotal - weeklyDiscount + cleaningFee + serviceFee + occupancyTaxesAndFees;
  
      return total;
    };
  
    // Helper function to calculate number of nights between check-in and check-out
    const calculateNumberOfNights = () => {
      if (!checkInDate || !checkOutDate) return 0;
  
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
  
      const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  
      return diffDays;
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
            />
          </span>
          <span>
            <label htmlFor="checkOut">CHECK-OUT</label>
            <input
              type="date"
              id="checkOut"
              value={checkOutDate}
              onChange={handleCheckOutChange}
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
