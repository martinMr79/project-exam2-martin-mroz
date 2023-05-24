import React, { useEffect, useState, useCallback } from "react"; 
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ProfileContainer } from "../styled";
import AvatarUpdate from "../ManagerProfile/AvatarUpdate";
import VenueForm from "../ManagerProfile/VenueForm";
import VenuesList from "../ManagerProfile/VenuesList";
import VenueBooking from "../user/VenueBooking"
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import ViewBookings from "../hooks/viewBookings"

const ManagerProfile = ({ handleLogout }) => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
  const history = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMyBookings = useCallback(async () => {
    setActiveComponent("myBookings");
    const response = await axios.get(`${baseURL}venues/${decodedToken.id}/bookings`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
        setBookings(response.data);
    }
  }, [accessToken, decodedToken]);

  const fetchVenues = useCallback(async (offset = 0, limit = 100) => {
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
  }, [accessToken, decodedToken]); 

  useEffect(() => {
    const initialiseVenues = async () => {
      const fetchedVenues = await fetchVenues();
      setVenues(fetchedVenues);
    };

    initialiseVenues();
  }, [fetchVenues]); 

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  useEffect(() => {
    console.log(activeComponent);
  }, [activeComponent]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
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
  }, [accessToken, decodedToken, baseURL]);

  const addVenue = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
  };

  return (
    <ProfileContainer>
      {decodedToken ? (
        <>
          <h1>Welcome {decodedToken.name}</h1>

          {activeComponent === "profile" && (
            <AvatarUpdate
              decodedToken={decodedToken}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              setDecodedToken={setDecodedToken}
              avatarURL={avatarURL}
              setAvatarURL={setAvatarURL}            />
              )}
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Button variant="contained" style={{ marginRight: "10px" }} onClick={() => setActiveComponent("profile")}>Profile</Button>
                <Button variant="contained" style={{ marginRight: "10px" }} onClick={() => setActiveComponent("myVenues")}>My Venues</Button>
                <Button variant="contained" style={{ marginRight: "10px" }} onClick={() => setActiveComponent("addVenue")}>Add a Venue</Button>
                <Button variant="contained" style={{ marginRight: "10px" }} onClick={handleMyBookings}>My bookings</Button>
              </div>
    
              {activeComponent === "myBookings" && <ViewBookings bookings={bookings} />}
    
              {activeComponent === "myVenues" && (
                <VenuesList
                  venues={venues}
                  setVenues={setVenues}
                  accessToken={accessToken}
                  decodedToken={decodedToken}
                />
              )}
              
              {activeComponent === "addVenue" && (
                <VenueForm
                  accessToken={accessToken}
                  decodedToken={decodedToken}
                  addVenue={addVenue}
                />
              )}
    
              <Button variant="contained" style={{ marginTop: "10px" }} onClick={handleLogout}>Logout</Button>
    
            </>
          ) : (
            <div>You are not logged in.</div>
          )}
        </ProfileContainer>
      );
    };
    
    export default ManagerProfile;
    
           







