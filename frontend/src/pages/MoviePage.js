import React from "react";
import { useParams } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";

function MoviePage() {
  const { id } = useParams(); // Get movie ID from URL
  const { movies, loading, error } = useFetchMovies(); // Fetch movies from the Fandango API
  const movie = movies.find((m) => m.id === parseInt(id));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <img src={movie.poster_path} alt={movie.title} className="my-4" />
      <p>{movie.overview}</p>
    </div>
  );
}

export default MoviePage;
