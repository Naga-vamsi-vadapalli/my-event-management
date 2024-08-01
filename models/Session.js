// models/Session.js
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  logoutAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Session', SessionSchema);
