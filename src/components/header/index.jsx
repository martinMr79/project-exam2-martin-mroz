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
    clearAccessToken(); 
    navigate("/login"); 
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
      <MenuIcon className="menu-icon" style={{ color: 'white' }} onClick={handleClick}/>
      <div className="right">
        {accessToken ? (
          <div className="avatar-container">
            {decodedToken && decodedToken.avatar && (
              <Link to="/profile">
                <Avatar alt="User Avatar" src={decodedToken.avatar} />
              </Link>
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
          <Link to="/login">Log in</Link>
        )}

<Menu
  id="create-account-menu"
  anchorEl={anchorEl}
  open={open} 
  onClose={handleClose}
  MenuListProps={{
    'aria-labelledby': 'create-account-button',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
  {accessToken ? (
    <>
      <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </>
  ) : (
    <>
      <MenuItem component={Link} to="/register" onClick={handleClose}>User</MenuItem>
      <MenuItem component={Link} to="/registerManager" onClick={handleClose}>Venue Manager</MenuItem>
    </>
  )}
</Menu>

      </div>
    </StyledNav>
  );
}

export { Nav };
