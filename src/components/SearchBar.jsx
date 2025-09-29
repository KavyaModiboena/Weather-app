
import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, onSearch }) => (
  <form onSubmit={e => { e.preventDefault(); onSearch(); }} className="search-bar">
    <input
      type="text"
      placeholder="Enter city name"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="search-input"
    />
    <button type="submit" className="search-button">Search</button>
  </form>
);

export default SearchBar;
