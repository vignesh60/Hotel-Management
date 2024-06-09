import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

const BookRoom = ({ price, r_image, roomName }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [user, setUser] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate();
  const { userinfo } = useContext(UserContext);

  const perNightPrice = price;
  const weeklyDiscount = 28;
  const cleaningFee = 62;
  const serviceFee = 83;
  const occupancyTaxesAndFees = 29;

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getBookings");
        setBookedDates(res.data);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, []);

  const getEarliestAvailableDate = () => {
    const today = new Date();
    bookedDates.forEach((bookedDate) => {
      if (roomName === bookedDate.room_name) {
        const endDate = new Date(bookedDate.check_out_date);
        if (endDate > today) {
          today.setDate(endDate.getDate() + 1);
        }
      }
    });

    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${today.getFullYear()}-${month}-${day}`;
  };

  const earliestAvailableDate = getEarliestAvailableDate();

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
    setCheckOutDate("");
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const calculateTotalPrice = () => {
    const numberOfNights = calculateNumberOfNights();

    const subtotal = perNightPrice * numberOfNights;

    const total =
      subtotal -
      weeklyDiscount +
      cleaningFee +
      serviceFee +
      occupancyTaxesAndFees;

    return total;
  };

  const calculateNumberOfNights = () => {
    if (!checkInDate || !checkOutDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

    return diffDays + 1;
  };

  useEffect(() => {
    const getLocal = localStorage.getItem("isLogin");
    if (getLocal) {
      setUser(true);
    }
  });
  const handleBook = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Give the ckeck-in and check-out dates");
    } else {
      if (user) {
        const confirmbook = window.confirm(
          "Are you sure you want to book this room?"
        );
        if (confirmbook) {
          const bookingData = {
            user_name: userinfo.username,
            user_email: userinfo.useremail,
            total_cost: calculateTotalPrice(),
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            room_image: r_image,
            room_name: roomName,
          };

          try {
            const res = await axios.post(
              "http://localhost:5000/bookRoom",
              bookingData
            );
            alert("Booking successful");
          } catch (error) {
            console.error("Error booking the room:", error);
          }
        }
      } else {
        navigate("/signin");
      }
    }
  };

  /* const isDateBooked = (date) => {
    return bookedDates.some((bookedDate) => {
      const startDate = new Date(bookedDate.check_in_date);
      const endDate = new Date(bookedDate.check_out_date);
      const currentDate = new Date(date);

      return currentDate >= startDate && currentDate <= endDate;
    });
  }; */

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
              min={earliestAvailableDate}
              required
              /* disabled={isDateBooked(checkInDate)} */
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
              required
              /* disabled={isDateBooked(checkOutDate)} */
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
        <button
          className="btn"
          onClick={handleBook}
          /* disabled={!checkInDate || !checkOutDate} */
        >
          Continue to Book
        </button>
      </div>
    </div>
  );
};

export default BookRoom;
