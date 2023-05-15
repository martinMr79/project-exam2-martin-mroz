import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import Button from "@mui/material/Button";
import VenueUpdateForm from "./VenueUpdateForm";
import VenueBookings from "./VenueBookings"; 

const VenueItem = ({ venue, onDelete, onUpdate, accessToken }) => {
  console.log("Venue object: ", venue);
  
  return (
    <div>
      <h3>{venue.name}</h3>
      <img
        src={venue.media}
        alt={venue.name}
        width={80} 
        height={80} 
      />
      <p>{venue.description}</p>
      <Button onClick={() => onDelete(venue.id)}>Delete</Button>
      <VenueUpdateForm venue={venue} onUpdate={onUpdate}/> 
      <VenueBookings venueId={venue.id} accessToken={accessToken} />
    </div>
  );
};

const VenuesList = ({ accessToken, venues, setVenues, onUpdateVenue }) => { 
  const [error, setError] = useState(null);

  const deleteVenue = async (venueId) => {
    try {
      await axios.delete(`${baseURL}venues/${venueId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setVenues(venues.filter((venue) => venue.id !== venueId));
    } catch (error) {
      console.error("Error deleting venue:", error);
      setError(`Error deleting venue: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Managed Venues</h2>
      {error && <p>Error: {error}</p>}
      {venues && venues.map((venue) => (
        <VenueItem 
          key={venue.id} 
          venue={venue} 
          onDelete={deleteVenue} 
          onUpdate={onUpdateVenue}
        />
      ))}
    </div>
  );
};

export default VenuesList;