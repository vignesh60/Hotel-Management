import React, { useState } from "react";
import lux_room from "../components/assets/room1.png";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import room1 from "../components/assets/room (1).png";
import room2 from "../components/assets/room (2).png";
import room3 from "../components/assets/room (3).png";
import room4 from "../components/assets/room (4).png";
import room5 from "../components/assets/room (5).png";
import room6 from "../components/assets/room (6).png";
import room9 from "../components/assets/room (9).png";
import room8 from "../components/assets/room (8).png";
import room10 from "../components/assets/room (10).png";
import swimming from '../components/assets/room (7).png'

const Home = () => {
  const [cards, setCards] = useState([
    room10,
    room1,
    room2,
    room3,
    room4,
    room5,
    room6,
    room9,
    room8,
  ]);
  return (
    <div className="home-container">
      <div className="banner-container">
        <h1>
          Find an apartment for
          <br />
          your vaction
        </h1>
        <p>
          We have several thousand apartments
          <br /> for every taste in every corner of the globe
        </p>
      </div>
      <div className="luxurious-room">
        <div className="left-field">
          <h1>This is the Luxurious Room</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
            aliquid alias libero dolor? Libero ut officia veniam vero temporibus
            id veritatis magnam? Commodi et illum beatae ex dignissimos ipsa
            ullam.
          </p>
          <button className="btn">Book</button>
        </div>
        <div className="right-field">
          <img src={lux_room} alt="loading" />
        </div>
      </div>

      <div className="rooms-container">
        <h1>Featured Properties on our Listing</h1>
        <div className="cards-container">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <img src={card} alt="loading" />
              <h2>Well Furnished Apartment</h2>
              <span className="rating-field">
                <span className="rating">4.5 <FaStar /></span>
                <p>(600+) rating</p>
              </span>
              <p>100 Smart Street, LA, India</p>
              <p className="cost">
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
            </div>
          ))}
        </div>
      </div>

      <div className="discover-more-field luxurious-room">
        <div className="left-field">
          <h1>Discover More About Property Rental</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
            aliquid alias libero dolor? Libero ut officia veniam vero temporibus
            id veritatis magnam? Commodi et illum beatae ex dignissimos ipsa
            ullam.Libero ut officia veniam vero temporibus
            id veritatis magnam? Commodi et illum beatae ex dignissimos ipsa
            ullam.
          </p>
          <button className="btn">Book</button>
        </div>
        <div className="right-field">
          <img src={swimming} alt="loading" />
        </div>
      </div>
    </div>
  );
};

export default Home;
