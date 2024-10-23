import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../utlis/constant';
import './rent.css';
import Cookies from 'js-cookie'; // Import js-cookie


const Rent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerDescription, setBuyerDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(serverUrl + 'property/propertytype/rent');
        setProperties(response.data);
        // Adjust API endpoint       
       
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  const handleMoreDetails = (property) => {
    setSelectedProperty(property);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setBuyerName('');
    setBuyerPhone('');
    setBuyerDescription('');
    setPaymentMethod('');
  };

  const handleSendRequest = async () => {
    const requestData = {
      name: buyerName,
      email: buyerEmail,
      phone: buyerPhone,
      description: buyerDescription,
      paymentMethod,
      propertyId: Cookies.get('propertyId'), // Include property ID in the request
      sellerId: selectedProperty.sellerId,
      userId: Cookies.get('userId'),

    };
    console.log(requestData);


    try {
      await axios.post(serverUrl + 'notif/sendRequest',
         requestData,
         {
          headers: {
              'Authorization': `Bearer ${Cookies.get("token")}`, // replace yourToken with the actual token
          },
      }
        ); // Adjust API endpoint
      console.log('Request sent:', requestData);
      setNotification('Your request has been sent to the seller.');
      // Clear fields after sending
      setBuyerName('');
      setBuyerEmail('');
      setBuyerPhone('');
      setBuyerDescription('');
      setPaymentMethod('');
    } catch (error) {
      console.error('Error sending request:', error);
      setNotification('Error sending request.');
    }
    
  };

  if (loading) {
    return <div className="loading">Loading properties...</div>;
  }

  return (
    <div className="buyer-workflow-container">
      <h1 className="page-title">rent House List</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="propertyrent-section">
        <h2>Available Properties</h2>
        <div className="propertyrent-list">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="property-card">
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p>Price: {property.price}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>
                                        Contact me: 
                                        <a href={`tel:${property.phone}`} className="phone-link">
                                            {property.phone}
                                        </a>
                                    </p>
                {property.images && property.images.length > 0 && (
                  <img 
                    src={`${serverUrl}property/uploads/${property.images[0]}`} 
                    alt={`${property.title} image`} 
                    className="property-images" 
                  />
                )}
                <button onClick={() => handleMoreDetails(property)}>More Details</button>
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>

      {selectedProperty && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.description}</p>
            <p>Price: {selectedProperty.price}</p>
            <p>Bedrooms: {selectedProperty.bedrooms}</p>
            <p>Bathrooms: {selectedProperty.bathrooms}</p>
            <p>Location: {selectedProperty.location}</p>

            {selectedProperty.images && selectedProperty.images.map((img) => (
              <img 
                key={img} 
                src={`${serverUrl}property/uploads/${img}`} 
                alt={`Selected property image`} 
                className="propertyrent-images" 
              />
            ))}

            <h3>Chat with Seller</h3>
            <div className="form-group">
              <label htmlFor="buyer-name">Your Name:</label>
              <input
                type="text"
                id="buyer-name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyer-email">Your Email:</label>
              <input
                type="email"
                id="buyer-email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyer-phone">Your Phone:</label>
              <input
                type="tel"
                id="buyer-phone"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="buyer-description">Description:</label>
              <textarea
                id="buyer-description"
                value={buyerDescription}
                onChange={(e) => setBuyerDescription(e.target.value)}
                placeholder="Enter your message or request"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="payment-method">Payment Method:</label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="mortgage">Mortgage</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button className="primary-btn" onClick={handleSendRequest}>Send Request</button>
          </div>
        </div>
      )}

      {notification && (
        <div className="notification">
          <p>{notification}</p>
          <button className="clear-btn" onClick={() => setNotification('')}>Clear Notification</button>
        </div>
      )}
    </div>
  );
};
export default Rent;