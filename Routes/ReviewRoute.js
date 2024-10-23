// your-app-file.js
const express = require('express');
const Review = require('../model/ReviewSchema'); // Correct the path as necessary
const router = express.Router();

// Endpoint to create a new review
router.post('/rating', async(req, res) => {
    const { rating, comment } = req.body;

    try {
        const newReview = new Review({
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Could not create review', error: error.message });
    }
});

// Get all ratings (reviews)
router.get('/ratings', async(req, res) => {
    try {
        const reviews = await Review.find(); // Fetch all reviews

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found' });
        }

        res.status(200).json(reviews); // Send the reviews as a response
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
});


module.exports = router;