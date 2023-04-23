import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utilities/constants";
import { LoginContainer } from "./styled";

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        baseURL + "auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      setResponse(response.data);
      setSuccess("Log in successful!");
      window.location.reload(); // Refresh the page after login is successful
    } catch (error) {
      setError(`Log in failed: ${error.response.data.message}`);
    }
  };

  return (
    <LoginContainer>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {response && (
        <div>
          <h2>Welcome {response.name}</h2>
          <p>Email: {response.email}</p>
          <Avatar 
            alt={response.name} 
            src= {response.avatar} 
            sx={{ width: 200, height: 200 }} />
          <p>Venue Manager: {response.venueManager ? "Yes" : "No"}</p>
        </div>
      )}
      <form id="login-form" onSubmit={handleSubmit}>
        <TextField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '10px' }} />
        <br />
        <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '10px' }} />
        <br />
        <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>Log in</Button>
      </form>
      </LoginContainer>
  );
};

export default LoginForm;