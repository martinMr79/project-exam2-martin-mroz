import { useParams } from "react-router-dom";
import VenueBooking from "../../components/profile/user/VenueBooking";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
          <Typography variant="h2" key={data.id} sx={{ m: "1rem" }}>{data.name}</Typography>
          {data && data.media && data.media.map((imageUrl, index) => (
            <CardMedia
              key={index}
              component="img"
              image={imageUrl}
              title={data.name}
              alt={data.name}
              sx={{ 
                width: "600px",
                height: "600px",
                m: "1rem"
              }} 
          />

            ))}
            
            <CardContent>      
                      
              <p>{data.price} Nok pr night</p>
              <p>{data.description}</p>
              <h3>Facilities</h3>
              <hr />
              <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <p>Wifi: {data?.meta && data.meta.wifi.toString()}</p>
                <p>Breakfast: {data?.meta && data.meta.breakfast.toString()}</p>
                <p>Parking: {data?.meta && data.meta.parking.toString()}</p>
                <p>Pets: {data?.meta && data.meta.pets.toString()}</p>
              </Box>

              {console.log(data)}
              <VenueBooking venueId={params.id} />  
            </CardContent>
          </Card>
        )}
      </>
    );
}

export default VenuePage;


