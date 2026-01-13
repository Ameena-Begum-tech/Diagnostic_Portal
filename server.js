// Language: JavaScript (Node.js + Express)

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
const path = require("path");

// Route imports
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

// Initialize app FIRST
const app = express();

// Connect Database
connectDB();

// Middleware


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/reports", reportRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Base route
app.get("/", (req, res) => {
  res.send("Diagnostic API running");
});

// Port
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
