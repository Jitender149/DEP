// Contact.js - Team Members Profile & Contributions

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import PageHeader from './PageHeader';

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

const contactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 40 }} />,
    title: 'Email',
    content: 'support@academicportal.com',
    link: 'mailto:support@academicportal.com',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40 }} />,
    title: 'Phone',
    content: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: <LocationIcon sx={{ fontSize: 40 }} />,
    title: 'Address',
    content: '123 Education Street, Learning City, 12345',
    link: 'https://maps.google.com',
  },
];

export default function Contact() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setSnackbar({
      open: true,
      message: 'Message sent successfully! We will get back to you soon.',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <PageHeader title="Contact Us" />
      <Box sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 8,
            mb: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              align="center"
              sx={{ fontWeight: 'bold' }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}
            >
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {/* Team Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              align="center"
              sx={{ mb: 4 }}
            >
              Our Team
            </Typography>
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={member.avatar}
                      alt={member.name}
                      sx={{
                        objectFit: 'contain',
                        width: '100%',
                        bgcolor: '#f5f5f5',
                        transition: 'transform 0.3s ease-in-out',
                        p: 1,
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {member.rollNumber}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.contributions}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Get in Touch
                </Typography>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    sx={{
                      mb: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          color: 'primary.main',
                        }}
                      >
                        {info.icon}
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ ml: 1 }}
                        >
                          {info.title}
                        </Typography>
                      </Box>
                      <Button
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textTransform: 'none',
                          p: 0,
                          '&:hover': {
                            bgcolor: 'transparent',
                          },
                        }}
                      >
                        <Typography variant="body1" color="text.secondary">
                          {info.content}
                        </Typography>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ mb: 4 }}
                >
                  Send us a Message
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
