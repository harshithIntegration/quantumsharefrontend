/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QS from '../Assets/QS.webp';
import axiosInstance from '../Helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(true);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');
    const {t} = useTranslation('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleClose = () => {
        setOpen(false);
        navigate("/login");
    };

    const handleSuccessModalClose = () => {
        setSuccessModalOpen(false);
        navigate("/login");
    };

    const handleNext = async () => {
        setEmailError('');
        setError('');
        setLoading(true);

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(`/quantum-share/user/forgot/password/request`, {
                params: { email }
            });
            if (response.data.status === 'success') {
                setSubmittedEmail(formatEmail(email));
                setSuccessModalOpen(true);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    const formatEmail = (email) => {
        const [username, domain] = email.split('@');
        const maskedUsername = username.length > 5
            ? username.slice(0, -5) + '*****'
            : 'XXXXX';
        return `${maskedUsername}@${domain}`;
    };

    return (
        <>
            <Box
                maxWidth="sm"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '80%', md: '70%' },
                    height: { xs: 'auto', md: 'auto' },
                    maxHeight: '90vh',
                    bgcolor: 'white',
                    color: '#1C1C1C',
                    boxShadow: 5,
                    p: { xs: 2, sm: 4 },
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    filter: successModalOpen ? 'blur(4px)' : 'none',
                    overflowY: 'auto',
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8, color: '#ba343b' }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2
                        }}>
                        <img src={QS} alt="" style={{ height: 35 }} />
                    </Typography>
                    <Typography sx={{ color: '#ba343b', fontSize: '20px', textAlign: 'center' }}>
                        {t('findQuantumShareAccount')}
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="center"
                        sx={{ margin: '10px 0', color: 'gray' }}
                    >
                        {t('enterEmailToChangePassword')}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 2 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="E-mail"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!error || !!emailError}
                                    helperText={error || emailError}
                                    InputProps={{
                                        sx: {
                                            height: '50px',
                                            padding: '0 10px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '14px',
                                        },
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        bgcolor: '#ba343b',
                                        color: 'white',
                                        height: 50,
                                        fontSize: 16,
                                        mt: 3,
                                        '&:hover': { bgcolor: '#9e2b31' },
                                        '&:disabled': { bgcolor: '#e0e0e0', color: '#a0a0a0' },
                                    }}
                                    disabled={!email || loading}
                                >
                                    {loading ? <TailSpin color="#ba343b" height={25} width={25} /> : 'Next'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box >
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModalClose}
                aria-labelledby="success-modal-title"
                aria-describedby="success-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 400 }, 
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}
                >
                    <Typography id="success-modal-title" variant="h6" component="h2" sx={{ color: 'green' }}>
                        {t('emailSent')}
                    </Typography>
                    <Typography
                        id="success-modal-description"
                        sx={{
                            mt: 2,
                            wordWrap: 'break-word', 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'normal', 
                        }}
                    >
                        {t('resetPasswordLinkSent')} <b style={{ color: '#ba343b' }}>{submittedEmail}</b>
                    </Typography>
                    <Button
                        onClick={handleSuccessModalClose}
                        sx={{
                            mt: 3,
                            bgcolor: '#ba343b',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#9e2b31',
                            },
                        }}
                    >
                        {t('close')}
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ForgotPassword;