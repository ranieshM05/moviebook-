// src/components/MoviesList.js
import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';

const MoviesList = () => {
  const API_URL = `http://localhost:3001/api/movies`; // Make sure this is your API endpoint
  const { movies, error, loading } = useFetchMovies(API_URL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li> // Adjust according to your movie object's structure
      ))}
    </ul>
  );
};

export default MoviesList;
