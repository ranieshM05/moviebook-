import React from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieCard from "../components/Movies/MovieCard";

function Home() {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check if movies is an array and has length
  return (
    <div className="flex flex-wrap justify-center">
      {Array.isArray(movies) && movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <div>No movies found.</div>
      )}
    </div>
  );
}

export default Home;
