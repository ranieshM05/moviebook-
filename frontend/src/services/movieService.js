const API_URL = "https://moviebook-2.onrender.com/api/movies/popular"; // Updated URL to include '/popular'

const movieService = {
  getMovies: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) { // Check if the response is not OK
      throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error with status
    }
    return await response.json();
  },
  getMovieById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  },
};

export default movieService;
