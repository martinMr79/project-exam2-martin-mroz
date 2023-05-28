import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from '@mui/system';
import { SearchBarWrapper } from './styled';
import { useHomeStore } from '../../hooks/api'; 
import { baseURL } from '../../utilities/constants';

const ParentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '180px',
  width: '60rem', 
});

const SearchBar = () => {
  const { data, isLoading, isError, fetchData } = useHomeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchData(`${baseURL}venues`, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              maxWidth: "100%", 
              width: "100%", 
              '@media (min-width: 700px)': { 
                width: '30rem', 
              },
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