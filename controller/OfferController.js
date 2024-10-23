// controllers/offerController.js
const Property = require('../models/Property');
const Offer = require('../models/Offer');

// ...

exports.acceptOffer = async(req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        if (offer.status !== 'pending') {
            return res.status(400).json({ message: 'Offer is not in pending state' });
        }

        offer.status = 'accepted';
        await offer.save();

        const property = await Property.findById(offer.property);
        property.status = 'sold';
        await property.save();

        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.rejectOffer = async(req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        if (offer.status !== 'pending') {
            return res.status(400).json({ message: 'Offer is not in pending state' });
        }

        offer.status = 'rejected';
        await offer.save();

        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};