import React from "react";
import { Link, useParams } from "react-router-dom";




function Nav() {

  
  return (

      <nav>

        <Link to="/">Home</Link>

      </nav>

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