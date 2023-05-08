import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { StyledNav } from "./styled";
import useAuthStore from "../../hooks/useAuthStore";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Nav({ decodedToken }) {
  const { accessToken, clearAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleLogout() {
    clearAccessToken(); // Clear the access token from the global store
    navigate("/login"); // Redirect the user to the login page
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledNav>
      <div className="left">
        <Link to="/">
          <div>Holidaze</div>
        </Link>
        
      </div>
      <div>
      {decodedToken && (
  <Link to="/profile" className="nav-link">
    Profile
  </Link>
)}
      </div>

      <MenuIcon className="menu-icon" />
      <div className="right">
        {accessToken ? (
          <div className="avatar-container">
            {decodedToken && decodedToken.avatar && (
              <Avatar alt="User Avatar" src={decodedToken.avatar} />
            )}
            <Button onClick={handleLogout}   
              sx={{
                color: 'white'
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Button 
              id="create-account-button"
              sx={{
                color: 'white'
              }}
              onClick={handleClick}
            >
              Create account
            </Button>
            <Menu
              id="create-account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'create-account-button',
                
              }}
            >
              <MenuItem component={Link} to="/register" onClick={handleClose}>User</MenuItem>
              <MenuItem component={Link} to="/registerManager" onClick={handleClose}>Venue Manager</MenuItem>

            </Menu>
          </>
        )}
      </div>
    </StyledNav>
  );
}
  
export { Nav };