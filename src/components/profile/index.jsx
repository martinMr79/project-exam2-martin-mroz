import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../utilities/constants";

const Profile = ({ decodedToken, handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");

  const handleAvatarUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(baseURL + `profiles/${decodedToken.name}/media`, {
        avatar: avatarURL,
      });
      window.location.reload(); // Reload the page to display the updated avatar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Welcome {decodedToken.name}</h2>
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
      <p>Venue Manager: {decodedToken.venueManager ? "Yes" : "No"}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Profile;