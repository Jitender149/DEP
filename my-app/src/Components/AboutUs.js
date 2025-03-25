import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School as SchoolIcon,
  Group as GroupIcon,
  EmojiEvents as EmojiEventsIcon,
  Lightbulb as LightbulbIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import PageHeader from './PageHeader';

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Quality Education',
      description: 'We strive to provide high-quality educational resources and materials to help students excel in their academic journey.',
      color: '#5C6BC0',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: 'Community Driven',
      description: 'Our platform is built on the power of community, where students and educators come together to share knowledge and experiences.',
      color: '#7C4DFF',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Achievement Focused',
      description: 'We believe in celebrating academic achievements and encouraging continuous learning through our reward system.',
      color: '#FF6B6B',
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
      title: 'Innovation',
      description: 'We constantly innovate to provide the best learning experience with cutting-edge features and technologies.',
      color: '#4CAF50',
    },
  ];

  const team = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      avatar: 'JD',
      bio: 'Passionate about education technology and making quality education accessible to all.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Jane Smith',
      role: 'Head of Education',
      avatar: 'JS',
      bio: 'Experienced educator with a vision for transforming traditional learning methods.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Mike Johnson',
      role: 'Technical Lead',
      avatar: 'MJ',
      bio: 'Tech innovator focused on creating seamless learning experiences through cutting-edge solutions.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PageHeader title="About Us" />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Mission Statement */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(45deg, #5C6BC0 30%, #7C4DFF 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
            >
              To create an inclusive and collaborative learning environment where students can access quality educational resources and connect with peers to achieve academic excellence.
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #5C6BC0 30%, #7C4DFF 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7C4DFF 30%, #5C6BC0 90%)',
                },
              }}
            >
              Join Our Community
            </Button>
          </Box>
        </Fade>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(45deg, ${feature.color}20, ${feature.color}40)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        color: feature.color,
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        transform: hoveredFeature === index ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        {/* Team Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              background: 'linear-gradient(45deg, #5C6BC0 30%, #7C4DFF 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                    onMouseEnter={() => setHoveredTeam(index)}
                    onMouseLeave={() => setHoveredTeam(null)}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          mx: 'auto',
                          mb: 2,
                          bgcolor: 'primary.main',
                          fontSize: '2.5rem',
                          transform: hoveredTeam === index ? 'scale(1.1)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                          boxShadow: hoveredTeam === index ? 3 : 1,
                        }}
                      >
                        {member.avatar}
                      </Avatar>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {member.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {member.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, minHeight: '60px' }}
                      >
                        {member.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {Object.entries(member.social).map(([platform, url]) => (
                          <Tooltip key={platform} title={platform.charAt(0).toUpperCase() + platform.slice(1)}>
                            <IconButton
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: 'primary.main',
                                '&:hover': {
                                  backgroundColor: 'primary.light',
                                  color: 'white',
                                },
                              }}
                            >
                              {platform === 'linkedin' && <LinkedInIcon />}
                              {platform === 'twitter' && <TwitterIcon />}
                              {platform === 'github' && <GitHubIcon />}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Values Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              background: 'linear-gradient(45deg, #5C6BC0 30%, #7C4DFF 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {['Excellence', 'Innovation', 'Community'].map((value, index) => (
              <Grid item xs={12} md={4} key={value}>
                <Zoom in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, #5C6BC020, #7C4DFF40)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #5C6BC0 30%, #7C4DFF 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {value}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {value === 'Excellence' && 'We strive for excellence in everything we do, from the quality of our resources to the support we provide to our community.'}
                        {value === 'Innovation' && 'We embrace innovation and continuously improve our platform to provide the best learning experience possible.'}
                        {value === 'Community' && 'We believe in the power of community and foster an environment where everyone can learn and grow together.'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
