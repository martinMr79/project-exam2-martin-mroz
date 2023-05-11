import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

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
    onUpdate(venue.id, updatedVenue); // Ensure venue._id is correct here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={updatedVenue.name}
        onChange={handleChange}
      />
      <input
        name="description"
        value={updatedVenue.description}
        onChange={handleChange}
      />
      <Button type="submit">Update</Button>
    </form>
  );
};

export default VenueUpdateForm;
