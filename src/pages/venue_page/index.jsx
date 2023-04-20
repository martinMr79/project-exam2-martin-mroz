import { useParams } from "react-router-dom";
import { useAPI } from "../../hooks/api";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function VenuePage() {
    let params = useParams();
    const { data, isLoading, hasError } = useAPI(`https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`);
    console.log(data)
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (hasError) {
      return <div>Error</div>;
    }
    console.log(data); 

    return (
      <>
        {data && (
          <Card
            sx={{ 
              maxWidth: 745,
              minHeight: 600  
            }}
          >
            <CardMedia
              component="img"
              image={data.media}
              title={data.name}
              alt={data.name}
            />
            <CardContent>      
              <h2 key={data.id}>{data.name}</h2>        
              <p>{data.price} Nok pr night</p>
              <p>{data.description}</p>
             
            </CardContent>
          </Card>
        )}
      </>
    );
          }

export default VenuePage