import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../hooks/useAuthStore";
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
  const { accessToken, setAccessToken, clearAccessToken } = useAuthStore();
  const navigate = useNavigate();

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
      setAccessToken(response.data.accessToken); // Set the access token in the global store
      setSuccess("Log in successful!");
      navigate("/dashboard"); // Redirect the user to the dashboard page

    } catch (error) {
      setError(`Log in failed: ${error.response.data.message}`);
    }
  };

  const handleLogout = () => {
    clearAccessToken(); // Clear the access token from the global store
    navigate("/login"); // Redirect the user to the login page
  };

  return (
    <LoginContainer>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {accessToken && (
        <div>
          <h2>Welcome {accessToken.name}</h2>
          <p>Email: {accessToken.email}</p>
          <Avatar
            alt={accessToken.name}
            src={accessToken.avatar}
            sx={{ width: 200, height: 200 }}
          />
          <p>Venue Manager: {accessToken.venueManager ? "Yes" : "No"}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
      {!accessToken && (
        <form id="login-form" onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
          <br />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Log in
          </Button>
        </form>
      )}
    </LoginContainer>
  );
};

export default LoginForm;