const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

router.get("/events", async (req, res) => {
  console.log("User : ",req.user);
  if (!req.user){
    return res.status(401).send("Unauthorized"); 
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: req.user.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  try {
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    events.data.name = req.user.profile.name.givenName;
    res.json(events.data);
  } catch (error) {
    res.status(500).send("Error fetching events:" + error); 
  }
});

module.exports = router;
