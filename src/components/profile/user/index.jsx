import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer } from "../styled";

const UserProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const [bookings, setBookings] = useState([]);
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
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
    
        // If the API returns the bookings in the response data
        if (response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          console.error("API did not return expected bookings data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Setting loading to false even if there was an error
      }
    };
    
    fetchBookings();
  }, [accessToken, decodedToken]);

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
    {bookings.map((booking) => (
      <div key={booking.id}>
        <h3>Venue: {booking.venue.name}</h3>
        <p>
          From: {booking.dateFrom} To: {booking.dateTo} Guests: {booking.guests}
        </p>
      </div>
    ))}
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