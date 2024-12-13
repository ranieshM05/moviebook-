// Routes/movieRoutes.js
const express = require("express");
const Movie = require("../Models/Movie");  // Ensure this import is correct
const router = express.Router();

// POST request to save movies
router.post("/", async (req, res) => {
  try {
    const movies = req.body.movies;

    // Save each movie to the database
    const savedMovies = await Movie.insertMany(movies);

    res.json({ success: true, data: savedMovies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to save movies", error: error.message });
  }
});

module.exports = router;
