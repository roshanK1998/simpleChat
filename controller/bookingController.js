const bookingModel = require('../model/bookingModel');

const bookings = async (req, res) => {
    const bookingData = req.body;

    // Validate input
    if (!bookingData.name || !bookingData.location || !bookingData.tifin_type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await bookingModel.bookings(bookingData);
        res.status(201).json({
            message: 'Booking received successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

module.exports = {
    bookings
};
