const express = require("express");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const router = express.Router();

router.get("/events", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set up OAuth2 client with the access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: decoded.accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Fetch events from the calendar
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    // Send the events and user name as response
    res.status(200).json({ items: events.data.items, name: decoded.name });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error });
  }
});

module.exports = router;