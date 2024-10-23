import React, { useState, useEffect } from 'react';
import './sellerworkflow.css';
import axios from 'axios';

const SellerWorkflow = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqm: '',
    images: [],
    type: 'Rent',
    propertyType: 'Single-Family Home',

  });

  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [responseRequests, setResponseRequests] = useState([]);
  useEffect(() => {
    fetchNotifications();
    fetchResponseRequests();
  }, []);

  const handleListProperty = async () => {
    try {
      const response = await axios.post('/api/properties', propertyDetails);
      console.log('Property listed:', response.data);
    } catch (error) {
      console.error('Error listing property:', error);
    }
  };

  
  const handleReceiveOffers = async () => {
    try {
      const response = await axios.get('/api/offers');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      alert('Failed to fetch offers. Please try again later.');
    }
  };

  const handleNegotiateOffer = async () => {
    try {
      await axios.post('/api/negotiate-offer', selectedOffer);
      setSelectedOffer(null);
      alert('Offer negotiation started!');
    } catch (error) {
      console.error('Error negotiating offer:', error);
      alert('Failed to start offer negotiation. Please try again later.');
    }
  };

  const handleAcceptRejectOffer = (offer, action) => {
    console.log(`${action} offer:`, offer);
  };

  const handlePropertyHandover = () => {
    console.log('Completing transaction');
  };

  const handleReceivePayment = () => {
    console.log('Received payment');
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    setPropertyDetails({ ...propertyDetails, images: [...propertyDetails.images, ...Array.from(files)] });
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyDetails({ ...propertyDetails, type: event.target.value });
  };
  const handlePropertyTypeSelect = (event) => {
    setPropertyDetails({ ...propertyDetails, propertyType: event.target.value });
  };
  const handleViewNotifications = () => {
    // Fetch notifications from the server and update the state
    fetchNotifications();
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      alert('Failed to fetch notifications. Please try again later.');
    }
  };
  const fetchResponseRequests = async () => {
    try {
      const response = await axios.get('/api/response-requests');
      setResponseRequests(response.data);
    } catch (error) {
      console.error('Error fetching response requests:', error);
      alert('Failed to fetch response requests. Please try again later.');
    }
  };

  const handleResponseRequest = async (request, action) => {
    try {
      await axios.post('/api/response-requests', { requestId: request.id, action });
      fetchResponseRequests();
    } catch (error) {
      console.error(`Error ${action} response request:`, error);
      alert(`Failed to ${action} response request. Please try again later.`);
    }
  };

  return (
    <div className="seller-workflow-container">
      <h1 className="page-title">Seller's Workflow</h1>

      <div className="page">
        <h2 className="section-title">List Property</h2>
        <div className="form-field">
          <label>Property Type:</label>
          <select
            value={propertyDetails.propertyType}
            onChange={handlePropertyTypeSelect}
          >
            <option value="Multi-Family Home">Multi-Family Home</option>
            <option value="Single-Family Home">Single-Family Home</option>
            <option value="Apartment">Apartment</option>
            <option value="Condominium">Condominium</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Farm">Farm</option>
          </select>
        </div>
        <div className="form-field">
          <input
            type="text"
            placeholder="Property Title"
            value={propertyDetails.title}
            onChange={(e) => setPropertyDetails({ ...propertyDetails, title: e.target.value })}
          />
        </div>
        <div className="form-field">
          <textarea
            placeholder="Property Description"
            value={propertyDetails.description}
            onChange={(e) => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
          ></textarea>
        </div>
        <div className="form-field">
          <input
            type="number"
            placeholder="Property Price"
            value={propertyDetails.price}
            onChange={(e) => setPropertyDetails({ ...propertyDetails, price: Number(e.target.value) })}
          />
        </div>
        <div className="form-field">
          <input
            type="number"
            placeholder="Number of Bedrooms"
            value={propertyDetails.bedrooms}
            onChange={(e) => setPropertyDetails({ ...propertyDetails, bedrooms: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Number of Bathrooms"
            value={propertyDetails.bathrooms}
            onChange={(e) => setPropertyDetails({ ...propertyDetails, bathrooms: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Property Size (sqm)"
            value={propertyDetails.sqm}
            onChange={(e) => setPropertyDetails({ ...propertyDetails, sqm: Number(e.target.value) })}
          />
        </div>
        <div className="form-field">
          <label>
            <input
              type="radio"
              name="propertyType"
              value="Rent"
              checked={propertyDetails.type === 'Rent'}
              onChange={handlePropertyTypeChange}
            />
            Rent
          </label>
          <label>
            <input
              type="radio"
              name="propertyType"
              value="Buy"
              checked={propertyDetails.type === 'Buy'}
              onChange={handlePropertyTypeChange}
            />
            Buy
          </label>
        </div>
        <div className="form-field">
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        <button className="primary-btn" onClick={handleListProperty}>Add and Post Property</button>
      </div>

      {selectedOffer && (
        <div className="page">
          <h2 className="section-title">Negotiate Price</h2>
          <p>Offer: {selectedOffer.price}</p>
          <button className="primary-btn" onClick={handleNegotiateOffer}>Negotiate Price</button>
        </div>
      )}

      
      <div className="page">
        <h2 className="section-title">Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            <p>{notification.message}</p>
          </div>
        ))}
        <button className="primary-btn" onClick={handleViewNotifications}>
          View Notifications
        </button>
      </div>
      
      <div className="page">
        <h2 className="section-title">Response Requests</h2>
        {responseRequests.map((request, index) => (
          <div key={index} className="response-request">
            <p>{request.message}</p>
            <div className="response-actions">
              <button
                className="primary-btn"
                onClick={() => handleResponseRequest(request, 'Accept')}
              >
                Accept
              </button>
              <button
                className="secondary-btn"
                onClick={() => handleResponseRequest(request, 'Reject')}
              >
                Reject
              </button>
              <button
                className="info-btn"
                onClick={() => handleResponseRequest(request, 'View')}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="page">
        <h2 className="section-title">Receive Payment</h2>
        <button className="primary-btn" onClick={handleReceivePayment}>View Payment</button>
      </div>
    </div>
    
  );
};

export default SellerWorkflow;