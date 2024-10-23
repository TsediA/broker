import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import './ViewProperty.css'; // Import CSS

const ViewProperty = () => {
  const [propertyId, setPropertyId] = useState('');
  const navigate = useNavigate();

  const handleViewProperty = () => {
    // Fetch and display property details using the entered property ID
    console.log('Viewing property:', propertyId);
    // Here you would typically make an API call to fetch property data
    alert(`Fetching details for property ID: ${propertyId}`);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="view-property-container">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> 
      </div>
      <h2>View Property</h2>
      <div className="form-group">
        <label htmlFor="property-id">Property ID:</label>
        <input
          type="text"
          id="property-id"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          placeholder="Enter property ID"
        />
      </div>
      <button className="primary-btn" onClick={handleViewProperty}>
        <i className="fas fa-eye"></i> View Property
      </button>
    </div>
  );
};

export default ViewProperty;