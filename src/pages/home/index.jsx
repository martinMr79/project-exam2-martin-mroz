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
import { useState, useEffect } from "react";

export function Home() {
  const [itemsToShow, setItemsToShow] = useState(20);
  const { data, isLoading, isError, loadMore } = useAPI(useHomeStore);

  useEffect(() => {
    useHomeStore.getState().fetchData(`${baseURL}venues`, true);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!Array.isArray(data)) {
    return <div>No data...</div>;
  }

  const showMoreItems = () => {
    if (!isLoading) {
      loadMore();
      setItemsToShow(itemsToShow + 20);
    }
  };

  return (
    <>
      <ImageContainer backgroundImg={backgroundImg}/>
      <SearchContainer>
        <SearchBar data={data} isLoading={isLoading} isError={isError} />
      </SearchContainer>
      <Container>
        <h1 style={{ margin: "15px" }}>Book your dream apartment</h1>
        <CardContainer>
          {data && data.slice(0, itemsToShow).map((venue, index) => {
            if (venue.media.length === 0) {
              return null;
            }
            return (
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
                    image={venue.media[0]}
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
  <p>{venue.location.city} {venue.location.country}</p>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <p>{venue.price} Nok pr night</p>
    <p>Max Guests: {venue.maxGuests}</p>
  </div>
</CardContent>
                </Card>
              </Link>
            );
          })}
        </CardContainer>
        {itemsToShow < data.length && ( 
          <Button onClick={showMoreItems}>Load More</Button>
        )}
      </Container>
    </>
  );
}

export default Home;