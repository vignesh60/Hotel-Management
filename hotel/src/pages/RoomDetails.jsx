import React, { useState } from "react";
import img1 from "../components/assets/No1-room/room1.avif";
import img2 from "../components/assets/No1-room/room2.avif";
import img3 from "../components/assets/No1-room/room3.avif";
import img4 from "../components/assets/No1-room/room4.avif";
import img5 from "../components/assets/No1-room/room5.avif";
import { FaStar } from "react-icons/fa";

const RoomDetails = () => {
  const [img, setImg] = useState([img2, img3, img4, img5]);
  return (
    <div className="room-details-container">
      <div className="rooms-iamge-field">
        <div className="image-left-field">
          <img src={img1} alt="image" />
        </div>
        <div className="image-right-field">
          {img.map((image, index) => (
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
            <p>
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
              <b>$65 / night</b>
            </p>
            <div>
              <label htmlFor="checking">CKECK-IN</label>
              <input type="date" id="date" />
              <label htmlFor="checking">CKECK-OUT</label>
              <input type="date" id="date" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
