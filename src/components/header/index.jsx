import React from "react";
import { Link, useParams } from "react-router-dom";
import { StyledNav } from "./styled"



function Nav() {
    return (  
      <StyledNav>
        <div className="left">
          <div>Holidaze</div>
        </div>
        <div className="right">
          <Link to="/">Log in</Link>
          <Link to="/">Create account</Link>
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