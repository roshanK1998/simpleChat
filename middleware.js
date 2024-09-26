const jwt = require('jsonwebtoken');

// Middleware to decode JWT and extract user ID
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Use the same secret from token generation
        console.log(decoded)
        req.userId = decoded.id; // Attach userId to the request object
        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = authenticateUser;
