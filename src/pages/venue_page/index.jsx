import React from 'react';
import { useParams } from "react-router-dom";
import VenueBooking from "../../components/profile/user/VenueBooking";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useVenuePageStore } from "../../hooks/api";
import { useSingleAPI } from "../../hooks/useSingleApi";
import { baseURL } from "../../utilities/constants";
import Grid from '@mui/material/Grid';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function VenuePage() {
  let params = useParams();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const { data = {media: []}, isLoading, hasError } = useSingleAPI(`${baseURL}venues/${params.id}`, useVenuePageStore, [params.id]); 

  const maxSteps = data?.media?.length || 0;

  const handleNext = () => {
    if (activeStep < maxSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error</div>;
  }
  
  return (
    <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" flexWrap="wrap">
      
      <Grid item xs={12} sm={6} md={6}>
        {data && (
          <Card
            sx={{ 
              maxWidth: 645,
              minHeight: 600,  
              m: "1rem",
              boxShadow: 'none',
            }}
          >
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h3" key={data.id} sx={{ m: "1rem", marginBottom: "2rem" }}>{data.name}</Typography>
            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
              <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
              {data?.media?.length > 0 ? data.media.map((image, index) => (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 355,
                        display: 'block',
                        maxWidth: 400,
                        overflow: 'hidden',
                        width: '100%',
                        margin: '0 auto'
                      }}
                      src={image}
                      alt={data.name}
                    />
                  ) : null}
                </div>
              )) : <Typography>No media available</Typography>}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Back
                  </Button>
                }
              />
              <CardContent>      
                <Box display="flex" flexDirection="row" justifyContent="space-around">
                  <p>{data.maxGuests} Guests</p>
                  {data?.location?.city && <p>City: {data.location.city}</p>}
                  {data?.location?.country && <p>Country: {data.location.country}</p>}
                </Box>
                <hr />
                <p>{data.description}</p>
                <h3>Facilities</h3>
                <hr />
                <Box display="flex" flexDirection="row" justifyContent="space-around">
                  <p>Wifi: {data?.meta?.wifi?.toString()}</p>
                  <p>Breakfast: {data?.meta?.breakfast?.toString()}</p>
                  <p>Parking: {data?.meta?.parking?.toString()}</p>
                  <p>Pets: {data?.meta?.pets?.toString()}</p>
                </Box>
              </CardContent>
            </Box>
          </Box> 
          </Card>
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
       <VenueBooking venueId={params.id} data={data} />
      </Grid>
    </Grid>
  );
  
    }
    
    export default VenuePage;
              
               








