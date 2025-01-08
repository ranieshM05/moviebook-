const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const connectDB = require("./config/db");
const moviesRoutes = require("./Routes/movieRoutes");
const authRoutes = require("./Routes/authRoutes"); // Add auth routes
const { errorHandler } = require("./middleware/errorMiddleware");
const authenticate = require("./middleware/authenticate"); // Import authenticate middleware
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/movies", moviesRoutes);
app.use("/api/auth", authRoutes); 

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Error Handling Middleware
app.use(errorHandler);

app.put("/api/user/profile", authenticate, async (req, res) => {
  const { name, email, details } = req.body;
  const userId = req.user._id; // The authenticated user ID attached to the request

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId }, // Find the profile by userId
      { name, email, details }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
});

// Start the server after database connection is established
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
