import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    LinearProgress,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1); // 1: email, 2: OTP & new password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [otpExpiryTime, setOtpExpiryTime] = useState(0);

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

    const validatePassword = () => {
        if (!formData.newPassword) {
            setErrors(prev => ({ ...prev, newPassword: 'Password is required' }));
            return false;
        }
        if (formData.newPassword.length < 6) {
            setErrors(prev => ({ ...prev, newPassword: 'Password must be at least 6 characters long' }));
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
            setErrors(prev => ({ ...prev, newPassword: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' }));
            return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            return false;
        }
        setErrors(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
        return true;
    };

    const handleRequestOTP = async () => {
        if (!validateEmail()) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('OTP sent to your email');
                setStep(2);
                setOtpExpiryTime(data.expires_in);
                setCountdown(60); // 1 minute cooldown for resend
            } else {
                toast.error(data.error);
                setErrors(prev => ({ ...prev, email: data.error }));
            }
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
            setErrors(prev => ({ ...prev, submit: 'Failed to send OTP' }));
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!validatePassword()) return;
        if (!formData.otp) {
            setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/verify-reset-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    otp: formData.otp,
                    new_password: formData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Password reset successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(data.error);
                setErrors(prev => ({ ...prev, otp: data.error }));
            }
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
            setErrors(prev => ({ ...prev, submit: 'Failed to reset password' }));
        } finally {
            setLoading(false);
        }
    };

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (!password) return 0;

        // Length check
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 10;

        // Character variety checks
        if (/[A-Z]/.test(password)) score += 20;
        if (/[a-z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 10;

        return Math.min(100, score);
    };

    const getStrengthColor = (strength) => {
        if (strength < 40) return 'error';
        if (strength < 70) return 'warning';
        return 'success';
    };

    const getStrengthLabel = (strength) => {
        if (strength < 40) return 'Weak';
        if (strength < 70) return 'Medium';
        return 'Strong';
    };

    const getPasswordRequirements = () => {
        const requirements = [
            { text: 'At least 6 characters long', met: formData.newPassword.length >= 6 },
            { text: 'Contains at least one uppercase letter', met: /[A-Z]/.test(formData.newPassword) },
            { text: 'Contains at least one lowercase letter', met: /[a-z]/.test(formData.newPassword) },
            { text: 'Contains at least one number', met: /\d/.test(formData.newPassword) },
            { text: 'Passwords match', met: formData.newPassword && formData.newPassword === formData.confirmPassword }
        ];
        return requirements;
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Reset Password
                </Typography>

                <Box component="form" sx={{ mt: 3 }}>
                    {step === 1 ? (
                        <>
                            <TextField
                                fullWidth
                                label="IITRPR Email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, email: e.target.value }));
                                    setErrors(prev => ({ ...prev, email: '' }));
                                }}
                                error={!!errors.email}
                                helperText={errors.email}
                                disabled={loading}
                                margin="normal"
                                placeholder="username@iitrpr.ac.in"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleRequestOTP}
                                disabled={loading}
                                sx={{ mt: 3 }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Request OTP'}
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="Enter OTP"
                                value={formData.otp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setFormData(prev => ({ ...prev, otp: value }));
                                    setErrors(prev => ({ ...prev, otp: '' }));
                                }}
                                error={!!errors.otp}
                                helperText={errors.otp || `OTP expires in ${Math.ceil(otpExpiryTime / 60)} minutes`}
                                margin="normal"
                                disabled={loading}
                            />

                            <TextField
                                fullWidth
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, newPassword: e.target.value }));
                                    setErrors(prev => ({ ...prev, newPassword: '' }));
                                }}
                                error={!!errors.newPassword}
                                helperText={errors.newPassword}
                                margin="normal"
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {formData.newPassword && (
                                <>
                                    <Box sx={{ mt: 2, mb: 1 }}>
                                        <Typography variant="body2" gutterBottom>
                                            Password Strength: {getStrengthLabel(calculatePasswordStrength(formData.newPassword))}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={calculatePasswordStrength(formData.newPassword)}
                                            color={getStrengthColor(calculatePasswordStrength(formData.newPassword))}
                                            sx={{ height: 8, borderRadius: 4 }}
                                        />
                                    </Box>
                                    <List dense sx={{ mt: 1, mb: 1 }}>
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
                                </>
                            )}

                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                                }}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                margin="normal"
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleResetPassword}
                                disabled={loading}
                                sx={{ mt: 3 }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleRequestOTP}
                                disabled={loading || countdown > 0}
                                sx={{ mt: 2 }}
                            >
                                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                            </Button>
                        </>
                    )}

                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/login')}
                        sx={{ mt: 2 }}
                    >
                        Back to Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PasswordReset; 