// models/movieModel.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
