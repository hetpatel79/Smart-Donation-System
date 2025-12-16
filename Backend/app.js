/**
 * Smart Donation System - Backend Server
 * Main application entry point for the Express.js API
 */

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
require("dotenv").config();

// Import route handlers
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const donationRoutes = require("./routes/donations");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");

// Initialize Express application
const app = express();

// Middleware Configuration
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // HTTP request logger
app.use(cookieParser()); // Parse cookies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Smart Donation System API is running!" });
});

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "Smart Donation System API",
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
