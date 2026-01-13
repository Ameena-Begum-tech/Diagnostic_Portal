// Language: JavaScript (Report Routes)

const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { protect, doctorOnly } = require("../middleware/authMiddleware");
const {
  uploadReport,
  getMyReports,
} = require("../controllers/reportController");

// Doctor uploads report
router.post(
  "/upload",
  protect,
  doctorOnly,
  upload.single("report"),
  uploadReport
);

// Patient views own reports
router.get("/my-reports", protect, getMyReports);

module.exports = router;
