const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.resetPasswordController = (req, res) => {
  try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
          return res.status(400).json({ message: "Token and new password are required" });
      }

      res.json({ message: "Password has been reset successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.forgotPasswordController = (req, res) => {
  res.json({ message: "Forgot password logic here" });
};

