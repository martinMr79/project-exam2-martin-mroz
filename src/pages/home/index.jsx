import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";
import { Link } from "react-router-dom";
import { Container, CardContainer } from "./styled";
import SearchBar from "../../components/searchbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHomeStore } from "../../hooks/api";

export function Home() {
    const { data, isLoading, isError } = useAPI(baseURL + "venues", useHomeStore);

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
        <Container>
          <h1>Venues</h1>
          <SearchBar data={data} isLoading={isLoading} isError={isError} />
          <CardContainer>
            {data && data.map((venue) => (
              <Link key={venue.id} to={`/venues/${venue.id}`}>
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
                  />
                  <CardContent>      
                    <h2 key={venue.id}>{venue.name}</h2>        
                    <p >{venue.price} Nok pr night</p>
                    <p >{venue.description}</p>
                    <p>WiFi: {venue.meta.wifi ? 'Yes' : 'No'}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContainer>
        </Container>
    );
}

export default Home;
