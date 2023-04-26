import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../hooks/useAuthStore";
import { baseURL } from "../../utilities/constants";
import { LoginContainer } from "./styled";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Nav } from "../../components/header";

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
    setDecodedToken(null);
    navigate("/login"); // Redirect the user to the login page
  };

  return (
    <div>
      <Nav decodedToken={decodedToken} handleLogout={handleLogout} />
      <LoginContainer>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        {decodedToken && decodedToken.name && (
          <div>
            <h2>Welcome {decodedToken.name}</h2>
            <p>Email: {decodedToken.email}</p>
            <Avatar
              alt={decodedToken.name}
              src={decodedToken.avatar}
              sx={{ width: 200, height: 200 }}
            />
            <p>Venue Manager: {decodedToken.venueManager ? "Yes" : "No"}</p>
          </div>
        )}
        {!decodedToken && (
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
    </div>
  );
};

export default LoginForm;


