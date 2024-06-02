import React, { useEffect, useState } from "react";
import lux_room from "../components/assets/room1.png";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import room1 from "../components/assets/room (1).png";
import room2 from "../components/assets/room (2).png";
import room3 from "../components/assets/room (3).png";
import room4 from "../components/assets/room (4).png";
import room5 from "../components/assets/room (5).png";
import room6 from "../components/assets/room (6).png";
import room9 from "../components/assets/room (9).png";
import room8 from "../components/assets/room (8).png";
import room10 from "../components/assets/room (10).png";
import swimming from "../components/assets/room (7).png";
import { Link } from "react-router-dom";
import SwiperRooms from "../SwiperRooms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      toast.success("User Login Successfully.");
    }
  }, []);

  const [room, setRoom] = useState(null);
  const [images, setImages] = useState([]);
  const [matchingIndexes, setMatchingIndexes] = useState([]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getRooms");
        setRoom(res.data);
      } catch (error) {
        console.error("Error fetching room details: ", error);
      }
    };

    fetchRoom();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!room || !images) return;

    const newMatchingIndexes = room
      .map((roomItem) => {
        // Find the first index where the title matches the room's title
        const index = images.findIndex((image) => {
          const [title, filename] = image.split("+");
          return title === roomItem.title;
        });

        return index !== -1 ? index : null; // Return index if found, otherwise null
      })
      .filter((index) => index !== null); // Filter out null indexes

    setMatchingIndexes(newMatchingIndexes);
  }, [room, images]);

  const LoadingSpinner = () => <div className="spinner"></div>;

  if (!room || !images) {
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
        <h1>Available Rooms</h1>
        <div className="cards-container">
          {room.map((card, index) => (
            <div className="card" key={index}>
              <span style={{ position: "relative" }}>
                <img
                  src={`http://localhost:5000/uploads/${
                    images[matchingIndexes[index]]
                  }`}
                  alt="image"
                />
                {favorite ? (
                  <MdFavorite
                    className="favorite"
                    onClick={() => setFavorite((prev) => !prev)}
                    style={{ color: "red" }}
                  />
                ) : (
                  <MdFavoriteBorder
                    className="favorite"
                    onClick={() => setFavorite((prev) => !prev)}
                  />
                )}
              </span>
              <Link to={`roomdetails/${index + 1}`}>
                <div className="info">
                  <h2>{card.title}</h2>
                  <span className="rating-field">
                    <span className="rating">
                      {card.rating} <FaStar />
                    </span>
                    <p>({card.reviews} reviews)</p>
                  </span>
                  <p>{card.location}</p>
                  <p className="cost">
                    <b>${card.price}</b> / night
                  </p>
                  <ul className="flex">
                    <li>
                      <IoBedOutline className="icon" /> {card.beds} Beds
                    </li>
                    <li>
                      <HiOutlineUser className="icon" /> {card.sleeps} Sleeps
                    </li>
                    <li>
                      <TbArrowAutofitHeight className="icon" /> {card.sq_ft} Sq
                      Ft
                    </li>
                  </ul>
                </div>
              </Link>
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
            ullam.Libero ut officia veniam vero temporibus id veritatis magnam?
            Commodi et illum beatae ex dignissimos ipsa ullam.
          </p>
          <button className="btn">Book</button>
        </div>
        <div className="right-field">
          <img src={swimming} alt="loading" />
        </div>
      </div>
      <SwiperRooms />
      <ToastContainer
        toastClassName="custom-toast"
        bodyClassName="custom-toast-content"
        closeButtonClassName="custom-toast-close-button"
      />
    </div>
  );
};

export default Home;
