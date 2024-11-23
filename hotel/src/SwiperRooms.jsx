import React, { useEffect, useState } from "react";

import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";
import Rooms from "./components/rooms";
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import axios from "axios";

const SwiperRooms = () => {
  const [count, setCount] = useState(3);
  const [favorite, setFavorite] = useState(false);

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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 550) {
        setCount(1);
      } else if (window.innerWidth < 1000) {
        setCount(2);
      } else {
        setCount(3);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="recommented-rooms-container">
      <h1>Recommented Rooms</h1>

      <Swiper
        className="recommented-rooms"
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={count}
        pagination={{ clickable: true }}
      >
        {room.map((card, index) => {
          return (
            <SwiperSlide key={index} className="room-card">
              <div className="card" key={index}>
                <span>
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
                        <TbArrowAutofitHeight className="icon" /> {card.sq_ft}{" "}
                        Sq Ft
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperRooms;
