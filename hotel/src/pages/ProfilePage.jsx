import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../pages/UserContext";
import axios from "axios";

const ProfilePage = () => {
  const { userinfo } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (userinfo.useremail) {
      // Fetch bookings using the user's email
      axios
        .get(`http://localhost:5000/getBookings/${userinfo.useremail}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error);
        });
    }
  }, [userinfo.useremail]);

  const cancelBooking = (id, checkInDate, totalCost) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirmed) {
      axios
        .post("http://localhost:5000/cancelBooking", {
          id,
          checkInDate,
          totalCost,
        })
        .then((response) => {
          if (response.data.success) {
            const refundAmount = response.data.refund;
            const cancelledDate = response.data.cancelledDate;
            alert(`Your booking is cancelled. Refund amount: $${refundAmount}`);

            // Update the booking status and show the refund amount and cancellation date
            const updatedBookings = bookings.map((booking) =>
              booking.booking_id === id
                ? {
                    ...booking,
                    status: "Cancelled",
                    refund: refundAmount,
                    cancelledDate: cancelledDate, // Store the cancelled date from response
                  }
                : booking
            );
            setBookings(updatedBookings);
          }
        })
        .catch((error) => {
          console.error("Error canceling booking:", error);
          alert("There was an error canceling your booking.");
        });
    }
  };

  return (
    <div className="profile-container" style={{ paddingTop: "5.5rem" }}>
      <h2>Profile</h2>
      <p>Username: {userinfo.username}</p>
      <p>Email: {userinfo.useremail}</p>

      <div className="dashboard-container">
        <h1 className="colored-text">Booking Details</h1>
        <div className="booked-rooms">
          {bookings.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.room_image} alt="loading" />
              <div className="info">
                <h2>{card.room_name}</h2>
                <p className="total-cost">
                  Total Cost: <b>$ {card.total_cost}</b>
                </p>
                <div className="booked-person">
                  <h5>
                    Check-In Date:{" "}
                    {new Date(card.check_in_date).toISOString().slice(0, 10)}
                  </h5>
                  <h5>
                    Check-Out Date:{" "}
                    {new Date(card.check_out_date).toISOString().slice(0, 10)}
                  </h5>
                  {card.status === "Cancelled" && (
                    <>
                      <h5 style={{ color: "red" }}>
                        Canceled on: {card.cancelledDate}
                      </h5>
                      <h5>Refund Amount: $ {card.refund}</h5>
                    </>
                  )}
                </div>
                {card.status !== "Cancelled" ? (
                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelBooking(
                        card.id,
                        card.check_in_date,
                        card.total_cost
                      )
                    }
                  >
                    Cancel Booking
                  </button>
                ) : (
                  <button
                    style={{ background: "red", color: "#fff" }}
                    className="cancel-btn"
                    disabled
                  >
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
