import React, { useEffect, useState } from 'react';
import axios from 'axios';

import img from "../uploads/images-1717269581793-211272622.png";


const FetchRoom = () => {
    const roomId = 3;
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getRoom/${roomId}`);
                setRoom(res.data);
            } catch (error) {
                console.error('Error fetching room details:', error);
            }
        };

        fetchRoom();
    }, [roomId]);

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{paddingTop: "4rem"}}>
            <h2>{room.title}</h2>
            <p>{room.location}</p>
            <p>{room.description}</p>
            <p>${room.price} / night</p>
            <img src={room.images[0]} alt="Room" style={{ maxWidth: '300px', maxHeight: '200px' }} />
            {/* Display other room details */}
        </div>
    );
};

export default FetchRoom
