const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AdminUser = require("./models/AdminUser");
require("dotenv").config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const passwordHash = await bcrypt.hash("eS#2dH/0uI)2cV$5", 12);
  await AdminUser.create({ username: "shivaprasad923", passwordHash });
  console.log("Admin user created");
  process.exit();
}

createAdmin();