import { useParams } from "react-router-dom";
import VenueBooking from "../../components/profile/user/VenueBooking";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useVenuePageStore } from "../../hooks/api";
import { useSingleAPI } from "../../hooks/useSingleApi";
import { baseURL } from "../../utilities/constants";

function VenuePage() {
  let params = useParams();
  const { data, isLoading, hasError } = useSingleAPI(`${baseURL}venues/${params.id}`, useVenuePageStore, [params.id]); 
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
              minHeight: 600,  
              m: "1rem"
            }}
          >
            <h2 key={data.id}>{data.name}</h2>
            {data && data.media && data.media.map((imageUrl, index) => (
              <CardMedia
                key={index}
                component="img"
                image={imageUrl}
                title={data.name}
                alt={data.name}
              />
            ))}
            <CardContent>      
                      
              <p>{data.price} Nok pr night</p>
              <p>{data.description}</p>

              <VenueBooking venueId={params.id} />  
            </CardContent>
          </Card>
        )}
      </>
    );
}

export default VenuePage;