import { useParams } from "react-router-dom";
import { useAPI } from "../../hooks/api";
import VenueBooking from "../../components/profile/user/VenueBooking";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useVenuePageStore } from "../../hooks/api";

function VenuePage() {
    let params = useParams();
    const { data, isLoading, hasError } = useAPI(`https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`, useVenuePageStore);
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (hasError) {
      return <div>Error</div>;
    }

    return (
      <>
        {data && (
          <Card
            sx={{ 
              maxWidth: 745,
              minHeight: 600  
            }}
          >
{data && data.media && data.media.map((imageUrl, index) => (
  <CardMedia
    key={index} // Use index as the key
    component="img"
    image={imageUrl}
    title={data.name}
    alt={data.name}
  />
))}
            <CardContent>      
              <h2 key={data.id}>{data.name}</h2>        
              <p>{data.price} Nok pr night</p>
              <p>{data.description}</p>
              
              <VenueBooking venueId={params.id} /> 
            </CardContent>
          </Card>
        )}
      </>
    );
          }

export default VenuePage