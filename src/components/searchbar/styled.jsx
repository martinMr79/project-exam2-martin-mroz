import styled from "styled-components";


export const SearchBarWrapper = styled.div`
  position: sticky;
  top: 0; 
  z-index: 99; 
`;


export const StyledResults = styled.div `


div {
    background-color: #F2F2F2;
    height: 100px;
    width: 400px;
    padding: 15px; 
    margin-right: 40px;
    display: flex; 
    align-items: center;
    margin-top: -12px;
    border: 2px solid grey;
    z-index: 99;
    
}

 ul {
    text-decoration: none; 
    display: inline-block;
    list-style-type: none;
    padding: 0; 
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