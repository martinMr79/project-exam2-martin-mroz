const ViewBookings = ({ bookings }) => {
    return (
      <div>
        <h2>Your Bookings:</h2>
        {bookings.map((booking) => {
          const fromDate = new Date(booking.dateFrom);
          const toDate = new Date(booking.dateTo);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
          return (
            <div key={booking.id}>
              <h3>{booking.venue.name}</h3>
              <img src= {booking.venue.media} 
                  alt={booking.venue.name} 
                  style={{ width: "250px", marginBottom: "10px" }}/>
                <p>
                Check in: 15:00 {fromDate.toLocaleDateString(undefined, options)}</p> 
                <p>check out: {toDate.toLocaleDateString(undefined, options)}</p>
                <p>Guests:{booking.guests}</p> 
            </div>
          )
        })}
      </div>
    );
  };
  
export default ViewBookings;