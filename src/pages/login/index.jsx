import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../hooks/useAuthStore";
import { baseURL } from "../../utilities/constants";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { LoginContainer } from "./styled";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setAccessToken, clearAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(baseURL + "auth/login", {
        email,
        password,
      });
      console.log(response); // add this line
      const { email: userEmail, accessToken } = response.data;
      setEmail(userEmail);
      setAccessToken(accessToken); // Set the access token in the global store
      const decodedToken = jwt_decode(accessToken);
      setSuccess("Log in successful!");
      setDecodedToken(decodedToken);
    } catch (error) {
      setError(`Log in failed: ${error.response.data.message}`);
    }
  };

  const handleLogout = () => {
    clearAccessToken(); // Clear the access token from the global store
    navigate("/login"); // Redirect the user to the login page
    window.location.reload(); 
  };

  return (
    <LoginContainer>
      {decodedToken ? (
        <div>
          <h2>Welcome {decodedToken.name}</h2>
          <p>Email: {decodedToken.email}</p>
          <Avatar
            alt={decodedToken.name}
            src={decodedToken.avatar}
            sx={{ width: 200, height: 200 }}
          />
          <p>Venue Manager: {decodedToken.venueManager ? "Yes" : "No"}</p>
          <Button onClick={handleLogout}>Logout</Button>
          
        </div>
      ) : (
        <form id="login-form" onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
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

