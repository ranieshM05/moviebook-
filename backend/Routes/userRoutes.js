const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { signup, login, getUserProfile, updateUserProfile } = require('../controller/userController');
const User = require('../Models/User');

const verifyToken = require('../middleware/auth');

router.get('/profile', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // assuming 'req.user.id' is decoded from the token
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ profile: user });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Route to update user profile
  router.put('/profile', verifyToken, async (req, res) => {
    try {
      const { name, email, details } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email, details },
        { new: true } // to return the updated user
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Profile updated successfully', profile: user });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
      
// User routes
router.post('/signup', signup);
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile); // Add this route for updating the profile

module.exports = router;
