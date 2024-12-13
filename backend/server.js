const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const moviesRoutes = require("./Routes/movieRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/movies", moviesRoutes);

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  // Set the static folder to the React build directory
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Catch-all route to handle all requests by returning the React app's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
