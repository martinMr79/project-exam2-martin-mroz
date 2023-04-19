import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";
import { Link } from "react-router-dom";
import { Container, CardContainer } from "./styled";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export function Home() {
    const { data, isLoading, isError } = useAPI(baseURL + "venues");
    console.log(data)
    if (isLoading) {
        return <div>Loading</div>;
      }
      if (isError) {
        return <div>Error</div>;
      }

    return (
        <Container>

          <h1>Venues</h1>
          

          <CardContainer>
          
          {data && data.map((venue) => (
        
        <Link to={`/venues/${venue.id}`}>
        <Card 
          sx={{ 
          maxWidth: 345,
          minHeight: 600  

            }}
>
                
                <CardMedia
                  component="img"
                  image={venue.media.length > 0 ? venue.media : 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
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
