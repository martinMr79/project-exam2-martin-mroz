import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledNav } from "./styled";

import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Get the access token from local storage
    setIsLoggedIn(accessToken != null); // Check if the access token is present or not
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken"); // Remove the access token from local storage
    setIsLoggedIn(false); // Update isLoggedIn state to false
    navigate("/login"); // Redirect the user to the login page
  }

  return (
    <StyledNav>
      <div className="left">
        <a href="/">
          <div>Holidaze</div>
        </a>
      </div>
      <MenuIcon className="menu-icon" />
      <div className="right">
        {isLoggedIn ? (
          <>
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <a href="/login">Log in</a>
            <a href="/register">Create account</a>
          </>
        )}
      </div>
    </StyledNav>
  );
}

export { Nav };