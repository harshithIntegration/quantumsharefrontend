/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Helper/AxiosInstance';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { toast, ToastContainer } from 'react-toastify';

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

const Login = () => {
    let navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        emph: '',
        password: '',
        rememberMe: false,
    });
    const [isOpen, setIsOpen] = React.useState(true);
    const [errors, setErrors] = React.useState({});
    const { emph, password } = formData;

    const handleCloseSignUp = () => {
        setIsOpen(false);
        navigate("/")
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let params = {
            emph: formData.emph,
            password: formData.password
        };
        var response
        const endpoint = '/quantum-share/user/login';
        try {
            response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    'Accept': 'application/json',
                },
                params: params
            })
            localStorage.setItem('token', response.data.data);
            // toast.success("Successfully loggedin.");
            navigate("/dashboard")
        }
        catch (error) {
            toast.error(error.response.data.message);
            console.error('Error submitting:', error);
        }
    }

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const [isMuted, setIsMuted] = React.useState(true);
    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {isOpen && (
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
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <CloseOutlinedIcon style={{
                                position: 'absolute', top: 0, right: 0,
                                fontSize: 30, color: '#ba343b', cursor: 'pointer',
                            }}
                                onClick={handleCloseSignUp} />
                            <Avatar sx={{ m: 1, bgcolor: '#ba343b' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Login</Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField margin="normal" required fullWidth id="emph" label="E-mail / Phone Number" name="emph" value={emph} onChange={handleChange} error={!!errors.emph} helperText={errors.emph} autoFocus />
                                <TextField margin="normal" required fullWidth name="password" label="Password" type={passwordVisible ? 'text' : 'password'} id="password" value={password} onChange={handleChange} error={!!errors.password} helperText={errors.password} autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility}>
                                                    {passwordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />} </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />
                                <Button type="submit" fullWidth variant="contained"
                                    sx={{ mt: 3, mb: 2, height: '50px', marginTop:'60px', fontSize: '18px', bgcolor: '#ba343b',
                                        '&:hover': { bgcolor: '#9e2b31' }
                                    }}> Log In</Button>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Grid item>
                                        <div style={{ marginTop: '40px' }}>
                                            <Link to="/signUp">
                                                <div variant="body2" style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>
                                                    Don't Have An Account?{' '}
                                                    <span style={{ color: '#1976db' }}>Sign Up</span>
                                                </div>
                                            </Link>
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

export default Login;