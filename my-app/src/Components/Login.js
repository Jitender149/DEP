// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
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
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useAuth } from '../context/auth/AuthContext';
// import toast from 'react-hot-toast';

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters long';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerError('');
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await login(formData.username, formData.password);
      
//       if (result.success) {
//         toast.success('Login successful!');
//         navigate('/');
//       } else {
//         setServerError(result.error);
//       }
//     } catch (error) {
//       setServerError('An unexpected error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
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
//             Login
//           </Typography>
          
//           {serverError && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {serverError}
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
//             helperText={errors.username}
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
//               setErrors(prev => ({ ...prev, password: '' }));
//               setServerError('');
//             }}
//             error={!!errors.password}
//             helperText={errors.password}
//             required
//             fullWidth
//             disabled={loading}
//             autoComplete="current-password"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
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
//             {loading ? <CircularProgress size={24} /> : 'Login'}
//           </Button>
          
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Typography variant="body2">
//               Don't have an account?{' '}
//               <Link
//                 component="button"
//                 variant="body2"
//                 onClick={() => navigate('/signup')}
//                 disabled={loading}
//               >
//                 Sign up
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [otpRequired, setOtpRequired] = useState(false);
    const [otpExpiryTime, setOtpExpiryTime] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [authMethod, setAuthMethod] = useState('otp'); // 'otp' or 'password'
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@iitrpr\.ac\.in$/;
        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: 'Please use your IITRPR email address (@iitrpr.ac.in)' }));
            return false;
        }
        setErrors(prev => ({ ...prev, email: '' }));
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setErrors({});

        try {
            if (!validateEmail()) {
                setLoading(false);
                return;
            }

            if (authMethod === 'otp') {
                if (!otpRequired) {
                    await handleGenerateOTP();
                } else {
                    await handleVerifyOTP();
                }
            } else {
                // Password authentication
                if (!formData.password) {
                    setErrors(prev => ({ ...prev, password: 'Password is required' }));
                    setLoading(false);
                    return;
                }
                await handlePasswordLogin();
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            setErrors(prev => ({ ...prev, submit: 'An error occurred. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordLogin = async () => {
        setLoading(true);
        try {
            console.log('Attempting password login for email:', formData.email);
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            console.log('Password login response:', data);

            if (response.ok) {
                console.log('Login successful, setting token and user...');
                toast.success('Login successful!');
                localStorage.setItem('token', data.access_token);
                console.log('Token set in localStorage');
                setUser(data.username);
                console.log('User state updated');
                console.log('Navigating to home page...');
                navigate('/');
                console.log('Navigation completed');
            } else {
                toast.error(data.message || 'Invalid email or password');
                setErrors(prev => ({ ...prev, password: data.message }));
            }
        } catch (error) {
            console.error('Password login error:', error);
            toast.error('Failed to login. Please try again.');
            setErrors(prev => ({ ...prev, submit: 'Failed to login. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateOTP = async () => {
        if (!validateEmail()) return;
        
        setLoading(true);
        setMessage('');
        setErrors({});
        
        try {
            const response = await fetch('http://localhost:5000/generate-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success('OTP has been sent to your email');
                setMessage('OTP has been sent to your email. Please check your inbox. The OTP is valid for 5 minutes.');
                setOtpRequired(true);
                setFormData(prev => ({ ...prev, otp: '' }));
                setOtpExpiryTime(data.expires_in);
                setCountdown(60); // 1 minute cooldown
            } else {
                toast.error(data.error || 'Failed to send OTP');
                setErrors(prev => ({ ...prev, submit: data.error }));
                if (data.retry_after) {
                    setMessage(`Please wait ${Math.ceil(data.retry_after / 60)} minutes before trying again.`);
                    setCountdown(Math.ceil(data.retry_after));
                }
            }
        } catch (err) {
            toast.error('Network error. Please try again.');
            setErrors(prev => ({ ...prev, submit: 'Network error. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!formData.otp) {
            setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
            return;
        }

        if (formData.otp.length !== 6 || !/^\d+$/.test(formData.otp)) {
            setErrors(prev => ({ ...prev, otp: 'OTP must be 6 digits' }));
            return;
        }

        setLoading(true);
        try {
            console.log('Verifying OTP for email:', formData.email);
            const response = await fetch('http://localhost:5000/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    otp: formData.otp
                })
            });

            const data = await response.json();
            console.log('OTP verification response:', data);

            if (response.ok) {
                console.log('Login successful, setting token and user...');
                toast.success('Login successful!');
                localStorage.setItem('token', data.access_token);
                console.log('Token set in localStorage');
                setUser(data.username);
                console.log('User state updated');
                console.log('Navigating to home page...');
                navigate('/');
                console.log('Navigation completed');
            } else {
                // Handle different error cases
                if (response.status === 429) {
                    // Too many attempts
                    toast.error(`Too many verification attempts. Please try again in ${Math.ceil(data.retry_after / 60)} minutes.`);
                    setErrors(prev => ({ ...prev, otp: `Too many attempts. Try again in ${Math.ceil(data.retry_after / 60)} minutes.` }));
                    setCountdown(Math.ceil(data.retry_after));
                } else {
                    // Other errors with attempts left
                    const errorMessage = data.attempts_left !== undefined 
                        ? `${data.error} (${data.attempts_left} attempts left)`
                        : data.error;
                    
                    toast.error(errorMessage);
                    setErrors(prev => ({ ...prev, otp: errorMessage }));
                    
                    if (data.retry_after) {
                        setCountdown(Math.ceil(data.retry_after));
                    }
                }
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error('Failed to verify OTP. Please try again.');
            setErrors(prev => ({ ...prev, submit: 'Failed to verify OTP. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    const handleAuthMethodChange = (event, newMethod) => {
        if (newMethod !== null) {
            setAuthMethod(newMethod);
            setOtpRequired(false);
            setFormData(prev => ({ ...prev, otp: '', password: '' }));
            setErrors({});
            setMessage('');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Login to DEP
                    </Typography>
                    
                    <ToggleButtonGroup
                        value={authMethod}
                        exclusive
                        onChange={handleAuthMethodChange}
                        aria-label="authentication method"
                        sx={{ mb: 2 }}
                    >
                        <ToggleButton value="otp" aria-label="login with OTP">
                            OTP Login
                        </ToggleButton>
                        <ToggleButton value="password" aria-label="login with password">
                            Password Login
                        </ToggleButton>
                    </ToggleButtonGroup>
                    
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="IITRPR Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, email: e.target.value }));
                                setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            error={!!errors.email}
                            helperText={errors.email || "Use your @iitrpr.ac.in email address"}
                            placeholder="username@iitrpr.ac.in"
                            disabled={loading}
                        />
                        
                        {authMethod === 'password' && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, password: e.target.value }));
                                    setErrors(prev => ({ ...prev, password: '' }));
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        
                        {authMethod === 'otp' && otpRequired && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="otp"
                                label="Enter OTP"
                                id="otp"
                                value={formData.otp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setFormData(prev => ({ ...prev, otp: value }));
                                    setErrors(prev => ({ ...prev, otp: '' }));
                                }}
                                error={!!errors.otp}
                                helperText={errors.otp || (otpExpiryTime > 0 ? `OTP expires in ${Math.ceil(otpExpiryTime / 60)} minutes` : 'OTP expired')}
                                disabled={loading || otpExpiryTime <= 0}
                                inputProps={{ maxLength: 6 }}
                            />
                        )}
                        
                        {errors.submit && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {errors.submit}
                            </Alert>
                        )}
                        
                        {message && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                {message}
                            </Alert>
                        )}
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                authMethod === 'otp' 
                                    ? (otpRequired ? 'Verify OTP' : 'Get OTP') 
                                    : 'Login'
                            )}
                        </Button>
                        
                        {authMethod === 'otp' && otpRequired && (
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleGenerateOTP}
                                disabled={loading || countdown > 0}
                                sx={{ mb: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : countdown > 0 ? (
                                    `Resend OTP in ${countdown}s`
                                ) : (
                                    'Resend OTP'
                                )}
                            </Button>
                        )}
                        
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigate('/signup')}
                                    sx={{ mt: 2 }}
                                >
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                            {authMethod === 'password' && (
                                <Grid item>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => navigate('/reset-password')}
                                        sx={{ mt: 2 }}
                                    >
                                        Forgot Password?
                                    </Link>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;