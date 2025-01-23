import React from "react";
import axios from "../api";
import logo from '../assets/logo-white.png'; // Adjust the path to your logo file
import Button from '@mui/material/Button';
import '../assets/CustomButton.css'; 


const Header = () => {
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout", {}, { withCredentials: true });
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header style={{ padding: "10px", background: "#000000", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <a href="https://koushik-pln.vercel.app/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
      </a>
      <Button
        variant="contained"
        onClick={handleLogout}
        style={{ backgroundColor: "#ffffff", color: "black", fontFamily: "Quicksand" }}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;