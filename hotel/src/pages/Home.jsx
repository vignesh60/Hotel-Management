import React, { useEffect, useState } from "react";
import lux_room from "../components/assets/room1.png";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import swimming from "../components/assets/room (7).png";
import { Link } from "react-router-dom";
import SwiperRooms from "../SwiperRooms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
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
        setRoom(res.data.reverse());
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
        const index = images.findIndex((image) => {
          const [title, filename] = image.split("+");
          return title === roomItem.title;
        });

        return index !== -1 ? index : null;
      })
      .filter((index) => index !== null);

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
    <div
      className="home-container"
      style={
        localStorage.getItem("isLogin") === "true"
          ? { paddingTop: "5.5rem" }
          : {}
      }
    >
      <div className="banner-container">
        <h1>
          Find your perfect hotel room
          <br />
          for your next getaway
        </h1>
        <p>
          Discover all luxurious hotel rooms
          <br /> book your desired room from anywhere
        </p>
      </div>
      <div className="luxurious-room">
        <div className="left-field">
          <h1 className="colored-text">Explore Our Luxurious Rooms</h1>
          <p>
            Experience comfort and luxury with our meticulously designed rooms,
            perfect for relaxation or business.
          </p>
          <button className="btn">Book Now</button>
        </div>
        <div className="right-field">
          <img src={lux_room} alt="loading" />
        </div>
      </div>

      <div className="rooms-container">
        <h1 className="colored-text">Available Rooms</h1>
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
              <Link to={`roomdetails/${card.id}`}>
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
          <h1 className="colored-text">Discover Your Perfect Hotel Room</h1>
          <p>
            Explore a wide range of hotel rooms available for booking. Whether
            you're looking for a cozy single room, a luxurious suite, or a
            family-friendly space, we have something for every traveler.
          </p>
          <p>
            Our hotels are located in prime locations across the globe, ensuring
            you find the perfect accommodation for your next adventure.
          </p>

          <button className="btn">Explore</button>
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
