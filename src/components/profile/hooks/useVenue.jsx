import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../utilities/constants';

const initialState = {
  name: '',
  description: '',
  media: [''],
  price: 0,
  maxGuests: 0,
  location: {
    address: '',
    city: '',
    zip: '',
    country: ''
  },
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
};

export const useVenue = (accessToken, onAddVenue) => {
  const [venue, setVenue] = useState(initialState);
  const [ setMedia] = useState(null);

  const handleVenueChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
      setVenue((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [name.split('.')[1]]: checked,
        },
      }));
    } else if (name.startsWith('media-')) {
      const index = Number(name.split('-')[1]);
      const updatedMedia = [...venue.media];
      updatedMedia[index] = value;
      setVenue((prevState) => ({
        ...prevState,
        media: updatedMedia,
      }));
    } else if (name.startsWith('location.')) {
      setVenue((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setVenue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMediaChange = (index, event) => {
    const updatedMedia = [...venue.media];
    updatedMedia[index] = event.target.value;
    setVenue((prevState) => ({
      ...prevState,
      media: updatedMedia,
    }));
  };

  const addMediaInput = () => {
    setVenue((prevState) => ({
      ...prevState,
      media: [...prevState.media, ''],
    }));
  };

  const handleAddVenue = async (event) => {
    event.preventDefault();
    const payload = {
      ...venue,
      price: parseFloat(venue.price), 
      maxGuests: parseFloat(venue.maxGuests), 
      media: venue.media.filter((item) => item !== ""),
    };

    try {
      const response = await axios.post(`${baseURL}venues`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onAddVenue(response.data); 
      setVenue(initialState);
      setMedia(null);
    } catch (error) {
      console.error("Error adding venue:", error);
    }
  };

  return {
    venue,
    handleVenueChange,
    handleAddVenue,
    addMediaInput,
    handleMediaChange,
  };
};
