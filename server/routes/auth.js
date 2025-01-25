const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");


router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events.readonly"] }), (req, res) => {
  console.log("Response from google auth: ", res.statusCode);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the cookie header
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('XSRF-TOKEN', token, {
        sameSite: 'lax', // lax is important, don't use 'strict' or 'none'
        httpOnly: true, // must be true in production
        secure: true, // must be true in production
        maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
      })
    );

    res.redirect(process.env.REACT_SERVER_URL + "/dashboard");
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("XSRF-TOKEN");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;