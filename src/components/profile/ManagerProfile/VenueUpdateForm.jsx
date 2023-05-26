import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ButtonContainer } from "../styled";
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const VenueUpdateForm = ({ venue, onUpdate, onDelete }) => {
  const [updatedVenue, setUpdatedVenue] = useState(venue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedVenue((prevVenue) => ({
      ...prevVenue,
      [name]: name === 'price' || name === 'maxGuests' ? parseFloat(value) : value,
    }));
  };

  const [open, setOpen] = useState(false);
  const handleOpenDialog = (venueId) => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleDelete = (venueId) => {
    onDelete(venueId);
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(venue.id, updatedVenue);
  };

  return (
    <form onSubmit={handleSubmit}>

<Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            value={updatedVenue.name}
            onChange={handleChange}
            label="Venue Name" 
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            value={updatedVenue.description}
            onChange={handleChange}
            label="Description" 
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="price"
            value={updatedVenue.price}
            onChange={handleChange}
            label="Price" 
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="maxGuests"
            value={updatedVenue.maxGuests}
            onChange={handleChange}
            type="number"
            label="Max Guests"
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>


<ButtonContainer>
    <Button type="submit">Update</Button>
    <Button color="error" onClick={() => handleOpenDialog(venue.id)}>Delete</Button>

  </ButtonContainer>

  <Dialog
  open={open}
  onClose={handleCloseDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Delete Venue Confirmation"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this venue?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog}>
      No
    </Button>
    <Button onClick={() => handleDelete(venue.id)} color="error" autoFocus>
      Yes
    </Button>
  </DialogActions>
</Dialog>
    </form>
  );
};

export default VenueUpdateForm;
