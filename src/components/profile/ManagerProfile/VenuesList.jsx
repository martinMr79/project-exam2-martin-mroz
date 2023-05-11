import React from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import Button from "@mui/material/Button";
import { useState } from "react";


const VenueItem = ({ venue, onDelete }) => (
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
  </div>
);

const VenuesList = ({ accessToken, venues, setVenues }) => { // add venues prop here
    const [error, setError] = useState(null);

    const deleteVenue = async (venueId) => {
        try {
          await axios.delete(`${baseURL}venues/${venueId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setVenues(venues.filter((venue) => venue.id !== venueId)); // Note: setVenues will not work here, as we are not maintaining state in this component anymore.
        } catch (error) {
          console.error("Error deleting venue:", error);
          setError(`Error deleting venue: ${error.message}`);
        }
      };
  
    return (
        <div>
        <h2>Managed Venues</h2>
        {error && <p>Error: {error}</p>}
        {venues.map((venue) => (
          <VenueItem key={venue.id} venue={venue} onDelete={deleteVenue} />
        ))}
      </div>
    );
  };

export default VenuesList;