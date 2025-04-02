// // Home.js - Main Home Page after Login

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import {
//   School as SchoolIcon,
//   Book as BookIcon,
//   Group as GroupIcon,
//   Work as WorkIcon,
//   ContactMail as ContactIcon,
//   ArrowForward as ArrowForwardIcon,
//   EmojiEvents,
// } from '@mui/icons-material';
// import PageHeader from './PageHeader';

// const sections = [
//   {
//     title: 'Resources',
//     description: 'Access a vast collection of study materials, notes, and educational resources shared by students and educators.',
//     icon: <BookIcon sx={{ fontSize: 40 }} />,
//     path: '/resources',
//     image: 'https://source.unsplash.com/random/800x600?education',
//     color: '#1976d2',
//   },
//   {
//     title: 'About Us',
//     description: 'Learn about our mission, values, and the team behind the Academic Resource Portal.',
//     icon: <SchoolIcon sx={{ fontSize: 40 }} />,
//     path: '/about',
//     image: 'https://source.unsplash.com/random/800x600?university',
//     color: '#2e7d32',
//   },
//   {
//     title: 'Community',
//     description: 'Join our growing community of students and educators. Share knowledge and learn together.',
//     icon: <GroupIcon sx={{ fontSize: 40 }} />,
//     path: '/community',
//     image: 'https://source.unsplash.com/random/800x600?students',
//     color: '#ed6c02',
//   },
//   {
//     title: 'Contact',
//     description: 'Get in touch with us. We\'re here to help and answer any questions you may have.',
//     icon: <ContactIcon sx={{ fontSize: 40 }} />,
//     path: '/contact',
//     image: 'https://source.unsplash.com/random/800x600?contact',
//     color: '#9c27b0',
//   },
// ];

// const Home = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <SchoolIcon sx={{ fontSize: 40 }} />,
//       title: 'Educational Resources',
//       description: 'Access a vast collection of study materials, notes, and resources shared by students and educators.',
//     },
//     {
//       icon: <WorkIcon sx={{ fontSize: 40 }} />,
//       title: 'College Internships and Placements',
//       description: 'Connect with seniors and peers to get intern and palcement help and resources.',
//       onClick: () => navigate("/internships-placements"),
//     },
//     {
//       icon: <BookIcon sx={{ fontSize: 40 }} />,
//       title: 'Interactive Learning',
//       description: 'Engage with interactive content, quizzes, and discussions to enhance your learning experience.',
//     }, 
//     {
//       icon: <EmojiEvents sx={{ fontSize: 40 }} />,
//       title: 'Achievement System',
//       description: 'Track your progress, earn badges, and celebrate your learning milestones.',
//     },
//   ];

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
//       <PageHeader title="Welcome to Academic Platform" />
      
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <Box sx={{ textAlign: 'center', mb: 8 }}>
//           <Typography
//             variant="h2"
//             component="h1"
//             gutterBottom
//             sx={{
//               fontWeight: 700,
//               mb: 3,
//             }}
//           >
//             Your Gateway to Academic Excellence
//           </Typography>
//           <Typography
//             variant="h5"
//             color="text.secondary"
//             sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
//           >
//             Join our community of learners and educators to share knowledge, collaborate, and grow together.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               px: 4,
//               py: 1.5,
//               borderRadius: 2,
//             }}
//           >
//             Get Started
//           </Button>
//         </Box>

//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-8px)',
//                   },
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//                   <Box
//                     sx={{
//                       color: 'primary.main',
//                       mb: 2,
//                       display: 'flex',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     {feature.icon}
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     component="h3"
//                     gutterBottom
//                     sx={{ fontWeight: 600 }}
//                   >
//                     {feature.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mb: 2 }}
//                   >
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Home;

"use client"
import { useNavigate } from "react-router-dom"
import { Container, Box, Typography, Grid, Card, CardContent, Button, useTheme, useMediaQuery } from "@mui/material"
import {
  School as SchoolIcon,
  Book as BookIcon,
  Group as GroupIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
  EmojiEvents,
} from "@mui/icons-material"
import PageHeader from "./PageHeader"

const sections = [
  {
    title: "Resources",
    description:
      "Access a vast collection of study materials, notes, and educational resources shared by students and educators.",
    icon: <BookIcon sx={{ fontSize: 40 }} />,
    path: "/resources",
    image: "https://source.unsplash.com/random/800x600?education",
    color: "#1976d2",
  },
  {
    title: "About Us",
    description: "Learn about our mission, values, and the team behind the Academic Resource Portal.",
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    path: "/about",
    image: "https://source.unsplash.com/random/800x600?university",
    color: "#2e7d32",
  },
  {
    title: "Community",
    description: "Join our growing community of students and educators. Share knowledge and learn together.",
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    path: "/community",
    image: "https://source.unsplash.com/random/800x600?students",
    color: "#ed6c02",
  },
  {
    title: "Contact",
    description: "Get in touch with us. We're here to help and answer any questions you may have.",
    icon: <ContactIcon sx={{ fontSize: 40 }} />,
    path: "/contact",
    image: "https://source.unsplash.com/random/800x600?contact",
    color: "#9c27b0",
  },
]

const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: "Educational Resources",
      description:
        "Access a vast collection of study materials, notes, and resources shared by students and educators.",
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: "College Internships and Placements",
      description: "Connect with seniors and peers to get intern and palcement help and resources.",
      onClick: () => navigate("/internships-placements"),
    },
    {
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      title: "Interactive Learning",
      description: "Engage with interactive content, quizzes, and discussions to enhance your learning experience.",
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: "Discussion Groups",
      description: "Join classroom discussions, share ideas, and collaborate with peers.",
      onClick: () => navigate("/discussion"),
    },
  ]

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <PageHeader title="Welcome to Academic Platform" />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Your Gateway to Academic Excellence
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}>
            Join our community of learners and educators to share knowledge, collaborate, and grow together.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Get Started
          </Button>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                  cursor: feature.onClick ? "pointer" : "default",
                }}
                onClick={feature.onClick}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Home

