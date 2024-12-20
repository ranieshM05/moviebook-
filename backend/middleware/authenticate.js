const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // User model to verify user existence

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;  // Attach user to request object
      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};

module.exports = authenticate;
