import React, { useState, useEffect } from 'react';
import './SearchBar.css';

// Remove loading and setLoading
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [countries, setCountries] = useState([]); // Keep only if you're using countries

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/countries.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filteredResults = countries.filter(country =>
      country.country.toLowerCase().includes(query.toLowerCase()) ||
      (country.capital && country.capital.toLowerCase().includes(query.toLowerCase()))
    );

    setResults(filteredResults);
  }, [query, countries]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
  
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a country or capital..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <ul className="search-results">
        {results.map((country, index) => (
          <li key={index} className="result-item">
            <strong>{country.country}</strong> - {country.capital || 'No capital'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
