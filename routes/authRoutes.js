const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust path if needed
const crypto = require("crypto"); //  Use CommonJS require
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString("hex");
        console.log("Generated Reset Token:", resetToken); // Debugging

        // Store Hashed Token in DB
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send Email
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        console.log("Reset Link:", resetLink); // Debugging

        await sendEmail(user.email, "Password Reset Request", `Click the link to reset your password: ${resetLink}`);

        res.json({ message: "Password reset email sent" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// **Add Reset Password Route**
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password and update user
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
