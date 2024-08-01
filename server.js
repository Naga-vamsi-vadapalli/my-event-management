const express = require('express');
const connectDB = require('./config/db');
const requestIp = require('request-ip');
require('dotenv').config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Add request-ip middleware
app.use(requestIp.mw());

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
