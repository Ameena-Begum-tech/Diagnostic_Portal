// Language: JavaScript (Report Controller)

const Report = require("../models/Report");
const User = require("../models/User");

// Doctor uploads report
const uploadReport = async (req, res) => {
  try {
    const { patientEmail } = req.body;

    if (!req.file || !patientEmail) {
      return res.status(400).json({ message: "File and patient email required" });
    }

    const patient = await User.findOne({ email: patientEmail });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const report = await Report.create({
      patient: patient._id,
      doctor: req.user._id,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

    res.status(201).json({
      message: "Report uploaded successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Patient views own reports
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ patient: req.user._id })
      .populate("doctor", "name email");

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadReport, getMyReports };
