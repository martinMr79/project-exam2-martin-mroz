import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { baseURL } from "../../../utilities/constants";

const AvatarUpdate = ({
  decodedToken,
  accessToken,
  setAccessToken,
  setDecodedToken,
  avatarURL,
  setAvatarURL,
}) => {
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

  return (
    <>
      <Avatar
        alt={decodedToken.name}
        src={decodedToken.avatar}
        sx={{ width: 200, height: 200 }}
      />
      <TextField
        label="New Avatar URL"
        value={avatarURL}
        onChange={(e) => setAvatarURL(e.target.value)}
        fullWidth
        sx={{
        my: "2rem"
        }}
      />
      <Button onClick={handleAvatarUpdate}>Update Avatar</Button>
    </>
  );
};

export default AvatarUpdate;