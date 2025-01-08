const Movie = require('../Models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie' });
  }
};
