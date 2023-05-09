import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer } from "../styled";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AvatarUpdate from "../ManagerProfile/AvatarUpdate";
import VenueForm from "../ManagerProfile/VenueForm";

const ManagerProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
  const history = useNavigate();
  const [loading, setLoading] = useState(true);


  const [venue, setVenue] = useState({
    name: "",
    description: "",
    media: [""],
    price: 0,
    maxGuests: 0,
    rating: 5,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0
    }
  });

 
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
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(baseURL + "auth/refresh-token", {
          token: decodedToken.refreshToken,
        });
  
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error(error);
        history.push("/login");
      }
  
      setLoading(false);
    };
  
    fetchAccessToken();
  }, [accessToken, decodedToken, history, setAccessToken]);

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