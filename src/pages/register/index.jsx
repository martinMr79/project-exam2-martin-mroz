import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utilities/constants";
import Alert from "@mui/material/Alert";

const RegisterCustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(baseURL + "auth/register", {
        name,
        email,
        password,
        avatar,
        venueManager: false,
      });
      console.log(response.data);
      setSuccess("Registration successful!");
    } catch (error) {
      setError(error.response.data.message);
      setWarning(`Registration failed: ${error.response.data.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Avatar:
        <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
      <br />
      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}
      {warning && (
        <Alert severity="warning" onClose={() => setWarning("")}>
          {warning}
        </Alert>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterCustomerForm;
