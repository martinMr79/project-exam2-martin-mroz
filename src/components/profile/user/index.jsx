import React, { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer } from "../styled";

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
          <h2>Welcome user {decodedToken.name}</h2>

          <p>Email: {decodedToken.email}</p>
          <Avatar
            alt={decodedToken.name}
            src={decodedToken.avatar}
            sx={{ width: 200, height: 200 }}
          />
          <form onSubmit={handleAvatarUpdate}>
            <TextField
              type="text"
              label="New Avatar URL"
              value={avatarURL}
              onChange={(e) => setAvatarURL(e.target.value)}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <br />
            <Button variant="contained" type="submit">
              Update Avatar
            </Button>
          </form>
          <p>Venue Manager: {decodedToken.role === "venueManager" ? "Yes" : "No"}</p>
          <Button onClick={handleLogout}>Logout</Button>
          {bookings.length > 0 && (
            <div>
              <h2>Your Bookings:</h2>
              {bookings.map((booking) => {
                const fromDate = new Date(booking.dateFrom);
                const toDate = new Date(booking.dateTo);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };

                return (
                  <div key={booking.id}>
                    <h3>{booking.venue.name}</h3>
                    <img src= {booking.venue.media} 
                         alt={booking.venue.name} 
                         style={{ width: "250px", marginBottom: "10px" }}/>
                      <p>
                      Check in: 15:00 {fromDate.toLocaleDateString(undefined, options)}</p> 
                      <p>check out: {toDate.toLocaleDateString(undefined, options)}</p>
                      <p>Guests:{booking.guests}</p> 
                  </div>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <div>You are not logged in.</div>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;