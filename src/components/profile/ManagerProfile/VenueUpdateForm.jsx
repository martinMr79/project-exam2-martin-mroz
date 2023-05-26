import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ButtonContainer } from "../styled";

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

      <TextField
        name="name"
        value={updatedVenue.name}
        onChange={handleChange}
      />
      <TextField
        name="description"
        value={updatedVenue.description}
        onChange={handleChange}
      />

      <TextField
        name="price"
        value={updatedVenue.price}
        onChange={handleChange}
      />

      <TextField
        name="maxGuests"
        value={updatedVenue.maxGuests}
        onChange={handleChange}
        type="number"
      />

<ButtonContainer>
    <Button onClick={() => onDelete(venue.id)}>Delete</Button>
    <Button type="submit">Update</Button>
  </ButtonContainer>
    </form>
  );
};

export default VenueUpdateForm;
