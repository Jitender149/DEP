// Modernized Signup UI with Enhanced Styling

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/signup", { username, password });
      alert("Account created successfully");
      navigate("/");
    } catch (error) {
      alert("Error creating account");
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper className="auth-card" elevation={6}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignup} className="auth-button">
          Sign Up
        </Button>
        <Button variant="text" fullWidth onClick={() => navigate("/")} className="switch-auth">
          Already have an account? Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Signup;
