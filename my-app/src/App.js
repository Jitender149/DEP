
// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
// import Dashboard from "./Components/Dashboard";
// import Home from "./Components/Home";
// import Contact from "./Components/Contact";
// import AboutUs from "./Components/AboutUs"; // Import About Us page
// import "./App.css";

// const PrivateRoute = ({ element }) => {
//   const token = localStorage.getItem("token");
//   return token ? element : <Navigate to="/" replace />;
// };

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const username = localStorage.getItem("username"); // Get stored username

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <AppBar position="static" className="navbar">
//       <Toolbar>
//         <Typography variant="h6" className="navbar-title">
//           Academic Platform
//         </Typography>
//         {token && <Button color="inherit" onClick={() => navigate("/home")} className="navbar-button">Home</Button>}
//         {/* {token && <Button color="inherit" onClick={() => navigate("/about-us")} className="navbar-button">About Us</Button>} Added About Us */}
//         {token ? (
//           <Button color="inherit" onClick={handleLogout} className="navbar-button">Logout</Button>
//         ) : (
//           <>
//             <Button color="inherit" href="/" className="navbar-button">Login</Button>
//             <Button color="inherit" href="/signup" className="navbar-button">Sign Up</Button>
//           </>
//         )}
//         {/* Display Username if Logged In */}
//          {token && username && (
//            <Typography variant="h6" className="navbar-username" style={{ marginLeft: "auto", marginRight: "15px" }}>
//              Welcome, {username}
//            </Typography>
//          )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <CssBaseline />
//       <Router>
//         <Navbar />
//         <Box className="app-container">
//           <Container maxWidth="md">
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/home" element={<PrivateRoute element={<Home />} />} />
//               <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
//               <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
//               <Route path="/about-us" element={<PrivateRoute element={<AboutUs />} />} />
//               <Route path="*" element={<Typography variant="h4" align="center">404: Page Not Found</Typography>} />
//             </Routes>
//           </Container>
//         </Box>
//       </Router>
//     </>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import Home from "./Components/Home"
import Contact from "./Components/Contact"
import AboutUs from "./Components/AboutUs"
import MaterialSharing from "./Components/MaterialSharing" // Import the new component
import "./App.css"

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token")
  return token ? element : <Navigate to="/" replace />
}

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/")
  }

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        {/* Left Side (Logo + Navigation Buttons) */}
        <Typography variant="h6" className="navbar-title" sx={{ flexGrow: 1 }}>
          Academic Platform
        </Typography>
        {token && (
          <>
            <Button color="inherit" onClick={() => navigate("/home")} className="navbar-button">
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/materials")} className="navbar-button">
              Materials
            </Button>
            <Button color="inherit" onClick={handleLogout} className="navbar-button">
              Logout
            </Button>
          </>
        )}

        {/* Right Side (Username) */}
        {token && username && (
          <Typography variant="body1" className="navbar-username" sx={{ marginLeft: "auto", fontSize: "0.9rem" }}>
            Welcome, {username}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  )
}

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box className="app-container">
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<PrivateRoute element={<Home />} />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
              <Route path="/about-us" element={<PrivateRoute element={<AboutUs />} />} />
              <Route path="/materials" element={<PrivateRoute element={<MaterialSharing />} />} />
              <Route
                path="*"
                element={
                  <Typography variant="h4" align="center">
                    404: Page Not Found
                  </Typography>
                }
              />
            </Routes>
          </Container>
        </Box>
      </Router>
    </>
  )
}

export default App

