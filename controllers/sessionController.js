// controllers/sessionController.js
const Session = require('../models/Session');
const User = require('../models/User');

exports.getSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.find({ user: userId });
    res.status(200).json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
};
