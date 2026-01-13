// Language: JavaScript (Protected Routes Test)

const express = require("express");
const router = express.Router();

const { protect, doctorOnly } = require("../middleware/authMiddleware");

// Logged-in users only
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// Doctors only
router.get("/doctor", protect, doctorOnly, (req, res) => {
  res.json({
    message: "Doctor access granted",
    doctor: req.user,
  });
});

module.exports = router;
