import React, { useState } from "react";
import Rooms from "../components/rooms";
import { Link } from "react-router-dom";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";

const DashBoard = () => {
  const [images, setImages] = useState(Rooms[7].room);
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="booked-rooms">
        {images.map((card, index) => (
          <div className="card" key={index}>
              <img src={card} alt="loading" />
            <Link to={`roomdetails/${index + 1}`}>
              <div className="info">
                <h2>Royal Room</h2>
                <p>
                  <b>$2015</b> / 5 night
                </p>
                <ul className="flex">
                  <li>
                    <IoBedOutline className="icon" /> 4 Beds
                  </li>
                  <li>
                    <HiOutlineUser className="icon" /> 8 Sleeps
                  </li>
                  <li>
                    <TbArrowAutofitHeight className="icon" /> 1,340 Sq Ft
                  </li>
                </ul>
                <div className="booked-person">
                <h2>Booked by Our Team</h2>
            <button>Booked</button>
            </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
