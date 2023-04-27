import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { StyledNav } from "./styled";
import useAuthStore from "../../hooks/useAuthStore";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function Nav({ decodedToken }) {
  const { accessToken, clearAccessToken } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    clearAccessToken(); // Clear the access token from the global store
    navigate("/login"); // Redirect the user to the login page
  }
  console.log(decodedToken)
  return (
    <StyledNav>
      <div className="left">
        <Link to="/">
          <div>Holidaze</div>
        </Link>
      </div>
      <MenuIcon className="menu-icon" />
      <div className="right">
        {accessToken ? (
          <div>
            {decodedToken && decodedToken.avatar && (
              <Avatar alt="User Avatar" src={decodedToken.avatar} />
            )}
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Create account</Link>
          </>
        )}
      </div>
    </StyledNav>
  );
}
  
export { Nav };