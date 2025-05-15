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
    const { name, email, message, phone, serviceInterest } = req.body; // <-- added number and service
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }
    const inquiry = new Inquiry({
      name,
      email,
      message,
      phone,
      serviceInterest,
    }); // <-- add to model if needed
    await inquiry.save();

    // Send email notification
    await transporter.sendMail({
      from: `"Educatumy Inquiry" <${process.env.MAIL_USER}>`,
      to: "yashkhadse04@gmail.com",
      subject: "New Inquiry Received",
      text: `Name: ${name}
Email: ${email}
Number: ${phone || "N/A"}
Service: ${serviceInterest || "N/A"}
Message: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Number:</strong> ${phone || "N/A"}</p>
             <p><strong>Service:</strong> ${serviceInterest || "N/A"}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error." });
    console.error(err);
  }
});

module.exports = router;
