import { Container, CardContainer } from "../styled"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const ViewBookings = ({ bookings }) => {
    return (
        <Container>
            <h2>Your Bookings:</h2>
            <CardContainer>
                {bookings.map((booking) => {
                    const fromDate = new Date(booking.dateFrom);
                    const toDate = new Date(booking.dateTo);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };

                    return (
                        <Card 
                            key={booking.id}
                            sx={{ 
                                maxWidth: 345,
                                minHeight: 600,
                                marginTop: "2rem"    
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={booking.venue.media[0]}
                                title={booking.venue.name}
                                alt={booking.venue.name}
                                sx={{
                                    height: '300px',
                                    width: '300px',
                                    objectFit: 'cover',
                                    m: '1.5rem'
                                }}
                            />
                            <CardContent>
                                <h3>{booking.venue.name}</h3>
                                <p>
                                    Check in: 15:00 {fromDate.toLocaleDateString(undefined, options)}
                                </p> 
                                <p>
                                    Check out: {toDate.toLocaleDateString(undefined, options)}
                                </p>
                                <p>Guests: {booking.guests}</p> 
                            </CardContent>
                        </Card>
                    )
                })}
            </CardContainer>
        </Container>
    );
};

export default ViewBookings;