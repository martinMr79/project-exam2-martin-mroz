import styled from "styled-components";


export const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto; 
  @media (min-width: 700px) {
    width: 27rem;
  }
`;


export const StyledResults = styled.div `

position: absolute;  /* Added this */
  top: 100%;  /* Positioned right below the search bar */
  width: 100%;  /* Take the full width of the parent */
  z-index: 100;  /* To ensure it's above other content */

div {
    background-color: #F2F2F2;
    height: 100px;
    width: 100%; 
    padding: 15px; 
    display: flex; 
    align-items: center;
    border: 2px solid grey;
    z-index: 99;
    
}

 ul {
    text-decoration: none; 
    display: inline-block;
    list-style-type: none;
    padding: 0; 
    margin-top: -28px;
};
    

  li {  
    font-size: 1.1em;
    display: flex; 
    align-items: center;
    
}

img {
    height: 60px;
    width: 60px;
    padding-right: 15px;
   
}

a {
    color: black;
    text-decoration: none; 
    list-style-type: none;
    
}

`