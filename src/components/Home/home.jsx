import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { imageUrl, serverUrl } from '../../utlis/constant';
import Cookies from 'js-cookie'; // Import js-cookie

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [buyerDescription, setBuyerDescription] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notification, setNotification] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                
                const response = await axios.get(serverUrl + 'property/all');
                setProperties(response.data);
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
        // Clear the form when closing modal
        setBuyerName('');
        setBuyerPhone('');
        setBuyerDescription('');
        setPaymentMethod('');
    };

    const handleSendRequest = async () => {
        const requestData = {
            name: buyerName,
            phone: buyerPhone,
            description: buyerDescription,
            paymentMethod,
            propertyId: Cookies.get('propertyId'), // Include property ID in the request
            sellerId: selectedProperty.sellerId, // Include seller ID
            userId: Cookies.get('userId'),
            email: buyerEmail,
        };
        console.log(requestData);

        try {
            await axios.post(
                serverUrl + 'notif/sendRequest',
                requestData,
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("token")}`, // replace yourToken with the actual token
                    },
                }
            );
            console.log('Request sent:', requestData);
            setNotification('Your request has been sent to the seller.');

            // Clear fields after sending
            setBuyerName('');
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
        <div className="home-page-container">
            <div className="background-image"></div>
            <div className="content">
                <h1>Discover Your Dream Home with House Broker</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="property-section">
                    <h2>Available Properties</h2>
                    <div className="property-list">
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <div key={property.id} className="property-card">
                                    <h3>{property.title}</h3>
                                    <p>{property.description}</p>
                                    <p>Price: {property.price}</p>
                                    <p>Bedrooms: {property.Bedrooms}</p>
                                    <p>Bathrooms: {property.bathrooms}</p>

                                    {/* Make the phone number clickable */}
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
                                <img key={img} src={`${serverUrl}property/uploads/${img}`} alt={`Selected property image`} className="property-image" />
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
                                    <option value="Cash">Cash</option>
                                    <option value="Chapa">Chapa</option>
                                    <option value="Other">Other</option>
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
        </div>
    );
};

export default HomePage;
