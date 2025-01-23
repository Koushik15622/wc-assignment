const express = require("express");
const passport = require("passport");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events.readonly"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.cookie("session", req.session, { httpOnly: true, secure: true });
    console.log("Session : ",req.session);
    res.redirect(process.env.REACT_SERVER_URL+"/dashboard");
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
