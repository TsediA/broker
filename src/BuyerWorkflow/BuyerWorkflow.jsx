import React, { useState } from 'react';
import './BuyerWorkflow.css';

const BuyerWorkflow = () => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notification, setNotification] = useState('');

  const handleSearch = () => {
    // Perform search logic using the entered location, price range, and property type
    console.log('Searching properties:', location, priceRange, propertyType);
  };

  const handleViewProperty = () => {
    // Fetch and display property details using the entered property ID
    console.log('Viewing property:', propertyId);
  };

  const handleContactSeller = () => {
    // Send message to the broker using the entered email and message
    console.log('Contacting seller:', sellerEmail, message);
    // Simulate a seller response
    setNotification('The seller has responded to your message.');
  }

  const handleNegotiatePrice = () => {
    // Submit the offer price to the seller or broker
    console.log('Negotiating price:', offerPrice);
    // Simulate a seller response
    setNotification('The seller has responded to your offer price.');
  };

  const handleScheduleInspection = () => {
    // Schedule the property inspection on the selected date
    console.log('Scheduling inspection:', inspectionDate);
    // Simulate a seller response
    setNotification('The seller has confirmed the inspection date.');
  };

  const handleFinalizePurchase = () => {
    // Complete the purchase process using the selected payment method
    console.log('Finalizing purchase:', paymentMethod);
    // Simulate a seller response
    setNotification('The purchase process has been finalized.');
  };

  return (
    <div className="container">
      <h1>Buyer's Workflow</h1>

      <div className="section">
        <h2>Search Properties</h2>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price-range">Price Range:</label>
          <input
            type="text"
            id="price-range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="Enter price range"
          />
        </div>
        <div className="form-group">
          <label htmlFor="property-type">Property Type:</label>
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Another</option>
            <option value="multi-family">Multi-Family Home</option>
            <option value="single-family">Single-Family Home</option>
            <option value="apartment">Apartment</option>
            <option value="condominium">Condominium</option>
            <option value="townhouse">Townhouse</option>
            <option value="farm">Farm</option>
          </select>
        </div>
        <button onClick={handleSearch}>Search Properties</button>
      </div>

      <div className="section">
        <h2>View Property</h2>
        <div className="form-group">
          <label htmlFor="property-id">Property ID:</label>
          <input
            type="text"
            id="property-id"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            placeholder="Enter property ID"
          />
        </div>
        <button onClick={handleViewProperty}>View Property</button>
      </div>

      <div className="section">
        <h2>Contact Seller</h2>
        <div className="form-group">
          <label htmlFor="seller-email">Seller Email:</label>
          <input
            type="email"
            id="seller-email"
            value={sellerEmail}
            onChange={(e) => setSellerEmail(e.target.value)}
            placeholder="Enter seller email"
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
            <option value="mortgage">Mortgage</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button onClick={handleContactSeller}>Communicate  Seller</button>
        <div className="section">
        <h2>Notification</h2>
        <div className="form-group">
          <label htmlFor="notification">Notification:</label>
          <textarea
            id="notification"
            value={notification}
            readOnly
            placeholder="Seller's response will be displayed here"
          ></textarea>
        </div>
        <button onClick={() => setNotification('')}>Clear Notification</button>
      </div>
</div>

 

     

      
    </div>
  );
};

export default BuyerWorkflow;