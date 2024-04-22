const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['sole_trader', 'government_official'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
