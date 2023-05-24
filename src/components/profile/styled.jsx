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
    max-width: 600px; 
  }
  `;

export const Container = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;  

export const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  margin-top: 2rem;

  @media (min-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

