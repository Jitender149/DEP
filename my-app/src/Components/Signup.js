// // Modernized Signup UI with Enhanced Styling

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Link,
//   CircularProgress,
//   Alert,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useAuth } from '../context/auth/AuthContext';
// import toast from "react-hot-toast";

// export default function Signup() {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Username validation
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters long';
//     } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
//       newErrors.username = 'Username can only contain letters, numbers, and underscores';
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//     }
    
//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0 ? {} : newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       setLoading(true);
//       await signup(formData.username, formData.password);
//       setSuccess(true);
//       toast.success('Account created successfully! Please login.');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       setErrors({ submit: error.message || 'Failed to create account' });
//       toast.error(error.message || 'Failed to create account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getPasswordRequirements = () => {
//     const requirements = [
//       { text: 'At least 6 characters long', met: formData.password.length >= 6 },
//       { text: 'Contains at least one uppercase letter', met: /[A-Z]/.test(formData.password) },
//       { text: 'Contains at least one lowercase letter', met: /[a-z]/.test(formData.password) },
//       { text: 'Contains at least one number', met: /\d/.test(formData.password) },
//     ];
//     return requirements;
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//           }}
//         >
//           <Typography variant="h4" component="h1" gutterBottom align="center">
//             Sign Up
//           </Typography>
          
//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               Account created successfully! Redirecting to login...
//             </Alert>
//           )}
          
//           {errors.submit && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {errors.submit}
//             </Alert>
//           )}
          
//           <TextField
//             label="Username"
//             value={formData.username}
//             onChange={(e) => {
//               setFormData(prev => ({ ...prev, username: e.target.value }));
//               setErrors(prev => ({ ...prev, username: '' }));
//               setServerError('');
//             }}
//             error={!!errors.username}
//             helperText={errors.username || "Username must be at least 3 characters long and can only contain letters, numbers, and underscores"}
//             required
//             fullWidth
//             disabled={loading}
//             autoComplete="username"
//           />
          
//           <TextField
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             value={formData.password}
//             onChange={(e) => {
//               setFormData(prev => ({ ...prev, password: e.target.value }));
//               setErrors(prev => ({ ...prev, password: '', confirmPassword: '' }));
//               setServerError('');
//             }}
//             error={!!errors.password}
//             helperText={errors.password || "Password requirements:"}
//             required
//             fullWidth
//             disabled={loading}
//             autoComplete="new-password"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {formData.password && (
//             <List dense sx={{ mt: -2, mb: 1 }}>
//               {getPasswordRequirements().map((req, index) => (
//                 <ListItem key={index} sx={{ py: 0.5 }}>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     {req.met ? (
//                       <CheckCircleIcon color="success" fontSize="small" />
//                     ) : (
//                       <ErrorIcon color="error" fontSize="small" />
//                     )}
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary={req.text}
//                     sx={{ 
//                       '& .MuiListItemText-primary': {
//                         fontSize: '0.875rem',
//                         color: req.met ? 'success.main' : 'text.secondary'
//                       }
//                     }}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           )}
          
//           <TextField
//             label="Confirm Password"
//             type={showConfirmPassword ? 'text' : 'password'}
//             value={formData.confirmPassword}
//             onChange={(e) => {
//               setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
//               setErrors(prev => ({ ...prev, confirmPassword: '' }));
//               setServerError('');
//             }}
//             error={!!errors.confirmPassword}
//             helperText={errors.confirmPassword || "Re-enter your password to confirm"}
//             required
//             fullWidth
//             disabled={loading}
//             autoComplete="new-password"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     edge="end"
//                   >
//                     {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
          
//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             fullWidth
//             sx={{ mt: 2 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Sign Up'}
//           </Button>
          
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Typography variant="body2">
//               Already have an account?{' '}
//               <Link
//                 component="button"
//                 variant="body2"
//                 onClick={() => navigate('/login')}
//                 disabled={loading}
//               >
//                 Login
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }
// Modernized Signup UI with Enhanced Styling

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from "react-hot-toast";
import { useAuth } from '../context/auth/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.endsWith('@iitrpr.ac.in')) {
      newErrors.email = 'Only IITRPR email addresses are allowed';
    } else if (!/^[a-zA-Z0-9._%+-]+@iitrpr\.ac\.in$/.test(formData.email)) {
      newErrors.email = 'Invalid email format. Please use a valid IITRPR email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting form with:", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Use fetch directly instead of the auth context's signup function
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        setSuccess(true);
        toast.success('Account created successfully! Please login.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          if (data.error === 'Email already exists') {
            toast.error('This email is already registered. Please use a different email or login.');
            setErrors(prev => ({ ...prev, email: 'This email is already registered' }));
          } else if (data.error === 'Username already exists') {
            toast.error('This username is already taken. Please choose another username.');
            setErrors(prev => ({ ...prev, username: 'This username is already taken' }));
          } else {
            toast.error(data.error || 'Failed to create account');
            setErrors(prev => ({ ...prev, submit: data.error || 'Failed to create account' }));
          }
        } else {
          toast.error(data.error || 'Failed to create account');
          setErrors(prev => ({ ...prev, submit: data.error || 'Failed to create account' }));
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error('Network error. Please try again.');
      setErrors(prev => ({ ...prev, submit: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const getPasswordRequirements = () => {
    const requirements = [
      { text: 'At least 6 characters long', met: formData.password.length >= 6 },
      { text: 'Contains at least one uppercase letter', met: /[A-Z]/.test(formData.password) },
      { text: 'Contains at least one lowercase letter', met: /[a-z]/.test(formData.password) },
      { text: 'Contains at least one number', met: /\d/.test(formData.password) },
    ];
    return requirements;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Sign Up
          </Typography>
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created successfully! Redirecting to login...
            </Alert>
          )}
          
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}
          
          <TextField
            label="Username"
            value={formData.username}
            onChange={(e) => {
              console.log("Username changed:", e.target.value);
              setFormData(prev => ({ ...prev, username: e.target.value }));
              setErrors(prev => ({ ...prev, username: '' }));
            }}
            error={!!errors.username}
            helperText={errors.username || "Username must be at least 3 characters long and can only contain letters, numbers, and underscores"}
            required
            fullWidth
            disabled={loading}
            autoComplete="username"
          />
          
          <TextField
            label="IITRPR Email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              console.log("Email changed:", e.target.value);
              setFormData(prev => ({ ...prev, email: e.target.value }));
              setErrors(prev => ({ ...prev, email: '' }));
            }}
            error={!!errors.email}
            helperText={errors.email || "Enter your IITRPR email address (username@iitrpr.ac.in)"}
            required
            fullWidth
            disabled={loading}
            autoComplete="email"
            placeholder="username@iitrpr.ac.in"
          />
          
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => {
              console.log("Password changed:", e.target.value);
              setFormData(prev => ({ ...prev, password: e.target.value }));
              setErrors(prev => ({ ...prev, password: '', confirmPassword: '' }));
            }}
            error={!!errors.password}
            helperText={errors.password || "Password requirements:"}
            required
            fullWidth
            disabled={loading}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {formData.password && (
            <List dense sx={{ mt: -2, mb: 1 }}>
              {getPasswordRequirements().map((req, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {req.met ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <ErrorIcon color="error" fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={req.text}
                    sx={{ 
                      '& .MuiListItemText-primary': {
                        fontSize: '0.875rem',
                        color: req.met ? 'success.main' : 'text.secondary'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
              setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword || "Re-enter your password to confirm"}
            required
            fullWidth
            disabled={loading}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign Up'
            )}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}