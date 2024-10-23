import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css'; // Import your CSS file

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    setNotification('');

    try {
      const response = await axios.post('/api/create-payment', { amount });

      if (response.data && response.data.url) {
        // Redirect to Chapa payment page
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      setNotification('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-section">
      <h2>Make a Payment</h2>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with Chapa'}
        </button>
      </form>
    </div>
  );
};

export default Payment;