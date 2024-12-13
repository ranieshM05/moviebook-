import { useState, useEffect } from "react";

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies from TMDb
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=670580d0a7d823c15526bf772c04b9ee&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch from TMDb API");
        }

        const data = await response.json();

        if (data.results) {
          setMovies(data.results);

          // Send movies to backend to save in the database
          const saveMoviesToBackend = async () => {
            const backendResponse = await fetch('http://localhost:3001/api/movies', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ movies: data.results }),
            });

            if (!backendResponse.ok) {
              throw new Error("Failed to save movies to backend");
            }

            const backendData = await backendResponse.json();
            if (backendData.success) {
              console.log("Movies successfully saved to the backend!");
            } else {
              console.error("Failed to save movies.");
            }
          };

          saveMoviesToBackend();
        }
      } catch (err) {
        console.error("Error fetching or saving movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;