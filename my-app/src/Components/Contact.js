// Contact.js - Team Members Profile & Contributions

import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import "./Contact.css";

const teamMembers = [
    {
        name: "Jatin",
        rollNumber: "2022MCB1266",
        role: "Frontend Developer",
        contributions: "Designed user interfaces and improved user experience. Worked on making the website fully responsive and interactive.",
        avatar: require("./Jatin.jpeg"),
    },
    {
        name: "Jitender",
        rollNumber: "2022MCB1318",
        role: "Backend Developer",
        contributions: "Developed core functionalities and backend API. Implemented authentication and RESTful services.",
        avatar: require("./Jitender.jpeg"),
    },
    {
        name: "Sarthak",
        rollNumber: "2022MCB1278",
        role: "Database Manager",
        contributions: "Handled database management and cloud storage integration. Optimized queries and ensured data security.",
        avatar: require("./Sarthak.jpeg"),
    },
];

const Contact = () => {
    return (
        <Container maxWidth="lg" className="contact-container">
            <Typography variant="h3" className="contact-title">
                Meet Our Team
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className="team-card" elevation={6}>
                            <CardContent className="team-card-content">
                                <img src={member.avatar} alt={member.name} className="team-profile-photo" />
                                <Typography variant="h5" className="team-name">{member.name}</Typography>
                                <Typography variant="subtitle1" className="team-roll">{member.rollNumber}</Typography>
                                <Typography variant="subtitle1" className="team-role">{member.role}</Typography>
                                <Typography className="team-contributions">{member.contributions}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Contact;
