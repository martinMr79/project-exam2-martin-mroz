import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 6rem;
`;


export const ImageContainer = styled.div`
  background: url(${props => props.backgroundImg}) no-repeat center center/cover;
  height: 400px; 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const VenueImage = styled.img`
  height: 300px;
  width: 300px;
  object-fit: cover;
  margin: 1.5rem;
`;

export const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  justify-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
  margin-top: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
  