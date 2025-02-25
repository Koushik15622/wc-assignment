import React, { useEffect, useState } from "react";
import axios from "../api";
import EventTable from "./EventTable";
import Header from "./Header";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("Token: ", token);
    if (token) {
      localStorage.setItem('jwtToken', token);
      window.history.replaceState({}, document.title, window.location.pathname); // Remove token from URL
    }
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/calendar/events");
        console.log(response.status);
        setEvents(response.data.items);
        setUser(response.data.name);
      } catch (error) {
        if (error.status === 401) {
          window.location.href = "/";
        } else
        console.error("Error fetching events:", error.status);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: 'center' }}>
        Hello {user}, Here's your schedule
      </h1>
      <EventTable events={events} />
    </div>
  );
};

export default Dashboard;
