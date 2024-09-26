const userModel = require('../model/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for user signup
const signup = (req, res) => {
    const { name, email, password, confirm_password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !confirm_password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if password and confirm password match
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user already exists by email
    userModel.findUserByEmail(email, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to check user' });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }

            // Create a new user object with the hashed password
            const newUser = { name, email, password: password};

            // Add the new user to the database
            userModel.addUser(newUser, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Failed to add user' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
};



// Controller for user login
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

     // Find the user by email
     userModel.findUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to check user' });
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            console.log("from user pss ",  user.password)
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generate JWT token for the user
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send the token and user information as response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email
            }

        });
    });
};

module.exports = {
    signup,
    login,
    
};
