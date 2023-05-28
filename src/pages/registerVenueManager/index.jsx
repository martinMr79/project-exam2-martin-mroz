import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utilities/constants";
import { FormContainer } from "./styled";

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

  const RegisterVenueManagerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        baseURL + "auth/register",
        {
          name,
          email,
          password,
          avatar,
          venueManager: true,
        }
      );
      setError("Registration successful!");
    } catch (error) {
      setError(`Registration failed: ${error.response.data.message}`);
    }
  };

  return (
    
    
    <FormContainer>
      
      <h1 style={{ margin: "0.5rem" }}>Become a Holidaze partner today</h1>

      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={submitForm}>
        
    
          <TextField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: '10px' }} />
        <br />
 
          <TextField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '10px' }} />
   
        <br />

          <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
    
        <br />
 
          <TextField type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ marginBottom: '10px' }} />
 
        <br />
   
          <TextField type="url" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} style={{ marginBottom: '10px' }} />
 
        <br />
        <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>Register</Button>
      </form>
      {error && <Alert severity="warning">Please fix the errors above and try again.</Alert>}
      
      </FormContainer>
  );
};

export default RegisterVenueManagerForm;

