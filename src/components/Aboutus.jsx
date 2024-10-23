import React from 'react';
import './AboutUs.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="about-us">
            <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i> Go Back
            </div>
            <h1 className="about-us-title">About Us</h1>
            <p className="about-us-description">
                Welcome to Your Dream Home, your trusted partner in finding the perfect home. We are dedicated to providing exceptional service to both buyers and sellers in the real estate market. Our mission is to make the process of buying, selling, and renting properties as seamless and enjoyable as possible.
            </p>
            
            <h2 className="about-us-subtitle">Our Mission</h2>
            <p className="about-us-description">
                At House Broker Website, we believe that everyone deserves to find a home that fits their needs and lifestyle. Our team of experienced professionals is committed to delivering personalized solutions tailored to each client's unique requirements.
            </p>

            <h2 className="about-us-subtitle">What We Offer</h2>
            <ul className="about-us-list">
                <li>Comprehensive listings of homes for sale and rent.</li>
                <li>Expert advice on market trends and property values.</li>
                <li>Personalized support throughout the buying and selling process.</li>
                <li>Access to a network of trusted service providers for inspections, financing, and more.</li>
            </ul>

            <h2 className="about-us-subtitle">Rate Your Experience</h2>
            <p className="about-us-description">
                Your feedback is important to us! If you have used our services, we would love to hear your thoughts. Please take a moment to rate your experience on our website.
            </p>
            <a href="/Rate" className="rate-us-button">Rate Us</a> {/* Link to the rating page */}

            <h2 className="about-us-subtitle">Contact Us</h2>
            <p className="about-us-description">
                If you have any questions or need assistance, feel free to reach out to us at:
            </p>
            <p className="about-us-contact">
                Email: <a href="mailto:tsedenyayilma700@gmail.com">tsedenyayilma700@gmail.com</a><br />
                Phone: <a href="tel:+251985323212">+251985323212</a>
            </p>
        </div>
    );
};

export default AboutUs;