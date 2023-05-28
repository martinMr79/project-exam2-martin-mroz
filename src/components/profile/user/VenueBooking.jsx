import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { baseURL } from "../../../utilities/constants";
import { BookingContainer } from "../styled"; 
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import './CustomDatePicker.css'

const VenueBooking = ({ venueId, data }) => {
 
  const { accessToken } = useAuthStore();
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(`${baseURL}venues/${venueId}?_bookings=true`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        const dates = response.data.bookings.map(booking => ({
          dateFrom: new Date(booking.dateFrom),
          dateTo: new Date(booking.dateTo),
        }));
        setBookedDates(dates);
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
    <Grid 
      container 
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} key={data?.id || Math.random()}>
          <BookingContainer>
          <Box style={{ 
              border: "1px solid black", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center"
            }}
          >
            <h3 style={{ marginTop: "55px" }}>Available</h3>
            <p style={{ color: '#D42819', fontSize: "50px", margin: "45px 85px" }}>NOK {String(data?.price)}</p>
            <p style={{ color: '#A9A9AC', fontSize: "" }}>PER NIGHT</p>
            <p>Available rooms!</p>
            <p style={{ marginBottom: "85px" }}>Book your stay now</p>
            </Box>
            <form onSubmit={handleBooking}>
              <h4 style={{ color: '#29D419' }}>Select dates</h4>
              <DatePicker
                className="my-custom-datepicker"
                onChange={setDateFrom}
                value={dateFrom}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 31536000000)}
                tileDisabled={({ date, view }) =>
                view === 'month' && 
                bookedDates.some(bookedDate =>
                  date.getTime() >= bookedDate.dateFrom.getTime() && 
                  date.getTime() <= bookedDate.dateTo.getTime()
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
                  view === 'month' && bookedDates.some(bookedDate =>
                    date.getTime() >= bookedDate.dateFrom.getTime() && 
                    date.getTime() <= bookedDate.dateTo.getTime()
                    
                  )}
                required
              />
              {message && <p>{message}</p>}
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                  style={{ margin: "20px 0px", width: "19.5rem"  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Book Now
                </Button>
              </Grid>
            </form>
          </BookingContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VenueBooking;

