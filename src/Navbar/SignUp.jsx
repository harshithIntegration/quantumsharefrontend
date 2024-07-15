/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, InputAdornment } from '@mui/material';
import axiosInstance from '../Helper/AxiosInstance';
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const defaultTheme = createTheme({
    typography: {
        h1: {
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '1rem',
        },
    },
});

const SignUp = () => {
    let navigate = useNavigate()
    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        password: '',
        confirm_password: '',
        company: ''
    });
    let [errors, setErrors] = useState([])
    const [signupOpen, setsignupOpen] = useState(true);
    let [passwordVisible, setPasswordVisible] = useState(false);
    let [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    let { firstName, lastName, email, phoneNo, password, confirm_password, company } = formData

    const handleCloseSignUp = () => {
        setsignupOpen(false);
        navigate("/")
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'phoneNo' && !isNaN(value)) {
            setFormData({
                ...formData, [name]: value
            });
        } else {
            setFormData({
                ...formData, [name]: value
            });
        }
    };

    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        if (!formData || formData.firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
        }
        if (!formData || formData.lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData || formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        }
        const phoneRegex = /^\d{10}$/;
        if (!formData || !phoneRegex.test(formData.phoneNo.trim())) {
            newErrors.phoneNo = 'Please enter a valid 10-digit phone number';
        }
        if (!formData || formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        } else if (!isPasswordValid(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character';
        }
        if (!formData || formData.confirm_password.trim() === '') {
            newErrors.confirm_password = 'Confirm Password is required';
        } else if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const loadingToast = toast.loading("Signing Up..........")

            let payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNo: formData.phoneNo,
                password: formData.password,
                company: formData.company
            };

            const endpoint = '/quantum-share/user/signup';
            try {
                const response = await axiosInstance.post(endpoint, payload, {
                    headers: {
                        'Accept': 'application/json',
                        'method': 'POST'
                    }
                });
                toast.success("Successfully signed up, please verify your email.");
                toast.dismiss(loadingToast);
                navigate("/verify");
            } catch (error) {
                console.error('Error submitting:', error);
                toast.dismiss(loadingToast);
                if (error.response) {
                    const status = error.response.status;
                    if (status === 406) {
                        console.log("Account already exists.");
                        toast.error("Account already exists.");
                    } else if (status === 500) {
                        console.log("Mail server connection failed. Please check your internet connection.");
                        toast.error("Mail server connection failed. Please check your internet connection.");
                    }
                }
            }
        }
    }

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#^@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const EndAdornment = ({ visible, setVisible }) => {
        return (
            <InputAdornment position='end'>
                <IconButton onClick={() => setVisible(!visible)}>
                    {visible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
            </InputAdornment>
        )
    }

    const [isMuted, setIsMuted] = React.useState(true);
    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {signupOpen && (
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} sx={{
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    }}>
                        <video autoPlay loop muted={isMuted} style={{ width: '100%', height: '100%' }} src="https://quantumshare.quantumparadigm.in/vedio/SocialMedia.mp4"></video>
                        <IconButton onClick={toggleMute} style={{ position: 'absolute', left: '10px', color: '#BA343B' }}>
                            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} component={Paper} square>
                        <Box
                            sx={{ my: -0.5, mx: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <CloseOutlinedIcon style={{
                                position: 'absolute', top: 0, right: 0,
                                fontSize: 30, color: '#ba343b', cursor: 'pointer',
                            }}
                                onClick={handleCloseSignUp} />
                            <Avatar sx={{ m: 1, bgcolor: '#ba343b' }}>

                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5"> Signup</Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus value={firstName}
                                            onChange={handleChange}
                                            error={!!errors.firstName}
                                            helperText={errors.firstName} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" value={lastName}
                                            onChange={handleChange}
                                            error={!!errors.lastName}
                                            helperText={errors.lastName} />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email}
                                            onChange={handleChange}
                                            error={!!errors.email}
                                            helperText={errors.email} />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required fullWidth name="phoneNo" label="Phone Number" id="phoneNo" value={phoneNo}
                                            onChange={handleChange}
                                            error={!!errors.phoneNo}
                                            helperText={errors.phoneNo} />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required fullWidth name="password" label="Password" type={passwordVisible ? 'text' : 'password'} id="password" autoComplete="new-password" value={password}
                                            onChange={handleChange}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <EndAdornment
                                                        visible={passwordVisible}
                                                        setVisible={handleTogglePasswordVisibility}
                                                    />)
                                            }} />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required fullWidth name="confirm_password" label="Confirm Password" type={confirmPasswordVisible ? 'text' : 'password'} id="confirm_password" autoComplete="new-password" value={confirm_password}
                                            onChange={handleChange}
                                            error={!!errors.confirm_password}
                                            helperText={errors.confirm_password}
                                            InputProps={{
                                                endAdornment: (
                                                    <EndAdornment
                                                        visible={confirmPasswordVisible}
                                                        setVisible={handleToggleConfirmPasswordVisibility}
                                                    />)
                                            }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth name="company" label="Company Name" id="company" value={company} onChange={handleChange} />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3, mb: 2, height: '50px', fontSize: '18px', bgcolor: '#ba343b',
                                        '&:hover': { bgcolor: '#9e2b31' }
                                    }}>
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <div style={{ marginTop: '10px' }}>

                                            <div variant="body2" style={{ color: 'black' }}>
                                                Already have an account?{' '}
                                                <Link to="/login">
                                                    <span style={{ color: '#1976db' }}>Sign In</span>
                                                </Link>
                                            </div>

                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
            <ToastContainer />
        </ThemeProvider>
    );
}

export default SignUp;