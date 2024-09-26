const pool = require('../config/db'); // Make sure this is your DB connection file

//signup
const userModel = {
    findUserByEmail: (email, callback) => {
        const query = `SELECT id, email, password FROM signup WHERE email = ?`;
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length > 0) {
                return callback(null, results[0]);
            } else {
                return callback(null, null);
            }
        });
    },

    // Add new user to the database
    addUser: (userData, callback) => {
        const query = `INSERT INTO signup (name, email, password) VALUES (?, ?, ?)`;
        const values = [userData.name, userData.email, userData.password];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
    }
};




 // Function to add a user
const addUser = (userData, callback) => {
    const {email, password ,name} = userData;
    const query = 'INSERT INTO users (email, password,name) VALUES (?, ?,?)';

    pool.query(query, [ email, password,name], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Function to find a user by email
const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';

    pool.query(query, [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};




module.exports = {
    addUser,
    findUserByEmail,
};
