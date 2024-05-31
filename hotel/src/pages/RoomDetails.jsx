import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import a_icon1 from "../components/assets/a-icons (1).png";
import a_icon2 from "../components/assets/a-icons (2).png";
import a_icon3 from "../components/assets/a-icons (3).png";
import a_icon4 from "../components/assets/a-icons (4).png";
import a_icon5 from "../components/assets/a-icons (5).png";
import a_icon6 from "../components/assets/a-icons (6).png";
import a_icon7 from "../components/assets/a-icons (7).png";
import a_icon8 from "../components/assets/a-icons (8).png";
import a_icon9 from "../components/assets/a-icons (9).png";
import a_icon10 from "../components/assets/a-icons (10).png";
import Rooms from "../components/rooms";
import $ from 'jquery';

import SwiperRooms from "../SwiperRooms";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [active, setActive] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="room-details-container">
      <div className="rooms-iamge-field">
        <div className="image-left-field">
          <img src={Rooms[id].room[active]} alt="image" />
          <div className="left-right-arrows">
            <FaArrowLeft
              className="arrow"
              onClick={() =>
                setActive((prevActive) =>
                  prevActive === 0 ? Rooms[id].room.length - 1 : prevActive - 1
                )
              }
            />
            <FaArrowRight
              className="arrow"
              onClick={() =>
                setActive((prevActive) =>
                  prevActive === Rooms[id].room.length - 1 ? 0 : prevActive + 1
                )
              }
            />
          </div>
        </div>
        <div className="image-right-field">
          {Rooms[id].room.slice(1).map((image, index) => (
            <img src={image} key={index} alt="image" />
          ))}
        </div>
      </div>
      <div className="about-room-container">
        <div className="about-room">
          <div className="name flex">
            <span>
              <h1>Mannat Hotel Devi Place inn</h1>
              <p>Near Chennai Airport, Tamil Nadu</p>
            </span>
            <span className="rate">
              <span className="rating">
                4.5 <FaStar />
              </span>
              <p>(600+ reviews)</p>
            </span>
          </div>
          <div className="description">
            <h2>Description</h2>
            <p style={{ textIndent: "2rem", marginTop: "1rem" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              exercitationem mollitia dolorum iusto labore ut maiores sequi ipsa
              quos tenetur adipisci repellendus dolore magnam hic ullam,
              voluptatem provident nostrum saepe. Sit soluta harum eaque! Modi,
              neque, dolore quasi aspernatur doloribus laudantium eligendi nobis
              voluptas possimus quisquam error? Soluta deserunt doloribus,
              expedita ipsam perspiciatis a, sapiente repudiandae minima
              cupiditate nesciunt sequi? !
            </p>
          </div>
        </div>
        <div className="cost-and-book">
          <div className="booking-card">
            <p>
              <b>$65 </b>/ night
            </p>
            <div className="dates-field">
              <span>
                <label htmlFor="checking">CKECK-IN</label>
                <input type="date" id="date" />
              </span>
              <span>
                <label htmlFor="checking">CKECK-OUT</label>
                <input type="date" id="date" />
              </span>
            </div>
            <ul>
              <li>
                <p>$79 x 7 nights</p> <p>$555</p>
              </li>
              <li>
                <p>Weekly discount</p> <p style={{ color: "red" }}>-$28</p>
              </li>
              <li>
                <p>Cleaning fee</p> <p>$62</p>
              </li>
              <li>
                <p>Service fee</p> <p>$83</p>
              </li>
              <li>
                <p>Occupancy taxes and fees</p> <p>$29</p>
              </li>
            </ul>
            <span className="total">
              <p>Total</p>
              <p style={{ color: "green", fontWeight: "500" }}>$701</p>
            </span>
            <button className="btn">Continue to Book</button>
          </div>
        </div>
      </div>

      <div className="amenities-rationg-other-details">
        <div className="amenities">
          <h1>Amenities</h1>
          <div className="row">
            <ul className="col">
              <li>
                <img src={a_icon1} alt="icon" /> Garden view
              </li>
              <li>
                <img src={a_icon2} alt="icon" /> Wifi
              </li>
              <li>
                <img src={a_icon3} alt="icon" /> Free washer - in building
              </li>
              <li>
                <img src={a_icon4} alt="icon" /> Central air conditioning
              </li>
              <li>
                <img src={a_icon5} alt="icon" /> Refrigerator
              </li>
            </ul>
            <ul className="col">
              <li>
                <img src={a_icon6} alt="icon" /> Kitchen
              </li>
              <li>
                <img src={a_icon8} alt="icon" /> Pets allowed
              </li>
              <li>
                <img src={a_icon10} alt="icon" /> Dryer
              </li>
              <li>
                <img src={a_icon9} alt="icon" /> Security cameras on property
              </li>
              <li>
                <img src={a_icon7} alt="icon" /> Bicycles
              </li>
            </ul>
          </div>
        </div>
        <div className="rating-reviews" style={{ marginTop: "3rem" }}>
          <h1>Rating & Reviews</h1>
          <span className="rate">
            <span className="rating">
              4.5 <FaStar />
            </span>
            <p>(600+ reviews)</p>
          </span>
          <div className="grids">
            <ul>
              <li>
                5 <FaStar /> <span className="five-star">.</span> 82%
              </li>
              <li>
                4 <FaStar /> <span className="four-star">.</span> 36%
              </li>
              <li>
                3 <FaStar /> <span className="three-star">.</span> 21%
              </li>
              <li>
                2 <FaStar /> <span className="two-star">.</span> 05%
              </li>
              <li>
                1 <FaStar /> <span className="one-star">.</span> 06%
              </li>
            </ul>
          </div>
        </div>
        <SwiperRooms />
      </div>
    </div>
  );
};

export default RoomDetails;
