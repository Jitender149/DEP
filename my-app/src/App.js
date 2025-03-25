// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from './theme/ThemeContext';
// import { AuthProvider } from './context/auth/AuthContext';
// import { CssBaseline, Box } from '@mui/material';
// import Home from './Components/Home';
// import Resource from './Components/Resource';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import AboutUs from './Components/AboutUs';
// import Contact from './Components/Contact';
// import Profile from './Components/Profile';
// import ProtectedRoute from './Components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <CssBaseline />
//         <Router>
//           <Box sx={{ 
//             minHeight: '100vh',
//             display: 'flex',
//             flexDirection: 'column',
//             bgcolor: 'background.default'
//           }}>
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* Protected Routes */}
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               } />
//               <Route path="/resources" element={
//                 <ProtectedRoute>
//                   <Resource />
//                 </ProtectedRoute>
//               } />
//               <Route path="/about" element={
//                 <ProtectedRoute>
//                   <AboutUs />
//                 </ProtectedRoute>
//               } />
//               <Route path="/contact" element={
//                 <ProtectedRoute>
//                   <Contact />
//                 </ProtectedRoute>
//               } />
//               <Route path="/profile" element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               } />

//               {/* Catch all route */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </Box>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from './theme/ThemeContext';
// import { AuthProvider } from './context/auth/AuthContext';
// import { CssBaseline, Box } from '@mui/material';
// import Home from './Components/Home';
// import Resource from './Components/Resource';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import AboutUs from './Components/AboutUs';
// import Contact from './Components/Contact';
// import Profile from './Components/Profile';
// import ProtectedRoute from './Components/ProtectedRoute';
// import SearchForm from './Components/SearchForm';
// import JobList from './Components/JobList';
// //import Header from './Components/Header';
// //import Footer from './Components/Footer';

// function App() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const searchJobs = async (searchParams) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const queryParams = new URLSearchParams();
//       Object.entries(searchParams).forEach(([key, value]) => {
//         if (value) queryParams.append(key, value);
//       });

//       const response = await fetch(`http://localhost:5000/api/jobs?${queryParams}`);

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       const data = await response.json();
//       setJobs(data);
//     } catch (err) {
//       setError(err.message);
//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <CssBaseline />
//         <Router>
//           <Box sx={{ 
//             minHeight: '100vh',
//             display: 'flex',
//             flexDirection: 'column',
//             bgcolor: 'background.default'
//           }}>
//             {/* <Header /> */}
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* Protected Routes */}
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               } />
//               <Route path="/resources" element={
//                 <ProtectedRoute>
//                   <Resource />
//                 </ProtectedRoute>
//               } />
//               <Route path="/about" element={
//                 <ProtectedRoute>
//                   <AboutUs />
//                 </ProtectedRoute>
//               } />
//               <Route path="/jobs" element={
//                 <ProtectedRoute>
//                   <Jobs />
//                 </ProtectedRoute>
//               } />
//               <Route path="/contact" element={
//                 <ProtectedRoute>
//                   <Contact />
//                 </ProtectedRoute>
//               } />
//               <Route path="/profile" element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               } />
              
//               {/* Integrated Job Search Feature */}
//               <Route path="/jobs" element={
//                 <Box className="main-content">
//                   <SearchForm onSearch={searchJobs} />
//                   {error && <div className="error-message">Error: {error}</div>}
//                   {loading ? (
//                     <div className="loading">
//                       <div className="spinner"></div>
//                       <p>Searching for jobs...</p>
//                     </div>
//                   ) : (
//                     <JobList jobs={jobs} />
//                   )}
//                 </Box>
//               } />

//               {/* Catch all route */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//             {/* <Footer /> */}
//           </Box>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { AuthProvider } from './context/auth/AuthContext';
import { CssBaseline, Box } from '@mui/material';
import Home from './Components/Home';
import Resource from './Components/Resource';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
//import SearchForm from './Components/SearchForm';
//import JobList from './Components/JobList';
import Jobs from './Components/Jobs';
//import SearchForm from './Components/SearchForm';
//import Header from './Components/Header';
//import Footer from './Components/Footer';

function App() {  
  return (
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default'
          }}>
            {/* <Header /> */}
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resource />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              {/* New Jobs Route */}
              <Route path="/jobs" element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              } />
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* <Footer /> */}
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
