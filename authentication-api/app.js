require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

//! Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

//! Middleware
app.use(express.json()); // Parse JSON bodies

//! Routes
app.use("/", router);

//! Error handling middleware
app.use(errorHandler);

//! Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
