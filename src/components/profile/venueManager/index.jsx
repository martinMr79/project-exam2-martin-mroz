import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer } from "../styled";
import AvatarUpdate from "../ManagerProfile/AvatarUpdate";
import VenueForm from "../ManagerProfile/VenueForm";
import VenuesList from "../ManagerProfile/VenuesList";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";


const ManagerProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
  const history = useNavigate();

  const [venues, setVenues] = useState([]); 

  const fetchVenues = async (offset = 0, limit = 100) => {
    try {
      const response = await axios.get(baseURL + "venues", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          _owner: true,
          offset: offset,
          limit: limit,
        },
      });
      console.log("Fetched venues:", response.data);

      const filteredVenues = response.data.filter(
        (venue) => venue.owner && venue.owner.email === decodedToken.email
      );

      if(response.data.length === limit) {
        const nextOffset = offset + limit;
        const nextVenues = await fetchVenues(nextOffset, limit);
        return [...filteredVenues, ...nextVenues];
      }

      return filteredVenues;
    } catch (error) {
      console.error("Error fetching venues:", error);
      return []; 
    }
  };

  useEffect(() => {
    const initialiseVenues = async () => {
      const fetchedVenues = await fetchVenues();
      setVenues(fetchedVenues);
    };

    initialiseVenues();
  }, [accessToken, decodedToken]);

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  const addVenue = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
  };

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
          <VenueForm accessToken={accessToken} onAddVenue={addVenue} />
          <VenuesList accessToken={accessToken} venues={venues} setVenues={setVenues} decodedToken={decodedToken} />
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <div>You are not logged in.</div>
      )}
    </ProfileContainer>
  );
};


export default ManagerProfile;
