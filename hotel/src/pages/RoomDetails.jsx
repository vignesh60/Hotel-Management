import React, { useState } from 'react'
import img1 from "../components/assets/No1-room/room1.avif";
import img2 from "../components/assets/No1-room/room2.avif";
import img3 from "../components/assets/No1-room/room3.avif";
import img4 from "../components/assets/No1-room/room4.avif";
import img5 from "../components/assets/No1-room/room5.avif";

const RoomDetails = () => {
    const [img,setImg] = useState([img2,img3,img4,img5]);
  return (
    <div className="room-details-container">
        <div className="rooms-iamge-field">
            <div className="image-left-field">
                <img src={img1} alt="image" />
            </div>
            <div className="image-right-field">
                {img.map((image,index)=> (
                    <img src={image} key={index} alt='image'/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default RoomDetails
