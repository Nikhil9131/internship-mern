const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const { protect, admin } = require("../middleware/authMiddleware");

// @route   POST /api/inquiries
// @desc    Submit a new contact inquiry
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      projectType,
      message,
    });

    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all contact inquiries
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete a contact inquiry
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    await inquiry.deleteOne();
    res.status(200).json({ success: true, message: "Inquiry removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
