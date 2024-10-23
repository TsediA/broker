const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Your secret key (should be stored securely, like in environment variables)
const SECRET_KEY = 'your_secret_key';

// Middleware function to verify the JWT token from the cookie
const verifyToken = (req, res, next) => {
    try {
        // Extract cookies
        const cookies = req.cookies;

        // Check if token exists in the cookies (assuming the token is stored in 'authToken' cookie)
        const token = cookies.authToken;

        if (!token) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token.' });
            }

            // Token is valid, attach the decoded user info to req
            req.user = decoded; // assuming the token contains the user ID and other info

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = verifyToken;