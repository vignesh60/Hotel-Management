import React, { useEffect, useState } from "react";
import Rooms from "../components/rooms";
import axios from "axios";

const DashBoard = () => {
  const [images, setImages] = useState(Rooms[7].room);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getBookings");
        setBookedDates(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, []);

  const LoadingSpinner = () => <div className="spinner"></div>;

  if (loading) {
    return (
      <div
        style={{ paddingTop: "5rem", textAlign: "center" }}
        className="spinner-field"
      >
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="dashboard-container">
      <h1 className="colored-text">Dashboard</h1>
      <div className="booked-rooms">
        {bookedDates.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.room_image} alt="loading" />
            <div className="info">
              <h2>{card.room_name}</h2>
              <p className="total-cost">
                Total Const : <b>$ {card.total_cost}</b>
              </p>
              <div className="booked-person">
                <h5>CheckIn Date: {card.check_in_date}</h5>
                <h5>CheckIn Date: {card.check_out_date}</h5>
                <h2>Booked by {card.user_name}</h2>
                <button>Booked</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
