import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";

const VenueBookings = ({ venueId, accessToken }) => {
    const [bookings, setBookings] = useState([]);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`${baseURL}/venues/${venueId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              _bookings: true,
            },
          });
  
          if (response.data.bookings) {
            setBookings(response.data.bookings);
          } else {
            console.log("No bookings available for this venue");
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
  
      if(venueId) {
        fetchBookings();
      }
    }, [venueId, accessToken]);
  
    return (
      <div>
        <h2>Bookings for this venue</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>From: {booking.dateFrom}</p>
              <p>To: {booking.dateTo}</p>
              <p>Guests: {booking.guests}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default VenueBookings;