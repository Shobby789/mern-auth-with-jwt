const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Employee"], required: true },
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", UserSchema);
