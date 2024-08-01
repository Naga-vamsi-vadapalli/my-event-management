// routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// GET /api/weather/:location
router.get('/:location', weatherController.getWeather);

module.exports = router;
