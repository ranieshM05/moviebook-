const express = require('express');
const { login, register, updateProfile } = require('../controllers/authController');
const multer = require('multer'); // For handling file uploads
const path = require('path');

// Initialize the router first
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  },
});

const upload = multer({ storage: storage }); // Initialize multer with storage configuration

// Login route
router.post('/login', login); // Use the controller function for login

// Authentication routes
router.post('/signup', register);

// Profile routes
router.put('/profile', upload.single('profilePic'), updateProfile); // Handle file upload and profile update

module.exports = router;
