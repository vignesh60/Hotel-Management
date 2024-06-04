import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditRoom = () => {
  const { id } = useParams();
  console.log(id);
  const [room, setRoom] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    rating: "",
    reviews: "",
    beds: "",
    sleeps: "",
    sq_ft: "",
    garden_view: false,
    wifi: false,
    washer: false,
    air_conditioning: false,
    refrigerator: false,
    kitchen: false,
    pets_allowed: false,
    dryer: false,
    security_cameras: false,
    bicycles: false,
    images: [],
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getRoom/${id}`);
        setRoom(response.data); // Set fetched room details to state
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setRoom({ ...room, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateRoom/${id}`, room);
      alert("Room details updated successfully!");
    } catch (error) {
      console.error("Error updating room details:", error);
    }
  };

  return (
    <div className="add-room-container">
      <h2>Add New Room</h2>
      <form onSubmit={handleSubmit} encType="multipart/formdata">
        <div className="row text-field">
          <div className="col">
            <label>
              Title
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={room.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={room.location}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                placeholder="Description"
                value={room.description}
                onChange={handleChange}
                required
              />
              </label>
              <label>
              Price
              <input
                type="number"
                name="price"
                placeholder="Price per night"
                value={room.price}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="col">
            <label>
              Rating
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={room.rating}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Reviews
              <input
                type="number"
                name="reviews"
                placeholder="Number of reviews"
                value={room.reviews}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Number of Beds
              <input
                type="number"
                name="beds"
                placeholder="Number of beds"
                value={room.beds}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Sleep Count
              <input
                type="number"
                name="sleeps"
                placeholder="Number of sleeps"
                value={room.sleeps}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Square Feet
              <input
                type="number"
                name="sq_ft"
                placeholder="Square feet"
                value={room.sq_ft}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>
        <div className="row row2">
          <div className="col">
            <label>
              <input
                type="checkbox"
                name="garden_view"
                checked={room.garden_view}
                onChange={handleChange}
              />{" "}
              Garden view
            </label>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={room.wifi}
                onChange={handleChange}
              />{" "}
              Wifi
            </label>
            <label>
              <input
                type="checkbox"
                name="washer"
                checked={room.washer}
                onChange={handleChange}
              />{" "}
              Washer
            </label>
            <label>
              <input
                type="checkbox"
                name="air_conditioning"
                checked={room.air_conditioning}
                onChange={handleChange}
              />{" "}
              Air Conditioning
            </label>
            <label>
              <input
                type="checkbox"
                name="refrigerator"
                checked={room.refrigerator}
                onChange={handleChange}
              />{" "}
              Refrigerator
            </label>
          </div>
          <div className="col">
            <label>
              <input
                type="checkbox"
                name="kitchen"
                checked={room.kitchen}
                onChange={handleChange}
              />{" "}
              Kitchen
            </label>
            <label>
              <input
                type="checkbox"
                name="pets_allowed"
                checked={room.pets_allowed}
                onChange={handleChange}
              />{" "}
              Pets Allowed
            </label>
            <label>
              <input
                type="checkbox"
                name="dryer"
                checked={room.dryer}
                onChange={handleChange}
              />{" "}
              Dryer
            </label>
            <label>
              <input
                type="checkbox"
                name="security_cameras"
                checked={room.security_cameras}
                onChange={handleChange}
              />{" "}
              Security_cameras
            </label>
            <label>
              <input
                type="checkbox"
                name="bicycles"
                checked={room.bicycles}
                onChange={handleChange}
              />{" "}
              Bicycles
            </label>
          </div>
        </div>

        <label className="custom-file-upload">
          <h3>Add Room Images</h3>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="file-input"
          />
          <span className="button">Choose Images</span>
          {room.images.length > 0 && (
            <div className="selected-images">
              <h4>Selected Images:</h4>
              <ul>
                {Array.from(room.images).map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </label>
        <button type="submit" className="btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRoom;
