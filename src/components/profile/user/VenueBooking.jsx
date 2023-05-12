import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { baseURL } from "../../../utilities/constants";
import { ProfileContainer } from "../styled"; 

const VenueBooking = ({ venueId }) => {
  const { bookingId } = useParams();
  const { accessToken } = useAuthStore();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");

  const handleBooking = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}bookings`,
        {
          dateFrom,
          dateTo,
          guests: parseInt(guests, 10),
          venueId: venueId,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response);
      setMessage("Booking successful!");
    } catch (error) {
      setMessage(`Booking failed: ${error.response.data.message}`);
    }
  };

  return (
    <ProfileContainer>
      <form onSubmit={handleBooking}>
        <h2>Book a Venue</h2>
        {message && <p>{message}</p>}
        <TextField
          type="date"
          label="From"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        <br />
        <TextField
          type="date"
          label="To"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        <br />
        <TextField
          type="number"
          label="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        <br />
        <Button variant="contained" type="submit">
          Book
        </Button>
      </form>
    </ProfileContainer>
  );
};

export default VenueBooking;