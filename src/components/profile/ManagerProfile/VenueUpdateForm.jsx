import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const VenueUpdateForm = ({ venue, onUpdate }) => {
  const [updatedVenue, setUpdatedVenue] = useState(venue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedVenue((prevVenue) => ({
        ...prevVenue,
        [name]: name === 'price' ? parseFloat(value) : value,
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

      {/* New fields */}
      <TextField
        name="price"
        value={updatedVenue.price}
        onChange={handleChange}
      />
      {/* Add more fields as needed */}

      <Button type="submit">Update</Button>
    </form>
  );
};

export default VenueUpdateForm;
