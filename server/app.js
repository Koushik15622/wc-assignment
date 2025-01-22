const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const calendarRoutes = require("./routes/calendar");

dotenv.config();
require("./config/googleAuth");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware for parsing JSON and handling cookies
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);
app.use(express.json());

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
