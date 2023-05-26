import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";

const VenueBookings = ({ venueId, accessToken }) => {
  const [venue, setVenue] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      
      <Button variant="contained" onClick={handleClickOpen}>View Bookings</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>My Bookings</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VenueBookings;
