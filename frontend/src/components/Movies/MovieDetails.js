import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`/api/movies/${id}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold">{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
      <p className="mt-4">{movie.overview}</p>
      <button className="mt-4 bg-blue-500 text-white p-2 rounded">
        Book Tickets
      </button>
    </div>
  );
}

export default MovieDetails;
