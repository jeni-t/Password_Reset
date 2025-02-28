const express = require("express");
const { resetPasswordController, forgotPasswordController } = require("../controllers/userController");

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);  // Ensure this exists!

module.exports = router;
