const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AdminUser = require("../models/AdminUser");

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await AdminUser.findOne({ username });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
    expiresIn: "2h",
  });
  res.json({ success: true, token });
});

module.exports = router;
