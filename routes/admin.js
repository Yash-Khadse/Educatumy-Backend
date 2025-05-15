const express = require("express");
const Service = require("../models/Service");
const Inquiry = require("../models/Inquiry");
const nodemailer = require("nodemailer");

const router = express.Router();

// Add a new service
router.post("/services", async (req, res) => {
  try {
    const { title, description, category, icon } = req.body;
    const service = new Service({ title, description, category, icon });
    await service.save();
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to add service." });
  }
});

// Update a service
router.put("/services/:id", async (req, res) => {
  try {
    const { title, description, category, icon } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, category, icon },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ success: false, error: "Service not found." });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to update service." });
  }
});

// Delete a service
router.delete("/services/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete service." });
  }
});

// Get all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch inquiries." });
  }
});

// Delete an inquiry
router.delete("/inquiries/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete inquiry." });
  }
});

// Reply to an inquiry (send email)
router.post("/inquiries/:id/reply", async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, error: "Inquiry not found." });

    // Send reply email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Educatumy" <${process.env.MAIL_USER}>`,
      to: inquiry.email,
      subject: "Reply to your inquiry",
      text: replyMessage,
      html: `<p>${replyMessage}</p>`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to send reply." });
  }
});

module.exports = router;