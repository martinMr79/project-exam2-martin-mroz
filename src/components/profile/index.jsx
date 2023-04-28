import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Profile = ({ decodedToken, handleLogout }) => {
  return (
    <div>
      <h2>Welcome {decodedToken.name}</h2>
      <p>Email: {decodedToken.email}</p>
      <Avatar
        alt={decodedToken.name}
        src={decodedToken.avatar}
        sx={{ width: 200, height: 200 }}
      />
      <p>Venue Manager: {decodedToken.venueManager ? "Yes" : "No"}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Profile;