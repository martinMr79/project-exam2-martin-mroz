import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import Button from "@mui/material/Button";

const VenueItem = ({ venue, onDelete }) => (
  <div>
    <h3>{venue.name}</h3>
    <p>{venue.description}</p>
    <Button onClick={() => onDelete(venue.id)}>Delete</Button>
  </div>
);

const VenuesList = ({ accessToken, decodedToken  }) => {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchVenues = async () => {
          try {
            const response = await axios.get(baseURL + "venues", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            console.log("Fetched venues:", response.data); // Debug statement
    
            // Filter venues by manager email
            const filteredVenues = response.data.filter(
              (venue) => venue.managerEmail === decodedToken.email
            );
    
            setVenues(filteredVenues);
          } catch (error) {
            console.error("Error fetching venues:", error);
            setError(error.message);
          }
        };
    
        fetchVenues();
      }, [accessToken, decodedToken]);
      
  
    const deleteVenue = async (venueId) => {
        try {
          await axios.delete(`${baseURL}/api/v1/holidaze/listings/${venueId}`, {
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
        {venues.map((venue) => (
          <VenueItem key={venue.id} venue={venue} onDelete={deleteVenue} />
        ))}
      </div>
    );
  };

export default VenuesList;