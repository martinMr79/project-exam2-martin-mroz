import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";

export const useVenue = (accessToken) => {
  const [venue, setVenue] = useState({
    media: [""],
    meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false
      },
  });

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

  const addMediaInput = () => {
    setVenue({
      ...venue,
      media: [...venue.media, ""]
    });
  };


  const handleMediaChange = (index, event) => {
    const newMedia = [...venue.media];
    newMedia[index] = event.target.value;
    setVenue({ ...venue, media: newMedia });
  };
  

  return {
    venue,
    handleVenueChange,
    handleAddVenue,
    addMediaInput,
    handleMediaChange,
  };
};