import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";

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
      <div>
     <TextField
        type="text"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
      />
        {searchResults.length ? (
          <ul>
            {searchResults.map((venue) => (
              <li key={venue.id}>
                {venue.name}
              </li>
            ))}
          </ul>
        ) : (
          searchTerm.length >= 2 && <div>No results found</div>
        )}
      </div>
    );
}

export default SearchBar;