const express = require('express');
const http = require('http');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Import routes
const UserRoute = require('./Routes/UserRoute');
const PropertyRoute = require('./Routes/PropertyRoute');
const NotificationRoute = require('./Routes/NotificationRoute');
const ReviewRoute = require('./Routes/ReviewRoute');
const AdminRoute = require('./Routes/AdminRoute');
const transactionRoute = require('./Routes/transactionRoute');
const { initSocket } = require('./Socket');

// Create an Express app
const app = express();
const port = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/HouseBroker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Make sure this is before your routes
app.use(session({
    secret: 'your_secret_key', // Use a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Mount routes
app.use('/api/users', UserRoute);
app.use('/api/property', PropertyRoute);
app.use('/api/notif', NotificationRoute);
app.use('/api/review', ReviewRoute);
app.use('/api/useragents', UserRoute);
app.use('/api/pay', transactionRoute);
app.use('/api/verify', transactionRoute);
app.use('/api/Admin', AdminRoute);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});