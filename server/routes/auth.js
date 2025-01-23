const express = require("express");
const passport = require("passport");
const router = express.Router();

// Replace these values with your actual configuration
const REACT_SERVER_URL = "http://localhost:3000";

router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events.readonly"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Set a cookie with the session information
    res.cookie("session", req.session, {
      httpOnly: true,
      secure: true, // Only use secure cookies in production
      sameSite: "None", // Allow cross-site cookies
    });
    res.redirect(REACT_SERVER_URL + "/dashboard");
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;