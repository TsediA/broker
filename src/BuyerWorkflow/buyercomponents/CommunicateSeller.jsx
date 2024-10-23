import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './CommunicateSeller.css'; // Import CSS

const CommunicateSeller = () => {
  const [sellerUsername, setSellerUsername] = useState('');
  const [message, setMessage] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleContactSeller = async () => {
    try {
      const response = await axios.post('/api/send-message', {
        sellerUsername,
        message,
        offerPrice,
        inspectionDate,
        paymentMethod,
      });

      if (response.data.success) {
        setNotification('Message sent to the seller successfully.');
      } else {
        setNotification('Failed to send the message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setNotification('Error sending message. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="section">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <h2>Contact Seller</h2>
      
      {notification && <div className="notification">{notification}</div>}

      <div className="form-group">
        <label htmlFor="seller-username">Seller Username:</label>
        <input
          type="text"
          id="seller-username"
          value={sellerUsername}
          onChange={(e) => setSellerUsername(e.target.value)}
          placeholder="Enter seller username"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="offer-price">Offer Price:</label>
        <input
          type="number"
          id="offer-price"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          placeholder="Enter your offer price"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="inspection-date">Inspection Date:</label>
        <input
          type="date"
          id="inspection-date"
          value={inspectionDate}
          onChange={(e) => setInspectionDate(e.target.value)}
        />
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
          <option value="Chapa">Chapa</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <button onClick={handleContactSeller}>Send to Seller</button>
    </div>
  );
};

export default CommunicateSeller;