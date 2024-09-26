const pool = require('../config/db');

const bookings = (bookingData) => {
    const { name, location, tifin_type } = bookingData;
    const query = 'INSERT INTO bookingdetails (name, location, tifin_type) VALUES(?, ?, ?)';

    return new Promise((resolve, reject) => {
        pool.query(query, [name, location, tifin_type], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    bookings
};
