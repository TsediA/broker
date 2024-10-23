import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../utlis/constant';
import './MatchesManagement.css';
const MatchesManagement = () => {
  const [properties, setProperties] = useState([]);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
    fetchMatches();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(serverUrl + 'Admin/all');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await axios.get(serverUrl + 'Admin/all'); // Placeholder for matches API
      setMatches(response.data); // Assuming the matches data structure matches your requirements
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  // const handleDeleteProperty = async (propertyId) => {
  //   try {
  //     // Get the token from local storage (or any other secure storage method)
  //     const token = localStorage.getItem('token'); // Ensure you have the token stored in localStorage

  //     // Make a DELETE request to the backend API
  //     await axios.delete( `${serverUrl}Admin/properties/${propertyId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //       },
  //     });

  //     // Remove the deleted property from state
  //     setProperties(properties.filter(property => property.id !== propertyId));
  //   } catch (error) {
  //     console.error('Error deleting property:', error);
  //   }
  // };

  const handleMatchMaking = () => {
    console.log('Generating new matches...');
  };

  const handleMatchUpdate = (matchId, newStatus) => {
    console.log(`Updating match ${matchId} status to ${newStatus}`);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div>
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <h1>Matches Management</h1>
      <div>
        <h2>Properties</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>${property.price}</td>
                <td>{property.bedrooms}</td>
                <td>{property.bathrooms}</td>
                <td>{property.location}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchesManagement;