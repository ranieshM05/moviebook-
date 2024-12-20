const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  details: {
    type: String,
    required: false, // Optional field
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming User model exists and is related to the profile
  },
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
