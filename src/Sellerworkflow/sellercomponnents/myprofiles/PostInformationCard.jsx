import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../../utlis/constant';

const PostInformation = () => {
  const [propertyHistory, setPropertyHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPropertyHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get(`${serverUrl}Admin/propertyhistory`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the headers
          },
        });
        setPropertyHistory(response.data.propertyHistory); // Set property history from response
      } catch (err) {
        console.error('Error fetching property history:', err);
        setError('Failed to fetch property history. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPropertyHistory(); // Call the fetch function
  }, []);

  return (
    <div>
      <h1>Property History</h1>
      {loading && <p>Loading property history...</p>}
      {error && <p>{error}</p>}
      {propertyHistory.length === 0 && !loading && <p>No properties found for this seller.</p>}

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {propertyHistory.length > 0 ? (
              propertyHistory.map((property) => (
                <tr key={property._id}>
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>{property.price}</td>
                  <td>{property.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostInformation;