import React, { useEffect, useState } from "react";

import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";

import r1 from "./components/assets/listofrooms/room (1).png";
import r2 from "./components/assets/listofrooms/room (2).png";
import r3 from "./components/assets/listofrooms/room (3).png";
import r4 from "./components/assets/listofrooms/room (4).png";
import r5 from "./components/assets/listofrooms/room (5).png";
import r6 from "./components/assets/listofrooms/room (6).png";

const SwiperRooms = () => {
    const [images,setImages] = useState([r1,r2,r3,r4,r5,r6]);
    const [count,setCount] = useState(3);

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
                <img src={image} alt="loading" />
                <div className="info">
                  <h2>Well Furnished Apartment</h2>
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
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperRooms;
