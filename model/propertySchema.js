const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    phone: {
        type: String,
        required: true
    },
    rent: { type: Boolean, required: true },
    buy: { type: Boolean, required: true },
    images: [{ type: String }], // Array of image URLs or filenames
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Reference to seller
    status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
    createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;