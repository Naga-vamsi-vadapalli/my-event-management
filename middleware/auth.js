const jwt = require('../config/jwt');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const userId = jwt.verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = await User.findById(userId);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = auth;
