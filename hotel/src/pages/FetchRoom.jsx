import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchRoom = () => {
  const roomId = 4;
  const [room, setRoom] = useState(null);

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
        setImages(response.data); // Assuming response.data is an array of image file names
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  if (!room) {
    return <div style={{ paddingTop: "5rem" }}>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: "4rem" }}>
      <h2>{room.title}</h2>
      <p>{room.location}</p>
      <p>{room.description}</p>
      <p>${room.price} / night</p>
      {/* Display other room details */}

      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.map((image, index) => {
          const [title, filename] = image.split('+'); // Split filename into title and actual filename
          return (
            <div key={index} className="image-container">
              {title === room.title ? (
                  <img
                    src={`http://localhost:5000/uploads/${image}`}
                    alt={`Image ${index}`}
                  />

              ): (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FetchRoom;
