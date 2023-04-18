import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export function Home() {
    const { data, isLoading, isError } = useAPI(baseURL + "venues");

    if (isLoading) {
        return <div>Loading</div>;
      }
      if (isError) {
        return <div>Error</div>;
      }

    return (
        <div>

          <h1>Venues</h1>
          
          {data && data.map((venue) => (

            <Card sx={{ maxWidth: 345 }}>
                
                <CardMedia
                  component="img"
                  image={venue.media }
                  title={venue.name}
                  alt={venue.name}
                />
                
                <CardContent>      
                 <h2 key={venue.id}>{venue.name}</h2>        
                 <p >{venue.price} Nok pr night</p>
                 <p >{venue.description}</p>
                
                </CardContent>
            </Card>

        ))}
          
        </div>
      );
      
    }
  
    
  export default Home;

  