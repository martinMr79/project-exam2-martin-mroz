import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../utilities/constants";
import { useAuthStore } from "../../hooks/useAuthStore";

const Profile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken } = useAuthStore();

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
      setAccessToken(accessToken); // Update the access token in the global store
      window.location.reload(); // Reload the page to display the updated avatar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Welcome {decodedToken ? decodedToken.name : ""}</h2>
      <p>Email: {decodedToken ? decodedToken.email : ""}</p>
      <Avatar
        alt={decodedToken ? decodedToken.name : ""}
        src={decodedToken ? decodedToken.avatar : ""}
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
      <p>Venue Manager: {decodedToken ? (decodedToken.venueManager ? "Yes" : "No") : ""}</p>
      
    </div>
  );
};

export default Profile;