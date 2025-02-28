const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path if needed

const router = express.Router();

// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Token verification and password reset logic
        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
});

module.exports = router;
