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

  const handleMediaChange = (index, event) => {
    const newMedia = [...venue.media];
    newMedia[index] = event.target.value;
    setVenue({
      ...venue,
      media: newMedia
    });
  };

  const addMediaInput = () => {
    setVenue({
      ...venue,
      media: [...venue.media, ""]
    });
  };

  const handleVenueChange = (event) => {
    const { name, value } = event.target;
  
    if (name.startsWith("meta.")) {
      setVenue({
        ...venue,
        meta: {
          ...venue.meta,
          [name.replace("meta.", "")]: event.target.checked
        }
      });
    } else if (name.startsWith("location.")) {
      setVenue({
        ...venue,
        location: {
          ...venue.location,
          [name.replace("location.", "")]: value
        }
      });
    } else {
      let fieldValue = value;
      if (name === "price" || name === "maxGuests") {
        fieldValue = parseFloat(value);
      }
      setVenue({
        ...venue,
        [name]: fieldValue
      });
    }
  };

  const handleAddVenue = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}venues`,
        venue,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("Venue added:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
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
            <form onSubmit={handleAddVenue}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        name="name"
        label="Venue Name"
        value={venue.name}
        onChange={handleVenueChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        name="description"
        label="Description"
        value={venue.description}
        onChange={handleVenueChange}
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
  {venue.media.map((mediaUrl, index) => (
    <TextField
      key={index}
      name={`media-${index}`}
      label={`Media URL ${index + 1}`}
      value={mediaUrl}
      onChange={(event) => handleMediaChange(index, event)}
      fullWidth
    />
  ))}
  <Button onClick={addMediaInput}>Add Another Media URL</Button>
</Grid>
<Grid item xs={4}>
  <TextField
    name="price"
    label="Price"
    value={venue.price}
    onChange={handleVenueChange}
    fullWidth
  />
</Grid>
<Grid item xs={4}>
  <TextField
    name="maxGuests"
    label="Max Guests"
    value={venue.maxGuests}
    onChange={handleVenueChange}
    fullWidth
  />
</Grid>
    
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={venue.meta.wifi}
            onChange={handleVenueChange}
            name="meta.wifi"
          />
        }
        label="WiFi"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={venue.meta.parking}
            onChange={handleVenueChange}
            name="meta.parking"
          />
        }
        label="Parking"
      />
        <FormControlLabel
        control={
          <Checkbox
            checked={venue.meta.breakfast}
            onChange={handleVenueChange}
            name="meta.breakfast"
          />
        }
        label="breakfast"
      />
        <FormControlLabel
        control={
          <Checkbox
            checked={venue.meta.pets}
            onChange={handleVenueChange}
            name="meta.pets"
          />
        }
        label="pets"
      />
      {/* Add other checkbox fields here as needed */}
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" type="submit">
        Add Venue
      </Button>
    </Grid>
  </Grid>
</form>
  
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <div>You are not logged in.</div>
        )}
      </ProfileContainer>
    );
  };
  
  export default ManagerProfile;