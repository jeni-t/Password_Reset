const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // Import routes

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); // Mount auth routes

app._router.stack.forEach((r) => {
    if (r.route) console.log(`Route: ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
