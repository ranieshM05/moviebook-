// Update User Profile Controller
const updateUserProfile = async (req, res) => {
    const { name, details, profilePic } = req.body;
    const userId = req.user.id; // Get the user ID from the JWT token

    try {
        // Find the user and update their data
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        user.name = name || user.name;
        user.details = details || user.details;
        user.profilePic = profilePic || user.profilePic; // Save the profile picture URL if any

        // Save the updated user data to the database
        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile' });
    }
};

module.exports = { signup, login, getUserProfile, updateUserProfile };
