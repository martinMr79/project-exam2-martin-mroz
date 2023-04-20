import React from "react";
import { useParams } from "react-router-dom";
import { StyledNav } from "./styled";

import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

function Nav() {
  const accessToken = localStorage.getItem("accessToken"); // Get the access token from local storage
  const isLoggedIn = accessToken != null; // Check if the access token is present or not
  
  return (
    <StyledNav>
      <div className="left">
        <a href="/"><div>Holidaze</div></a>
      </div>
      <MenuIcon className="menu-icon" />
      <div className="right">
        {isLoggedIn ? ( // If the user is logged in, render the Avatar component
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
        ) : ( // Otherwise, render the "Log in" and "Create account" links
          <>
            <a href="/login">Log in</a>
            <a href="register">Create account</a>
          </>
        )}
      </div>
    </StyledNav>
  );
}


function Product() {
  let params = useParams();

  // Logs the id of whichever product page you are on e.g.
  // {id: '1'} or {id: '2'}
  return <div>Individual product page: {params.id}</div>;
}

export { Nav, Product };