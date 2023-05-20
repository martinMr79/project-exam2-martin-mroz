import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

const SearchBar = ({ data, isLoading, isError }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };

    useEffect(() => {
      if (!isLoading && data && data.length && searchTerm.length >= 2) {
        const results = data.filter((venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, [data, searchTerm, isLoading]);

    if (isError) {
      return <div>Error</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.6)', 
              padding: 5,
              paddingLeft: 20, 
              paddingRight: 20,
              borderRadius: 5,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <TextField
              type="text"
              placeholder="Search venues..."
              value={searchTerm}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                color: "black",
                backgroundColor: 'white',
                borderRadius: 5, 
                width: "100%"
              }}
            />
            {searchResults.length ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {searchResults.map((venue) => (
                  <li key={venue.id}>
                    <Link to={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      {venue.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm.length >= 2 && <div>No results found</div>
            )}
          </Box>
        </Grid>
      </Grid>
    );
}

export default SearchBar;