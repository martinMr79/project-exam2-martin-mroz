import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../hooks/useAuthStore";
import { baseURL } from "../../utilities/constants";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginContainer } from "./styled";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAccessToken, setDecodedToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(baseURL + "auth/login", {
        email,
        password,
      });
      console.log(response);
      const { email: userEmail, accessToken } = response.data;
      setEmail(userEmail);
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      const decodedToken = jwt_decode(accessToken);
      setDecodedToken(decodedToken);
      console.log("Decoded token:", decodedToken);
      navigate("/");
    } catch (error) {
      setError(`Log in failed: ${error.response.data.message}`);
    }
  };

  return (
    <LoginContainer>
      <form id="login-form" onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
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
    </LoginContainer>
  );
};

export default LoginForm;

