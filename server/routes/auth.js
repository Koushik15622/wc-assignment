const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const dotenv = require("dotenv");
dotenv.config();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events.readonly"] }), (req, res) => {
  console.log("Response from google auth: ", res.statusCode);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Generate JWT token
    console.log("User: ", req.user);
    const token = jwt.sign({ id: req.user.id, accessToken: req.user.accessToken }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Token: ", token);
    res.redirect(process.env.REACT_SERVER_URL + "/dashboard?token=" + token);
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("XSRF-TOKEN");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;