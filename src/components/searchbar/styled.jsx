import styled from "styled-components";


export const SearchBarWrapper = styled.div`
  position: sticky;
  top: 0; 
  z-index: 99; 
`;


export const StyledResults = styled.div `

container {
    display: flex; 
    align-items: center;
    justify-content: center; 
}

div {
    background-color: #F2F2F2;
    height: 100px;
    width: 300px;
    padding: 15px; 
    margin-right: 40px;
    display: flex; 
    align-items: center;
    margin-top: -17px;
    border: 2px solid grey;
    z-index: 99;
}

 ul {
    text-decoration: none; 
    display: inline-block;
    list-style-type: none;
};
    

  li {  
    font-size: 1.1em;
    display: flex; 
    align-items: center;
    
}

img {
    height: 60px;
    padding-right: 5px;
   
}

a {
    color: black;
    text-decoration: none; 
    list-style-type: none;
}

`