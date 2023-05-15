import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";

const VenueBookings = ({ venueId, accessToken }) => {
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenueBookings = async () => {
      try {
        const response = await axios.get(`${baseURL}venues/${venueId}?_bookings=true`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data) {
          setVenue(response.data);
        } else {
          console.log("No venue found or no bookings for this venue");
        }
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      }
    };

    fetchVenueBookings();
  }, [venueId, accessToken]);

  return (
    <div>
      <h2>Bookings for this venue</h2>
      {venue && venue.bookings && venue.bookings.length > 0 ? (
        venue.bookings.map((booking) => (
          <div key={booking.id}>
            <p>Booking ID: {booking.id}</p>
            <p>Date From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p>Date To: {new Date(booking.dateTo).toLocaleDateString()}</p>
            <p>Guests: {booking.guests}</p>
          </div>
        ))
      ) : (
        <p>No bookings for this venue.</p>
      )}
    </div>
  );
};

export default VenueBookings;
