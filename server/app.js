const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth");
const calendarRoutes = require("./routes/calendar");

const app = express();

// Middleware for parsing JSON and handling cookies
app.use(
  cookieSession({
    name: "session",
    keys: process.env.SESSION_KEY, // Replace with your actual session secret
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: true, // Only use secure cookies in production
    sameSite: "None",
  })
);
app.use(express.json());

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});