import React from 'react';
import { Link } from 'react-router-dom';
import './SellerDashboard.css';

const SellerHome = () => {
  return (
    <div className="seller-home-container">
      <h1 className="seller-home-title">Seller Dashboard</h1>
      <div className="seller-home-cards-container">
        <div className="seller-home-card">
          <Link to="/AddAndPostProperty" className="seller-home-card-link">
            <div className="seller-home-card-content">
              <i className="fas fa-plus-circle seller-home-card-icon"></i>
              <h3 className="seller-home-card-title">Add and Post Property</h3>
              <p className="seller-home-card-description">List your property on the platform.</p>
            </div>
          </Link>
        </div>
        <div className="seller-home-card">
          <Link to="/ProfilePages" className="seller-home-card-link">
            <div className="seller-home-card-content">
              <i className="fas fa-user-circle seller-home-card-icon"></i>
              <h3 className="seller-home-card-title">My Profile Pages</h3>
              <p className="seller-home-card-description">View your profile and log out.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;