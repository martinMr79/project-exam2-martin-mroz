import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import { useAuthStore } from "../../../hooks/useAuthStore";

const UserProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
  const history = useNavigate();
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
      setDecodedToken(updatedToken); // <-- Update this line
      setAvatarURL("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
     
  
      setLoading(false);
    };
  
    fetchAccessToken();
  
  }, [accessToken, decodedToken, history, setAccessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {decodedToken ? (
        <>
         {console.log("User profile decoded token:", decodedToken)}
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
        </>
      ) : (
        <div>You are not logged in.</div>
      )}
    </div>
  );
};

export default UserProfile;