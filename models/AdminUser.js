const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

module.exports = mongoose.model("AdminUser", adminUserSchema);