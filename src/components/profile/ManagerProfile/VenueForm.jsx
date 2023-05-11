import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useVenue } from "../hooks/useVenue";



const VenueForm = ({ accessToken, onAddVenue }) => {
  const { venue, handleVenueChange, handleAddVenue, addMediaInput, handleMediaChange } = useVenue(accessToken, onAddVenue);
  
  return (
    <form onSubmit={handleAddVenue}>
        <Grid container spacing={2}>
  <Grid item xs={12}>
    <TextField
      name="name"
      label="Venue Name"
      value={venue.name}
      onChange={handleVenueChange}
      fullWidth
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      name="description"
      label="Description"
      value={venue.description}
      onChange={handleVenueChange}
      fullWidth
    />
  </Grid>
  <Grid item xs={12}>
{venue.media.map((mediaUrl, index) => (
  <TextField
    key={index}
    name={`media-${index}`}
    label={`Media URL ${index + 1}`}
    value={mediaUrl}
    onChange={(event) => handleMediaChange(index, event)}
    fullWidth
  />
))}
<Button onClick={addMediaInput}>Add Another Media URL</Button>
</Grid>
<Grid item xs={4}>
<TextField
  name="price"
  label="Price"
  value={venue.price}
  onChange={handleVenueChange}
  fullWidth
/>
</Grid>
<Grid item xs={4}>
<TextField
  name="maxGuests"
  label="Max Guests"
  value={venue.maxGuests}
  onChange={handleVenueChange}
  fullWidth
/>
</Grid>
  
  <Grid item xs={12}>
    <FormControlLabel
      control={
        <Checkbox
          checked={venue.meta.wifi}
          onChange={handleVenueChange}
          name="meta.wifi"
        />
      }
      label="WiFi"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={venue.meta.parking}
          onChange={handleVenueChange}
          name="meta.parking"
        />
      }
      label="Parking"
    />
      <FormControlLabel
      control={
        <Checkbox
          checked={venue.meta.breakfast}
          onChange={handleVenueChange}
          name="meta.breakfast"
        />
      }
      label="breakfast"
    />
      <FormControlLabel
      control={
        <Checkbox
          checked={venue.meta.pets}
          onChange={handleVenueChange}
          name="meta.pets"
        />
      }
      label="pets"
    />
    {/* Add other checkbox fields here as needed */}
  </Grid>
  <Grid item xs={12}>
    <Button variant="contained" type="submit">
      Add Venue
    </Button>
  </Grid>
</Grid>
    </form>
  );
};

export default VenueForm;