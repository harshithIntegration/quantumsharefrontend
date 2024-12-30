/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, TextField, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QS from '../Assets/QS.webp';
import axiosInstance from '../Helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogContentText, Button, IconButton, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { Link    } from 'react-router-dom';

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
    const [isSessionExpired, setIsSessionExpired] = useState(false);

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
            if (error.response?.data?.code === 121) {
                setIsSessionExpired(true); // Show session expired dialog
                localStorage.removeItem('token');
            }else if (error.response && error.response.data) {
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
                    p: { xs: 2, sm: 4 }, 
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    filter: successModalOpen ? 'blur(4px)' : 'none',
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 2, right: 2, color: '#ba343b' }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2,
                    }} >
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }} >
                        <img src={QS} alt="" style={{ height: 35, marginTop: '5px' }} />
                    </Typography>
                </Box>
                <Typography variant="h6" component="h2" textAlign="start" >
                    {t('findQuantumShareAccount')}
                </Typography>
                <Typography
                    variant="body2"
                    textAlign="start"
                    sx={{ margin: '5px 0', color: 'gray' }}
                >
                    {t('enterEmailToChangePassword')}
                </Typography>
                <TextField
                    margin="normal" required fullWidth
                    label="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    error={!!error || !!emailError}
                    helperText={error || emailError}
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
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleNext}
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
                    disabled={!email || loading}
                >
                    {loading ? <TailSpin color="#ba343b" height={25} width={25} /> : 'Next'}
                </Button>
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
                            width: { xs: 300, sm: 400 }, 
                            bgcolor: 'white',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <Typography id="success-modal-title" variant="h6" component="h2" sx={{ color: 'green' }} >
                            {t('emailSent')}
                        </Typography>
                        <Typography id="success-modal-description" sx={{ mt: 2 }} >
                            {t('resetPasswordLinkSent')} <b style={{ color: '#ba343b' }}>{submittedEmail}</b>
                        </Typography>
                        <Button
                            onClick={handleSuccessModalClose}
                            sx={{
                                mt: 5,
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
            </Box>
            <Dialog open={isSessionExpired} aria-labelledby="alert-dialog-title" PaperProps={{ sx: { backgroundColor: '#ffffff', width: '40vw', height: '30vh' } }}>
                <DialogContent sx={{ backgroundColor: '#ffffff' }}>
                    <DialogContentText sx={{ color: 'black', display: 'flex', fontSize: '20px', alignItems: 'center' }}>
                        <IconButton>
                            <WarningIcon
                                style={{ color: 'orange', cursor: 'pointer', marginTop: '5px', fontSize: '40px', }}
                            />
                        </IconButton>
                        <div>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Your session has expired</Typography>
                            <Typography sx={{ fontSize: '20px', position: 'relative', top: '5px' }}>Please log in again to continue using the app</Typography>
                        </div>
                    </DialogContentText>

                    <DialogContentText sx={{ backgroundColor: '#ffffff', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                        <Link to="/login">
                            <Button sx={{ color: '#ba343b', fontSize: '15px', fontWeight: '600', border: '1px solid #ba343b', margin: '18px auto' }} variant="outlined">
                                Login</Button>
                        </Link>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ForgotPassword;