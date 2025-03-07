// Home.js - Main Home Page after Login

import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="home-container">
      <Paper elevation={6} className="home-card">
        <Typography variant="h3" className="home-title">
          Welcome to the Academic Platform
        </Typography>
        <Typography variant="h6" className="home-subtitle">
          A platform to share and access academic resources easily.
        </Typography>
        <Typography className="home-description">
          Your one stop solution for all the resources, internship and placement discussions and access to MATHS community.
        </Typography>
        <Box className="home-buttons">
          <Button variant="contained" color="primary" onClick={() => navigate("/about-us")}>
            About Us
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}> 
            Resources
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/discussion")}>
            Internships and Placements Discussion
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/opportunities")}>
            Internships and Placements Opportunities
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
