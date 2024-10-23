import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../../utlis/constant';
// import Pay from './payment'; // Ensure the import path is correct
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate(); // Get the navigate function

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [public_key, setpublic_key] = useState('');

  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePaymentProcessing = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Replace with your actual payment API URL
      const response = await axios.post(serverUrl + 'pay/pays', {
        firstName,
        lastName,
        phone,
        email,
        amount,
        public_key,
      });

      // Handle success and failure responses
      if (response.data.status === "success") {
        const checkOutURL = response.data.data.checkout_url;
        console.log(checkOutURL);
        // Navigate to the external checkout URL
        window.location.href = checkOutURL;  // Use window.location.href for external URLs
      } else {
        setError('Payment Failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('An error occurred while processing payment.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Optionally perform validation here
    if (!amount || !email || !phone || !firstName || !lastName) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    setPaymentInitiated(true);
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <h1>Initialize Payment</h1>
      {error && <div className="error-message">{error}</div>}
      
      {!paymentInitiated &&
        <form onSubmit={handlePayment} className="payment-form">
          <div className="form-group">
            <label>Amount (in ETB)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <button type="submit" onClick={handlePaymentProcessing} className="submit-button" disabled={loading}>
            Pay
          </button>
        </form>
      }
    </div>
  );
};

export default Payment;