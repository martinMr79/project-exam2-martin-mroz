import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const VenueUpdateForm = ({ venue, onUpdate }) => {
  const [updatedVenue, setUpdatedVenue] = useState(venue);

  useEffect(() => {
    setUpdatedVenue(venue);
  }, [venue]);

  const handleChange = (event) => {
    setUpdatedVenue({
      ...updatedVenue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(venue.id, updatedVenue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Venue Name</p>
      <TextField
        name="name"
        value={updatedVenue.name}
        onChange={handleChange}
      />
      <p>Venue Description</p>
      <TextField
        name="description"
        value={updatedVenue.description}
        onChange={handleChange}
      />
      <Button type="submit">Update</Button>
    </form>
  );
};

export default VenueUpdateForm;
