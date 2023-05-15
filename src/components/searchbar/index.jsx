import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Search venues..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    );
}

export default SearchBar;