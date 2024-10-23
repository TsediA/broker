import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BuyerHistoryCard.css'; // Import CSS for styling
import { serverUrl } from '../../../utlis/constant';

const BuyerHistoryCard = ({ propertyId }) => {
  const [buyerHistory, setBuyerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuyerHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get(serverUrl+ `Admin/buyerHistory`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the headers
          },
        });
        setBuyerHistory(response.data);
      } catch (err) {
        console.error('Error fetching buyer history:', err);
        setError('Failed to fetch buyer history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerHistory();
  }, [propertyId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-profile-card">
      <div className="back-btn" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <Link to="/BuyerHistory" className="my-profile-card-link">
        <div className="my-profile-card-content">
          <i className="fas fa-history my-profile-card-icon"></i>
          <h3 className="my-profile-card-title">Buyer History</h3>
          <p className="my-profile-card-description">View your buyer history and transactions.</p>
        </div>
      </Link>

      {loading && <p className="loading-message">Loading buyer history...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && buyerHistory.length === 0 && <p>No buyer history available for this property.</p>}

      <div className="buyer-history-list">
        {buyerHistory.map((buyer) => (
          <div className="buyer-history-item" key={buyer.id}>
            <h4>{buyer.buyerName}</h4>
            <p>Purchase Price: {buyer.purchasePrice}</p>
            <p>Location: {buyer.propertyLocation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerHistoryCard;