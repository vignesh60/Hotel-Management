import React, { useState, useEffect } from "react";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    price: "",
    location: "",
    beds: "",
  });

  const [images, setImages] = useState([]);
  const [matchingIndexes, setMatchingIndexes] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getRooms");
        setRooms(res.data);
        setFilteredRooms(res.data); // Initially show all rooms
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
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

  // Update matchingIndexes when filteredRooms change
  useEffect(() => {
    if (!filteredRooms || !images) return;

    const newMatchingIndexes = filteredRooms.map((roomItem) => {
      const index = images.findIndex((image) => {
        const [title, filename] = image.split("+");
        return title === roomItem.title;
      });

      return index !== -1 ? index : null;
    });

    setMatchingIndexes(newMatchingIndexes);
  }, [filteredRooms, images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let filtered = rooms;

    if (searchCriteria.price) {
      filtered = filtered.filter(
        (room) => parseInt(room.price, 10) <= parseInt(searchCriteria.price, 10)
      );
    }

    if (searchCriteria.location) {
      filtered = filtered.filter((room) =>
        room.location
          .toLowerCase()
          .includes(searchCriteria.location.toLowerCase())
      );
    }

    if (searchCriteria.beds) {
      filtered = filtered.filter(
        (room) => room.beds === parseInt(searchCriteria.beds, 10)
      );
    }

    setFilteredRooms(filtered);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={searchCriteria.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={searchCriteria.location}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="beds"
          placeholder="Beds"
          value={searchCriteria.beds}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="rooms-container">
        {filteredRooms.length > 0 ? (
          <div className="cards-container">
            {filteredRooms.map((room, index) => (
              <div className="card" key={index}>
                <Link to={`roomdetails/${room.id}`}>
                  <img
                    src={`http://localhost:5000/uploads/${
                      matchingIndexes[index] !== null
                        ? images[matchingIndexes[index]]
                        : "default.jpg"
                    }`}
                    alt="Room"
                  />
                  <div className="info">
                    <h2>{room.title}</h2>
                    <span className="rating-field">
                      <span className="rating">
                        {room.rating} <FaStar />
                      </span>
                      <p>({room.reviews} reviews)</p>
                    </span>
                    <p>{room.location}</p>
                    <p className="cost">
                      <b>${room.price}</b> / night
                    </p>
                    <ul className="flex">
                      <li>
                        <IoBedOutline className="icon" /> {room.beds} Beds
                      </li>
                      <li>
                        <HiOutlineUser className="icon" /> {room.sleeps} Sleeps
                      </li>
                      <li>
                        <TbArrowAutofitHeight className="icon" /> {room.sq_ft}{" "}
                        Sq Ft
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No rooms match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
