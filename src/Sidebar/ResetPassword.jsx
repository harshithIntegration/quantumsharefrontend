/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QS from '../Assets/QS.webp';
import axiosInstance from '../Helper/AxiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [open, setOpen] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setToken(query.get('token') || '');
    }, [location.search]);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
        navigate("/forgot-password");
    };

    const handleUpdate = async () => {
        setPasswordError('');
        setConfirmPasswordError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.');
            setLoading(false);
            return;
        }
        try {
            const response = await axiosInstance.post(`/quantum-share/user/update/password/request`, null, {
                params: {
                    token: token,
                    password: password
                }
            });
            if (response.data.status === 'success') {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Error updating password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400, md: 500 }, 
                    height: { xs: '80vh', md: '90vh' }, 
                    bgcolor: 'white',
                    color: '#1C1C1C',
                    boxShadow: 5,
                    p: 4,
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 2, right: 2, color: '#ba343b' }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            <img src={QS} alt="" style={{ height: 35, marginTop: '5px' }} />
                        </Typography>
                    </Box>
                    <Typography variant="h6" component="h2" textAlign="start">
                        Reset your Password
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="start"
                        sx={{ margin: '5px 0', color: 'gray' }}
                    >
                        Enter your new password and confirm it to reset your password for Quantum Share application.
                    </Typography>
                    <TextField
                        margin="normal" required fullWidth
                        label="New Password"
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                        autoFocus
                        sx={{
                            bgcolor: 'white',
                            marginTop: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ba343b',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'gray',
                                },
                            },
                            '& input': {
                                color: '#2C2C2C',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal" required fullWidth
                        label="Confirm New Password"
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                        sx={{
                            bgcolor: 'white',
                            marginBottom: { xs: 10, md: 28 },
                            marginTop: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ba343b',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'gray',
                                },
                            },
                            '& input': {
                                color: '#2C2C2C',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                                        {confirmPasswordVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleUpdate}
                    sx={{
                        bgcolor: '#ba343b',
                        color: 'white',
                        height: 50,
                        fontSize: 16,
                        borderRadius: '25px',
                        '&:hover': {
                            bgcolor: '#9e2b31',
                        },
                        mt: 2,
                        '&:disabled': {
                            bgcolor: '#e0e0e0',
                            color: '#a0a0a0',
                        }
                    }}
                    disabled={!password || !confirmPassword || loading}
                >
                    {loading ? <TailSpin color="#ba343b" height={25} width={25} /> : 'Update'}
                </Button>
            </Box>
            <ToastContainer />
        </>
    );
};

export default ResetPassword;