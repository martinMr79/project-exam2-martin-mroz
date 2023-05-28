import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer, TextFieldContainer, Container, CardContainer } from "../styled";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const UserProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken, bookings, setBookings } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const handleAvatarUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        baseURL + `profiles/${decodedToken.name}/media`,
        {
          avatar: avatarURL,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setAccessToken(accessToken);
      const updatedToken = { ...decodedToken, avatar: avatarURL };
      setDecodedToken(updatedToken); 
      setAvatarURL("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${baseURL}profiles/${decodedToken.name}?_venues=true&_bookings=true`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          console.error("API did not return expected bookings data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };
    
    fetchBookings();
  }, [accessToken, decodedToken, setBookings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      {decodedToken ? (
        <>
          <h1>Welcome {decodedToken.name}</h1>
          
          <Avatar
            alt={decodedToken.name}
            src={decodedToken.avatar}
            sx={{ width: 200, height: 200, mt: "2rem" }}
          />
          <p>Email: {decodedToken.email}</p>
          <form onSubmit={handleAvatarUpdate}>
            <TextFieldContainer>
              <TextField
                type="text"
                label="New Avatar URL"
                value={avatarURL}
                onChange={(e) => setAvatarURL(e.target.value)}
                fullWidth
                sx={{
                  mt: "2rem",
                  maxWidth: "38rem"
                }}
              />
            </TextFieldContainer>
            <br />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button type="submit">Update Avatar</Button>
            </div>
          </form>
                
          {bookings.length > 0 && (
            <Container>
              <h2>Your Bookings:</h2>
              <CardContainer>
                {console.log(bookings)}
              {bookings.map((booking) => {
               const fromDate = new Date(booking.dateFrom);
               const toDate = new Date(booking.dateTo);
               const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return (
                    <Card 
                      key={booking.id}
                      sx={{ 
                        maxWidth: 345,
                        minHeight: 450,       
                        marginTop: "2rem"
                      }}
                    >
                      <CardContent>
                        <CardMedia
                          component="img"
                          image={booking.venue.media} 
                          alt={booking.venue.name} 
                          sx={{
                            height: '300px',
                            width: '300px',
                            objectFit: 'cover',
                          }}
                        />
                        <h3>{booking.venue.name}</h3>
                        <p>
                          Check in: 15:00 {fromDate.toLocaleDateString(undefined, options)}
                        </p>
                        <p>
                          Check out: {toDate.toLocaleDateString(undefined, options)}
                        </p>
                        <p>
                          Guests: {booking.guests}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </CardContainer>
            </Container>
          )}
        </>
      ) : null}
    </ProfileContainer>
  );
};

export default UserProfile;
