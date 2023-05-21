import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from '@mui/system';
import { SearchBarWrapper } from './styled';

const ParentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '180px',
  width: '100%', // You may want to also set the width to 100% so it takes the full width of its parent.
});

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
      <ParentContainer>
        <SearchBarWrapper>
    <Box
      sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        px: "3rem",
        py: "2rem",
        borderRadius: 5,
        width: '100%',  
        maxWidth: '40rem'
      }}
    >
      <TextField
        type="text"
        placeholder="Search venues"
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
          </SearchBarWrapper>
      </ParentContainer>
    );
  }
  
export default SearchBar;