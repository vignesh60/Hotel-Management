import React, { useState } from "react";
import axios from "axios";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    rating: "",
    reviews: "",
    beds: "",
    sleeps: "",
    sq_ft: "",
    garden_view: 0,
    wifi: 0,
    washer: 0,
    air_conditioning: 0,
    refrigerator: 0,
    kitchen: 0,
    pets_allowed: 0,
    dryer: 0,
    security_cameras: 0,
    bicycles: 0,
    images: [],
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send to server
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("reviews", formData.reviews);
    formDataToSend.append("beds", formData.beds);
    formDataToSend.append("sleeps", formData.sleeps);
    formDataToSend.append("sq_ft", formData.sq_ft);
    formDataToSend.append("garden_view", formData.garden_view);
    formDataToSend.append("wifi", formData.wifi);
    formDataToSend.append("washer", formData.washer);
    formDataToSend.append("air_conditioning", formData.air_conditioning);
    formDataToSend.append("refrigerator", formData.refrigerator);
    formDataToSend.append("kitchen", formData.kitchen);
    formDataToSend.append("pets_allowed", formData.pets_allowed);
    formDataToSend.append("dryer", formData.dryer);
    formDataToSend.append("security_cameras", formData.security_cameras);
    formDataToSend.append("bicycles", formData.bicycles);

    // Append each image file to the form data
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append("images", formData.images[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/addRoom",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      alert("Room added successfully");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room");
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
                value={formData.title}
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
                value={formData.location}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
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
                value={formData.price}
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
                value={formData.rating}
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
                value={formData.reviews}
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
                value={formData.beds}
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
                value={formData.sleeps}
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
                value={formData.sq_ft}
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
                checked={formData.garden_view}
                onChange={handleChange}
              />{" "}
              Garden view
            </label>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={formData.wifi}
                onChange={handleChange}
              />{" "}
              Wifi
            </label>
            <label>
              <input
                type="checkbox"
                name="washer"
                checked={formData.washer}
                onChange={handleChange}
              />{" "}
              Washer
            </label>
            <label>
              <input
                type="checkbox"
                name="air_conditioning"
                checked={formData.air_conditioning}
                onChange={handleChange}
              />{" "}
              Air Conditioning
            </label>
            <label>
              <input
                type="checkbox"
                name="refrigerator"
                checked={formData.refrigerator}
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
                checked={formData.kitchen}
                onChange={handleChange}
              />{" "}
              Kitchen
            </label>
            <label>
              <input
                type="checkbox"
                name="pets_allowed"
                checked={formData.pets_allowed}
                onChange={handleChange}
              />{" "}
              Pets Allowed
            </label>
            <label>
              <input
                type="checkbox"
                name="dryer"
                checked={formData.dryer}
                onChange={handleChange}
              />{" "}
              Dryer
            </label>
            <label>
              <input
                type="checkbox"
                name="security_cameras"
                checked={formData.security_cameras}
                onChange={handleChange}
              />{" "}
              Security_cameras
            </label>
            <label>
              <input
                type="checkbox"
                name="bicycles"
                checked={formData.bicycles}
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
          {formData.images.length > 0 && (
            <div className="selected-images">
              <h4>Selected Images:</h4>
              <ul>
                {Array.from(formData.images).map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </label>
        <button type="submit" className="btn">
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
