import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHeader from './PageHeader';
import SearchForm from './SearchForm';
import JobList from './JobList';
// import Header from "./Header"
// import Footer from "./Footer"

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchJobs = async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:5000/api/jobs?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader title="Job Search Portal" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Find Your Dream Job
        </Typography>
        
        <SearchForm onSearch={searchJobs} />
        
        {error && (
          <Box sx={{ 
            p: 2, 
            mt: 2, 
            bgcolor: 'error.light', 
            color: 'error.contrastText',
            borderRadius: 1
          }}>
            Error: {error}
          </Box>
        )}
        
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mt: 4 
          }}>
            <div className="spinner" style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid rgba(0, 0, 0, 0.1)', 
              borderRadius: '50%', 
              borderTop: '4px solid #3f51b5', 
              animation: 'spin 1s linear infinite' 
            }}></div>
            <Typography sx={{ mt: 2 }}>Searching for jobs...</Typography>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </Box>
        ) : (
          <JobList jobs={jobs} />
        )}
      </Container>
    </Box>
  );
  // return (
  //   <div className="app">
  //     <Header />
  //     <main className="main-content">
  //       <SearchForm onSearch={searchJobs} />
  //       {error && <div className="error-message">Error: {error}</div>}
  //       {loading ? (
  //         <div className="loading">
  //           <div className="spinner"></div>
  //           <p>Searching for jobs...</p>
  //         </div>
  //       ) : (
  //         <JobList jobs={jobs} />
  //       )}
  //     </main>
  //     <Footer />
  //   </div>
  // );
}

export default Jobs;