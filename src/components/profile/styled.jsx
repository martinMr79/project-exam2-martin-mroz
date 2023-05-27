import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 6rem;
  margin-top: 4rem;
  width: 100%;
  max-width: 90vw; 

  @media (min-width: 600px) {
    max-width: 870px; 
  }
`;

export const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 6rem;
  margin-top: 4rem;
  width: 100%;
  max-width: 90vw; 

  @media (min-width: 600px) {
    max-width: 870px; 
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto; 
  padding: 0 20px;
  
`;  

export const CardContainer = styled.div`
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  max-width: 1200px;  
  width: 100%;  

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;  
  padding-top: 1rem;
`;

export const TextFieldContainer = styled.div`
  width: 100%;
  max-width: 38rem; 
`;