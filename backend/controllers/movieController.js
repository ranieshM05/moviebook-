const Movie = require("../Models/Movie");
const axios = require("axios");

// Fetch movies from Fandango API
const fetchMovies = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.fandango.com/some-movie-endpoint", {
      params: { apiKey: process.env.FANDANGO_API_KEY },
    });

    const movies = data.movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      imageUrl: movie.poster_url,
      releaseDate: movie.release_date,
      genre: movie.genre,
      rating: movie.rating,
    }));

    await Movie.deleteMany(); // Clear old data
    await Movie.insertMany(movies); // Save new data

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Get all movies from the database
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve movies" });
  }
};

module.exports = { fetchMovies, getMovies };
