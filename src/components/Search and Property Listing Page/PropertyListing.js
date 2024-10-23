import React, { useState, useEffect } from 'react';
import './PropertyListing.css';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch properties from an API or database
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="property-listing-container">
      <h1>Property Listing</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.imageUrl} alt={property.title} />
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>location: {property.location}</p>
            <p>Price: {property.price}</p>
            <p>size: {property.size}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListing;