import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";
import { Link } from "react-router-dom";
import { Container, CardContainer, ImageContainer, SearchContainer } from "./styled";
import SearchBar from "../../components/searchbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import CardMedia from '@mui/material/CardMedia';
import { useHomeStore } from "../../hooks/api";
import backgroundImg from "../../assets/images/backgroundImg.jpg"

export function Home() {
  const { data, isLoading, isError, loadMore } = useAPI(baseURL + "venues", useHomeStore);

  if (isLoading) {
      return <div>Loading</div>;
  }

  if (isError) {
      return <div>Error</div>;
  }

  if (!Array.isArray(data)) {
    return <div>No data</div>;
  }

  return (
    <>
      <ImageContainer backgroundImg={backgroundImg}/>
      <SearchContainer>
        <SearchBar data={data} isLoading={isLoading} isError={isError} />
      </SearchContainer>
      <Container>

      <h1>Venues</h1>
      <CardContainer>
      {data && data.map((venue, index) => (
  <Link key={`${venue.id}-${index}`}
        to={`/venues/${venue.id}`}
        style={{ textDecoration: 'none' }}
        >
            <Card 
              sx={{ 
                maxWidth: 345,
                minHeight: 600
              }}
            >
              <CardMedia
                component="img"
                image={venue.media.length > 0 ? venue.media[0] : 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
                title={venue.name}
                alt={venue.name}
                sx={{
                  height: '300px',
                  width: '300px',
                  objectFit: 'cover',
                  m: '1.5rem'
                }}
              />
              <CardContent>      
                <h2 key={venue.id}>{venue.name}</h2>      
                <p >{venue.price} Nok pr night</p>
                <p>WiFi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
                <p>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</p>
                <p>Parking: {venue.meta.wifi ? 'Yes' : 'No'}</p>
                <p>Pets: {venue.meta.wifi ? 'Allowed' : 'Not allowed'}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardContainer>
      <Button onClick={loadMore}>Load More</Button>
    </Container>
    </>
  );
}

export default Home;