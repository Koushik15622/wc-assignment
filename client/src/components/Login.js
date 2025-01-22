import React from "react";
import Button from '@mui/material/Button';
import logo from '../assets/logo192.png';
import api from '../api';

const Login = () => {
  const handleLogin = async () => {
    try {
      window.location.href = api.defaults.baseURL + "/auth/google";
    } catch (error) {
      console.error("There was an error making the request", error);
    }
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#ffa500", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative" }}>
      <a href="https://koushik-pln.vercel.app/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Logo" style={{ position: "absolute", top: "20px", left: "20px", height: "40px" }} />
      </a>
      <h1>Whitecarrot Intern Assignment 2.0</h1>
      <Button variant="contained" onClick={handleLogin} style={{ marginLeft: '8px', fontFamily: 'Quicksand' }}>
        Login with Google
      </Button>
      <a 
        href="https://koushik-pln.vercel.app/" 
        style={{ 
          position: "absolute", 
          bottom: "20px", 
          textDecoration: "none", 
          color: "black" 
        }}
      >
        submitted by Koushik PLN
      </a>
    </div>
  );
};

export default Login;