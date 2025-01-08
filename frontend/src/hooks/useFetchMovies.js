import { useState, useEffect } from "react";

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=670580d0a7d823c15526bf772c04b9ee&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch from TMDb API");
        }

        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const saveMovieToBackend = async (movie) => {
    try {
      const backendResponse = await fetch('https://moviebook-2.onrender.com/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie }),
      });

      if (!backendResponse.ok) {
        throw new Error("Failed to save movie to backend");
      }

      const backendData = await backendResponse.json();
      if (backendData.success) {
        console.log("Movie successfully saved to the backend!");
      } else {
        console.error("Failed to save movie.");
      }
    } catch (err) {
      console.error("Error saving movie to backend:", err);
    }
  };

  return { movies, loading, error, saveMovieToBackend };
};

export default useFetchMovies;
