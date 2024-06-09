import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";

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

import SwiperRooms from "../SwiperRooms";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookRoom from "./BookRoom";
import { MdDelete } from "react-icons/md";
import { UserContext } from "./UserContext";

const RoomDetails = () => {
  const {userinfo} = useContext(UserContext);
  const { id } = useParams();
const navigate = useNavigate();
  const roomId = id;
  const [room, setRoom] = useState(null);
  const [active, setActive] = useState(0);
  const [matchingIndexes, setMatchingIndexes] = useState([]);

  const [account, setAccount] = useState(false);
  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState === "true") {
      setAccount(true);
    }
  }, [localStorage]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getRoom/${roomId}`);
        setRoom(res.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const [images, setImages] = useState([]);

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

    const matchingIndexes = images
      .map((image, index) => {
        const [title, filename] = image.split("+");
        return title === room.title ? index : null; // Return index if title matches, otherwise null
      })
      .filter((index) => index !== null);

    setMatchingIndexes(matchingIndexes);
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

  /* ---------------------delete-room------------------------ */

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room permenently?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/deleteRoom/${id}`);
        alert("Room Deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Failed to delete room. Please try again later.");
      }
    }
  };

  /* useEffect(() => {
    window.scrollTo(0, 0);
  }); */

  return (
    <div className="room-details-container">
      <div className="rooms-iamge-field">
        <div className="image-left-field">
          <img
            src={`http://localhost:5000/uploads/${
              images[matchingIndexes[active]]
            }`}
            alt="image"
          />
          <div className="left-right-arrows">
            <FaArrowLeft
              className="arrow"
              onClick={() =>
                setActive((prevActive) =>
                  prevActive === 0 ? matchingIndexes.length - 1 : prevActive - 1
                )
              }
            />
            <FaArrowRight
              className="arrow"
              onClick={() =>
                setActive((prevActive) =>
                  prevActive === matchingIndexes.length - 1 ? 0 : prevActive + 1
                )
              }
            />
          </div>
        </div>
        <div className="image-right-field">
          {images
            .slice(matchingIndexes[1], images.length)
            .map((image, index) => {
              const [title, filename] = image.split("+");
              return (
                <>
                  {title === room.title && (
                    <img
                      src={`http://localhost:5000/uploads/${image}`}
                      alt={`Image ${index}`}
                      key={index}
                    />
                  )}
                </>
              );
            })}
        </div>
      </div>
      <div className="about-room-container">
        <div className="about-room">
          {account && userinfo.useremail === "vigneshg.22cse@kongu.edu" &&  (
            <span className="edit-delete-buttons-field">
              <Link to={`edit/${room.id}`}>
                <button className="btn">
                  {" "}
                  <FaEdit className="icon" />
                  Edit
                </button>
              </Link>
              <button className="btn"  onClick={()=>handleDelete()}>
                <MdDelete className="icon"/> Delete
              </button>
            </span>
          )}
          <div className="name flex">
            <span>
              <h1>{room.title}</h1>
              <p>{room.location}</p>
            </span>
            <span className="rate">
              <span className="rating">
                {room.rating} <FaStar />
              </span>
              <p>({room.reviews} reviews)</p>
            </span>
          </div>
          <div className="description">
            <h2>Description</h2>
            <p style={{ textIndent: "2rem", marginTop: "1rem" }}>
              {room.description}
            </p>
          </div>
        </div>
        <BookRoom price={room.price} r_image={`http://localhost:5000/uploads/${images[matchingIndexes[0]]}`} roomName = {room.title}/>
      </div>

      <div className="amenities-rationg-other-details">
        <div className="amenities">
          <h1>Amenities</h1>
          <div className="row">
            <ul className="col">
              {room.garden_view === 1 && (
                <li>
                  <img src={a_icon1} alt="icon" /> Garden view
                </li>
              )}
              {room.wifi === 1 && (
                <li>
                  <img src={a_icon2} alt="icon" /> Wifi
                </li>
              )}
              {room.washer === 1 && (
                <li>
                  <img src={a_icon3} alt="icon" /> Free washer - in building
                </li>
              )}
              {room.air_conditioning === 1 && (
                <li>
                  <img src={a_icon4} alt="icon" /> Central air conditioning
                </li>
              )}
              {room.refrigerator === 1 && (
                <li>
                  <img src={a_icon5} alt="icon" /> Refrigerator
                </li>
              )}
            </ul>
            <ul className="col">
              {room.kitchen === 1 && (
                <li>
                  <img src={a_icon6} alt="icon" /> Kitchen
                </li>
              )}
              {room.pets_allowed === 1 && (
                <li>
                  <img src={a_icon8} alt="icon" /> Pets allowed
                </li>
              )}
              {room.dryer === 1 && (
                <li>
                  <img src={a_icon10} alt="icon" /> Dryer
                </li>
              )}
              {room.security_cameras === 1 && (
                <li>
                  <img src={a_icon9} alt="icon" /> Security cameras on property
                </li>
              )}
              {room.bicycles === 1 && (
                <li>
                  <img src={a_icon7} alt="icon" /> Bicycles
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="rating-reviews" style={{ marginTop: "3rem" }}>
          <h1>Rating & Reviews</h1>
          <span className="rate">
            <span className="rating">
              {room.rating} <FaStar />
            </span>
            <p>({room.reviews} reviews)</p>
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
