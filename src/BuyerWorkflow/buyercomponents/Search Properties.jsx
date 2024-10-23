import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import './SearchProperties.css'; // Import CSS
import { serverUrl } from '../../utlis/constant';

const SearchProperties = () => {
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${serverUrl}property/search?location=${location}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="search-properties-container">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> 
      </div>
      <h2>Search Properties</h2>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
      </div>
      
      <button className="primary-btn" onClick={handleSearch}>
        <i className="fas fa-search"></i> Search Properties
      </button>

      {loading && <p>Loading results...</p>}
      {error && <p className="error-message">{error}</p>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <div className="results-list">
            {searchResults.map((property) => (
              <div key={property.id} className="result-card">
                <h4>{property.title}</h4>
                <p>Description: {property.description}</p>
                <p>Price: ${property.price.toLocaleString()}</p>
                <p>Location: {property.location}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                {property.images && property.images.length > 0 && (
                  <img 
                    src={`${serverUrl}property/uploads/${property.images[0]}`} 
                    alt={`${property.title} image`} 
                    className="property-image" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProperties;