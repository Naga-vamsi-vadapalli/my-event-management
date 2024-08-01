const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

// POST /api/events
router.post('/', auth, eventController.createEvent);

// GET /api/events
router.get('/', auth, eventController.getEvents);

// PUT /api/events/:id
router.put('/:id', auth, eventController.updateEvent);

// DELETE /api/events/:id
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router;
