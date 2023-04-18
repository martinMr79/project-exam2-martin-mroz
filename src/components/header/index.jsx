import React from "react";
import { Link, useParams } from "react-router-dom";
import { StyledNav } from "./styled";
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
    return (
      <StyledNav>
        <div className="left">
          <div>Holidaze</div>
          
        </div>
        <MenuIcon className="menu-icon" />
        <div className="right">      
          <a href="#">Log in</a>
          <a href="#">Create account</a>
        </div>
      </StyledNav>
    );
}

function Checkout() {
  return <div>Checkout</div>;
}

function Product() {
  let params = useParams();

  // Logs the id of whichever product page you are on e.g.
  // {id: '1'} or {id: '2'}
  return <div>Individual product page: {params.id}</div>;
}

export { Nav, Product, Checkout };