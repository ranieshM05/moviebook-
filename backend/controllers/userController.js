const User = require('../models/User');
const generateToken = require('../utils/generateToken'); // A utility function to generate JWT tokens
const bcrypt = require('bcryptjs'); // Ensure bcrypt is installed

// Signup Controller
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate a token
        const token = generateToken(user._id); // Ensure you have this function defined

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token, // Send the token back to the client
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token, // Send the token back to the client
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
};

// Get User Profile Controller
const getUserProfile = async (req, res) => {
    try {
        // Get the user ID from the request (attached by authMiddleware)
        const userId = req.user.id; // Ensure this is set by your authMiddleware

        // Find the user by ID
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

module.exports = { signup, login, getUserProfile };
