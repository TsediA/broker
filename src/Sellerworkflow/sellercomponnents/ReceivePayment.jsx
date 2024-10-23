import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './ReceivePayment.css'; // Import CSS

const ReceivePayment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReceivePayment = async () => {
    setLoading(true);
    try {
      // API call to receive the payment
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* Payment data */ }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Display a success alert message
      alert('Payment received successfully!');
    } catch (error) {
      // Display an error alert message
      alert('Error receiving the payment. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="receive-payment-page">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> 
      </div>
      <h2 className="section-title">Receive Payment</h2>
      <button 
        className="primary-btn" 
        onClick={handleReceivePayment} 
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Receive Payment'}
      </button>
    </div>
  );
};

export default ReceivePayment;