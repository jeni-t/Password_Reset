const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate Reset Token and Hash it before saving
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send Email with plain resetToken (not hashed)
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    await sendEmail(user.email, "Password Reset Request", `Click here: ${resetURL}`);

    res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { forgotPasswordController };
