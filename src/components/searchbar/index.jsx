import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from '@mui/system';
import { SearchContainer, StyledResults } from './styled';
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
      <SearchContainer>
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
              borderRadius: 2,
              maxWidth: "100%",
              width: "100%",
              '@media (min-width: 700px)': {
                width: '27rem',
              },
            }}
          />
          {searchResults.length ? (
  <StyledResults>
  <ul>
    {searchResults
      .filter((venue) => venue.media && venue.media.length > 0) 
      .map((venue) => (
        <Link to={`/venues/${venue.id}`} >    
        <li key={venue.id}>
          <div>
            <img src={venue.media[0]} alt={`${venue.name}`} />
            {venue.name} {venue.price} Nok
          </div>
        </li>
        </Link>
      ))}
  </ul>
</StyledResults>
          ) : (
            searchTerm.length >= 2 && <div>No results found</div>
          )}
        </Box>
        </SearchContainer>
    </ParentContainer>
  );
}

export default SearchBar;