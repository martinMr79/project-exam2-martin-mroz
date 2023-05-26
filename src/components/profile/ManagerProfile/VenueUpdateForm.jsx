import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ButtonContainer } from "../styled";
import Grid from "@mui/material/Grid";

const VenueUpdateForm = ({ venue, onUpdate, onDelete }) => {
  const [updatedVenue, setUpdatedVenue] = useState(venue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedVenue((prevVenue) => ({
      ...prevVenue,
      [name]: name === 'price' || name === 'maxGuests' ? parseFloat(value) : value,
    }));
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
      sx={{ width: '100%' }}
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      name="description"
      value={updatedVenue.description}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      name="price"
      value={updatedVenue.price}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      name="maxGuests"
      value={updatedVenue.maxGuests}
      onChange={handleChange}
      type="number"
      sx={{ width: '100%' }}
    />
  </Grid>
</Grid>


<ButtonContainer>
    <Button onClick={() => onDelete(venue.id)}>Delete</Button>
    <Button type="submit">Update</Button>
  </ButtonContainer>
    </form>
  );
};

export default VenueUpdateForm;
