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

const SwiperRooms = () => {
    const [images,setImages] = useState(Rooms[7].room);
    const [count,setCount] = useState(3);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 550) {
                setCount(1);
            } else if(window.innerWidth < 1000) {
                setCount(2);
            }else{
                setCount(3);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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
        {images.map((image , index) => {
          return (
            <SwiperSlide key={index} className="room-card">
              <div className="card" key={index}>
              <span>
                <img src={image} alt="loading" />
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
                <Link to={`roomdetails/${index+1}`}>
                <div className="info">
                  <h2>Room</h2>
                  <span className="rating-field">
                    <span className="rating">
                      4.5 <FaStar />
                    </span>
                    <p>(600+ reviews)</p>
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
                </div></Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperRooms;
