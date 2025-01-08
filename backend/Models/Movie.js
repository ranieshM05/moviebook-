const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: Date,
  genre: [String],
  rating: Number,
  // Add any other fields relevant to your movie data
});

module.exports = mongoose.model('Movie', movieSchema);
