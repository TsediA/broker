import React, { useState } from 'react';
import './Rate.css'; // Optional: For custom styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { serverUrl } from '../utlis/constant';
const Rate = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const url = serverUrl + 'review/rating'; // Ensure this is correct
          const body = { rating, comment };

            // Sending data to the backend API
            const response = await axios.post(url, body);
            console.log('Response from server:', response.data);

            setSubmitted(true);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error submitting rating:', error);
            setError('There was an error submitting your feedback. Please try again.');
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="rate">
            <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
            <h1>Rate Your Experience</h1>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        className={`star ${value <= rating ? 'filled' : ''}`}
                        onClick={() => handleRatingClick(value)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                    rows="4"
                />
                <button type="submit" disabled={rating === 0}>
                    Submit Rating
                </button>
            </form>
            {submitted && <p className="thank-you">Thank you for your feedback!</p>}
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </div>
    );
};

export default Rate;