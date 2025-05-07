const express = require("express");
const Inquiry = require("../models/Inquiry");
const router = express.Router();
const nodemailer = require("nodemailer");

// Configure nodemailer transporter (example uses Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // Your email address
    pass: process.env.MAIL_PASS, // Your email password or app password
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }
    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    // Send email notification
    await transporter.sendMail({
      from: `"Educatumy Inquiry" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER, // The email address to receive inquiries
      subject: "New Inquiry Received",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error." });
    console.error(err);
  }
});

module.exports = router;
