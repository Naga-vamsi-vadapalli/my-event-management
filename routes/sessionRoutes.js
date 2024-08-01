// routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');

// GET /api/sessions
router.get('/', auth, sessionController.getSessions);

module.exports = router;
