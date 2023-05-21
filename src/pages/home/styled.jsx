import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: -16rem auto;
`;

export const Container = styled.div`
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25rem auto 6rem;
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
  