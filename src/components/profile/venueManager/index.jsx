import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer } from "../styled";
import AvatarUpdate from "../ManagerProfile/AvatarUpdate";
import VenueForm from "../ManagerProfile/VenueForm";

const ManagerProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
  const history = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  return (
    <ProfileContainer>
      {decodedToken ? (
        <>
          <AvatarUpdate
            decodedToken={decodedToken}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            setDecodedToken={setDecodedToken}
            avatarURL={avatarURL}
            setAvatarURL={setAvatarURL}
          />
          <h2>Welcome {decodedToken.name}</h2>
          <p>Email: {decodedToken.email}</p>
          <p>Venue Manager: {decodedToken.role === "venueManager" ? "Yes" : "No"}</p>
          <h2>Add Venue</h2>
          <VenueForm accessToken={accessToken} />
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <div>You are not logged in.</div>
      )}
    </ProfileContainer>
  );
};

export default ManagerProfile;