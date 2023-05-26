import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import VenueUpdateForm from "./VenueUpdateForm";
import VenueBookings from "./VenueBookings"; 
import { Container, CardContainer } from "../styled";

const VenueItem = ({ venue, onUpdate, onDelete, accessToken }) => {

  return (
    <Card 
      key={venue.id}
      sx={{ 
        maxWidth: 345,
        minHeight: 600,       
        marginTop: "1rem"
      }}
    >
      <CardMedia
        component="img"
        image={venue.media}
        alt={venue.name}
        sx={{
          height: '300px',
          width: '300px',
          objectFit: 'cover',
          m: '1.5rem'
        }}
      />
      <CardContent 
      >
        <h3>{venue.name}</h3>
        <p>{venue.description}</p>
        <VenueUpdateForm 
            venue={venue} 
            onUpdate={onUpdate} 
            onDelete={onDelete}
        />
        <VenueBookings venueId={venue.id} accessToken={accessToken} />
      </CardContent>
    </Card>
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
    <Container>
      <h2>Managed Venues</h2>
      {error && <p>Error: {error}</p>}
      <CardContainer>
        {venues && venues.map((venue) => (
          <VenueItem 
            key={venue.id} 
            venue={venue} 
            onDelete={deleteVenue} 
            onUpdate={onUpdateVenue} 
            accessToken={accessToken}
          />
        ))}
      </CardContainer>
    </Container>
  );
};

export default VenuesList;