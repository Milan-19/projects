const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to database
connectDB();

// Routes (basic examples)
app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

// Import and use routers (to be created below)
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Error handling middleware (placeholder)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
