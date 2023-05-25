import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const VenueUpdateForm = ({ venue, onUpdate }) => {
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

      <Button type="submit">Update</Button>
    </form>
  );
};

export default VenueUpdateForm;
