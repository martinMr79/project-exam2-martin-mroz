import styled from 'styled-components';

export const StyledNav = styled.nav`
  border: 0;
  background-color: #2E2E37;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
    margin-left: 2rem; 
    

    div {
      font-family: 'Clarendon-Regular', serif;
      font-size: 2.6rem;
      color: white;
    
    }
  }

  .right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1.5rem;




  .avatar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 1rem;
    
  }

  a {
    font-family: 'Trade Gothic LT', sans-serif;
    text-decoration: none;
    padding-right: 1.5rem;
    font-size: 1rem;
    color: white;

    &:hover {
      color: #ECCCCC;
    }
  }
}
 
.nav-link {
      color: white; 
      font-family: 'Trade Gothic LT', sans-serif;
    }

  a:link {
    text-decoration: none;
    
  }


  .menu-icon {
  
    margin-right: 2.5rem;
   

    @media (min-width: 769px) {
      display: none;
      
    }
  }

  @media (max-width: 768px) {

    .right {
      display: none;
    }

  }
`;
  
  