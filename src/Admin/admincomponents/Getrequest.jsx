import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../utlis/constant';
import './GetRequest.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Getrequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${serverUrl}notif/allRequest`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
};
  return (
    <div className="request-container">
        <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
      <h1>Request Management</h1>
      <h2>All Requests</h2>
      {loading && <p className="loading-message">Loading requests...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && requests.length === 0 && <p>No requests available.</p>}
      <table className="request-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Payment Method</th>
            <th>Buyer ID</th>
            <th>Property ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.phone}</td>
              <td>{request.description}</td>
              <td>{request.paymentMethod}</td>
              <td>{request.buyerId}</td>
              <td>{request.propertyId}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Getrequest;
