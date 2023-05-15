import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { baseURL } from "../../../utilities/constants";
import { ProfileContainer } from "../styled"; 
import DatePicker from 'react-date-picker';

const VenueBooking = ({ venueId }) => {
 
  const { accessToken } = useAuthStore();
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(`${baseURL}bookedDates/${venueId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBookedDates(response.data.map(dateStr => new Date(dateStr)));
      } catch (error) {
        console.error('Failed to fetch booked dates:', error);
      }
    };

    fetchBookedDates();
  }, [venueId, accessToken]);

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
      setMessage(`Booking successful! You have booked the venue from ${dateFrom} to ${dateTo} for ${guests} guests.`);
    } catch (error) {
      setMessage(`Booking failed: ${error.response.data.message}`);
    }
  };

  return (
    <ProfileContainer>
    <form onSubmit={handleBooking}>
      <h2>Book a Venue</h2>
      {message && <p>{message}</p>}
      <DatePicker
        onChange={setDateFrom}
        value={dateFrom}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 31536000000)}
        tileDisabled={({ date, view }) =>
          view === 'month' && // Block the date only in month view
          bookedDates.some(disabledDate =>
            disabledDate.getTime() === date.getTime()
          )
        }
        required
      />
      <DatePicker
        onChange={setDateTo}
        value={dateTo}
        minDate={dateFrom}
        maxDate={new Date(Date.now() + 31536000000)}
        tileDisabled={({ date, view }) =>
          view === 'month' && // Block the date only in month view
          bookedDates.some(disabledDate =>
            disabledDate.getTime() === date.getTime()
          )
        }
        required
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