// // Optimized Login.js with Improved Error Handling & UX Enhancements

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextField, Button, Container, Typography, Paper, CircularProgress } from "@mui/material";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       setError("Please enter both username and password.");
//       return;
//     }
    
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
//       localStorage.setItem("token", response.data.access_token);
//       navigate("/home");
//     } catch (error) {
//       setError(error.response?.data?.message || "Invalid credentials. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" className="auth-container">
//       <Paper className="auth-card" elevation={6}>
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <TextField
//           label="Username"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleLogin}
//           className="auth-button"
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : "Login"}
//         </Button>
//         <Button
//           variant="text"
//           fullWidth
//           onClick={() => navigate("/signup")}
//           className="switch-auth"
//         >
//           Don't have an account? Sign Up
//         </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, CircularProgress } from "@mui/material";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", username); // Store username
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper className="auth-card" elevation={6}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          className="auth-button"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        <Button
          variant="text"
          fullWidth
          onClick={() => navigate("/signup")}
          className="switch-auth"
        >
          Don't have an account? Sign Up
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
