const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },  //  Stores Hashed Reset Token
    resetPasswordExpires: { type: Date },  //  Expiration Time
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
