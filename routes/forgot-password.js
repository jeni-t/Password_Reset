const crypto = require("crypto"); // Ensure this is imported

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
        const resetLink = `https://password-reset-ud7z.onrender.com/reset-password/${resetToken}`;
        console.log("Reset Link:", resetLink); // Debugging

        await sendEmail(user.email, "Password Reset Request", `Click the link to reset your password: ${resetLink}`);

        res.json({ message: "Password reset email sent" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
