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
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0; 
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-sizing: border-box;
   
  
  

div {
    background-color: #F2F2F2;
    height: 90px;
    width: 100%; 
    padding: 15px; 
    display: flex; 
    align-items: center;
    border: 2px solid grey;
    z-index: 99;
    
}

ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;  
    box-sizing: border-box;
  }
  
  li {
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    
    & > div {
      width: 100%;
      
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
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