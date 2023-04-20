import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utilities/constants";

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setSuccess("Log in successful!");
    } catch (error) {
      setError(`Log in failed: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form id="login-form" onSubmit={handleSubmit}>
        <TextField type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '10px' }} />
        <br />
        <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '10px' }} />
        <br />
        <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>Log in</Button>
      </form>
    </div>
  );
};

export default LoginForm;