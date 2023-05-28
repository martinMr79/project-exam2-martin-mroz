import React, { useEffect, useState, useCallback } from "react"; 
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { BookingContainer } from "../styled";
import AvatarUpdate from "../ManagerProfile/AvatarUpdate";
import VenueForm from "../ManagerProfile/VenueForm";
import VenuesList from "../ManagerProfile/VenuesList";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";
import ViewBookings from "../hooks/viewBookings"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme, primary }) => ({
  background: primary 
    ? 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)'
    : 'linear-gradient(45deg, #757575 30%, #BDBDBD 90%)',
  color: primary ? 'white' : 'black',
}));

const ManagerProfile = () => {
  const [avatarURL, setAvatarURL] = useState("");
  const { decodedToken, accessToken, setAccessToken, setDecodedToken } = useAuthStore();
  const history = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [activeComponent, setActiveComponent] = useState("profile");
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
  if (activeComponent === "myVenues") {
    const initialiseVenues = async () => {
      const fetchedVenues = await fetchVenues();
      setVenues(fetchedVenues);
    };

    initialiseVenues();
  }
}, [activeComponent, fetchVenues]); 

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
  }, [accessToken, decodedToken]);

  const addVenue = (newVenue) => {
    setVenues((prevVenues) => [...prevVenues, newVenue]);
  };

  const updateVenue = async (venueId, updatedVenue) => {
    try {
      const response = await axios.put(`${baseURL}venues/${venueId}`, updatedVenue, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const updatedVenues = venues.map((venue) => 
          venue.id === venueId ? response.data : venue
        );
        setVenues(updatedVenues);
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
};


  return (
    <BookingContainer>
    {loading ? (
      <CircularProgress />
    ) : (
      <>
        {decodedToken ? (
          <>
            <h1 style={{ marginBottom: "3rem" }}>Welcome {decodedToken.name}</h1>
            <Box sx={{ padding: 1, marginBottom: "3rem" }}>
            <StyledButton
  variant="contained"
  primary={activeComponent === "profile"}
  sx={{ margin: 1, width: { xs: '100%', sm: 'auto' }, marginBottom: { xs: 2, sm: 'auto' } }}
  onClick={() => setActiveComponent("profile")}
>
  Profile
</StyledButton>

<StyledButton
  variant="contained"
  primary={activeComponent === "myVenues"}
  sx={{ margin: 1, width: { xs: '100%', sm: 'auto' }, marginBottom: { xs: 2, sm: 'auto' } }}
  onClick={() => setActiveComponent("myVenues")}
>
  My Venues
</StyledButton>

<StyledButton
  variant="contained"
  primary={activeComponent === "addVenue"}
  sx={{ margin: 1, width: { xs: '100%', sm: 'auto' }, marginBottom: { xs: 2, sm: 'auto' } }}
  onClick={() => setActiveComponent("addVenue")}
>
  Add a Venue
</StyledButton>

<StyledButton
  variant="contained"
  primary={activeComponent === "myBookings"}
  sx={{ margin: 1, width: { xs: '100%', sm: 'auto' }, marginBottom: { xs: 2, sm: 'auto' } }}
  onClick={handleMyBookings}
>
  My bookings
</StyledButton>
            </Box>

            {activeComponent === "profile" && (
              <AvatarUpdate
                decodedToken={decodedToken}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                setDecodedToken={setDecodedToken}
                avatarURL={avatarURL}
                setAvatarURL={setAvatarURL}            
              />
            )}

            {activeComponent === "myBookings" && <ViewBookings bookings={bookings} />}

            {activeComponent === "myVenues" && (
              <VenuesList
                venues={venues}
                setVenues={setVenues}
                accessToken={accessToken}
                decodedToken={decodedToken}
                onUpdateVenue={updateVenue}
              />
            )}

            {activeComponent === "addVenue" && (
              <VenueForm
                accessToken={accessToken}
                decodedToken={decodedToken}
                addVenue={addVenue}
              />
            )}



          </>
        ) : (
          <div>You are not logged in.</div>
        )}
      </>
    )}
  </BookingContainer>
  );
};

export default ManagerProfile;
    
           







