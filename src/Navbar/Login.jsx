/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom"
import Paper from '@mui/material/Paper';
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
import { useDispatch } from 'react-redux';
import { FetchUser } from '../Redux/FetchUser';
import QS from '../Assets/QS.webp';

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
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        emph: '',
        password: '',
        rememberMe: false,
    });
    const [isOpen, setIsOpen] = React.useState(true);
    const [errors, setErrors] = React.useState({});
    const { emph, password } = formData;
    const [passwordVisible, setPasswordVisible] = React.useState(false);

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
        const params = {
            emph: formData.emph,
            password: formData.password,
        };
        const endpoint = '/quantum-share/user/login';
        try {
            const response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    'Accept': 'application/json',
                },
                params: params,
            });
            sessionStorage.setItem('token', response.data.data);
            navigate('/dashboard');
            await FetchUser(dispatch)
        } catch (error) {
            console.error('Error submitting:', error);
            toast.error(error.response.data.message);
        }
    };

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
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], position: 'relative'
                    }}>
                        <video autoPlay loop muted={isMuted} style={{ width: '100%', height: '100%' }} src="https://quantumshare.quantumparadigm.in/vedio/SocialMedia.mp4"></video>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <img src={QS} alt="" style={{ position: 'absolute', top: '20px', left: '15px', height: 30 }} />
                            <IconButton onClick={toggleMute} style={{ position: 'absolute', top: '10px', right: '5px', color: '#BA343B' }}>
                                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                            </IconButton>
                        </Box>
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
                            <Typography component="h1" variant="h6">
                                Login
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Grid container spacing={0} justifyContent="center">
                                    <Grid item xs={10}>
                                        <TextField margin="normal" required fullWidth id="emph" label="E-mail / Phone Number" name="emph" value={emph} onChange={handleChange} error={!!errors.emph} helperText={errors.emph} autoFocus />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField margin="normal" required fullWidth name="password" label="Password" type={passwordVisible ? 'text' : 'password'} id="password" value={password} onChange={handleChange} error={!!errors.password} helperText={errors.password} autoComplete="current-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={togglePasswordVisibility}>
                                                            {passwordVisible ? <VisibilityOutlinedIcon /> : < VisibilityOffOutlinedIcon />} </IconButton>
                                                    </InputAdornment>
                                                )
                                            }} />
                                    </Grid>
                                    <Grid item xs={10} sx={{ textAlign: 'right' }}>
                                        <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976db', fontSize: 15 }}>
                                            Forgot Password ?
                                        </Link>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Button type="submit" fullWidth variant="contained"
                                            sx={{
                                                mb: 1, height: '50px', marginTop: '40px', fontSize: '18px', bgcolor: '#ba343b',
                                                '&:hover': { bgcolor: '#9e2b31' }
                                            }}> Log In
                                        </Button>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
                                            By signing up, you agree to the <Link to='/privacy-policy' style={{ textDecoration: 'none', color: '#1976db' }}>Privacy Policy</Link> of Quantum Share.
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item>
                                        <div style={{ marginTop: '40px' }}>
                                            <Link to="/signUp">
                                                <div variant="body2" style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>
                                                    Don't have an account ?{' '}
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