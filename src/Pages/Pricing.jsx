/* eslint-disable no-unused-vars */
import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import axiosInstance from '../Helper/AxiosInstance';
import { FaCirclePlay } from "react-icons/fa6";

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    textAlign: 'center',
    margin: theme.spacing(2),
}));

const PricingContainer = styled('div')(({ theme }) => ({
    margin: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const Pricing = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleFreeTrialClick = () => {
        if (!token) {
            toast.error('Please Log In to Proceed.');
            navigate('/login');
            return;
        }
        navigate('/dashboard');
    };

    const endpoint = `/quantum-share/user/subscription/create/payment?amount=1507&packageName=standard`;

    const createOrder = async () => {
        try {
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            console.log(data);
            if (data.status === 'created' && data.code === 201) {
                return data.data;
            } else {
                throw new Error('Order creation failed');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            if (error.response && error.response.status === 401) {
                toast.error('Your session has expired. Please log in again.');
                navigate('/login');
            } else {
                toast.error('Failed to create order');
            }
            return null;
        }
    };

    const handlePayment = async () => {
        const orderData = await createOrder();
        if (!orderData) {
            toast.error('Failed to create order');
            return;
        }

        const options = {
            key: orderData.payment.key,
            amount: orderData.payment.amount * 100,
            packageName: orderData.payment.packageName,
            currency: orderData.payment.currency,
            name: orderData.payment.name,
            description: 'Test Transaction',
            image: orderData.payment.image,
            order_id: orderData.payment.order_id,
            handler: function (response) {
                let params = {
                    amount: orderData.payment.amount,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    packageName: orderData.payment.packageName,
                };
                axiosInstance.post('/quantum-share/user/payment/callback/handle', params, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: params,
                }).then((res) => {
                    console.log(res);
                    console.log(response.amount);
                }).catch((err) => {
                    console.error(err);
                });
            },
            prefill: {
                name: orderData.user.name,
                email: orderData.user.email,
                contact: orderData.user.contact,
            },
            notes: {
                address: orderData.user.address,
            },
            theme: {
                color: '#3399cc',
            },
        };

        try {
            const Razorpay = window.Razorpay;
            const rzp1 = new Razorpay(options);

            rzp1.on('payment.failed', function (response) {
                alert(`Error Code: ${response.error.code}`);
                alert(`Description: ${response.error.description}`);
                alert(`Source: ${response.error.source}`);
                alert(`Step: ${response.error.step}`);
                alert(`Reason: ${response.error.reason}`);
                alert(`Order ID: ${response.error.metadata.order_id}`);
                alert(`Payment ID: ${response.error.metadata.payment_id}`);
            });
            rzp1.open();
        } catch (error) {
            console.error('Error initializing Razorpay:', error);
            alert('Error initializing payment');
        }
    };

    return (
        <>
            <Nav />
            {token && <Sidenav />}
            <Box sx={{ marginTop: token ? '-3.2rem' : '-1rem' }}>
                <PricingContainer>
                    <SectionTitle variant="h4" align="center">
                        <h1 style={{ textAlign: 'center', color: '#ba343b', fontSize: '32px' }}>
                            Try Social Media free with a 15-days trial
                        </h1>
                    </SectionTitle>
                    <Grid container justifyContent="center" spacing={4}>
                        <Grid item xs={12} sm={6} md={4} >
                            <StyledPaper sx={{ backgroundColor: "#fcf8f8", }}>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography gutterBottom sx={{ textAlign: "start", fontSize: "22px", fontWeight: "bold" }}>
                                        Free Trial Plan
                                    </Typography>
                                </Grid>
                                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: "start" }}>
                                    No annual billing
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ textAlign: "start" }}>
                                    <span style={{ fontSize: "22px", color: "#b43f4f" }}>$</span><div style={{ marginTop: "-52px", marginLeft: "12px" }}><span style={{ fontSize: "56px", color: "#b43f4f", fontWeight: "bold" }}>0</span><span style={{ color: "#a3a3a5" }}>/month</span></div>
                                </Typography>
                                <Button variant="contained" onClick={handleFreeTrialClick} sx={{ width: "200px", background: "#fcf8f8", color: "#b43f4f", boxShadow: "none", border: "1px solid #b43f4f", fontSize: '16px', fontWeight: '600', marginTop: '-5px', '&:hover': { background: 'none' }}} > 
                                    Start a free trial
                                </Button>
                                <Typography variant="body2" style={{ marginTop: '16px', marginBottom: "20px", fontSize: '14px', fontWeight: '600' }} >
                                    No credit card required.
                                </Typography>
                                <Typography variant="subtitle1" style={{ marginTop: '8px', textAlign: "start", fontSize: '18px', fontWeight: '600' }}>
                                    Includes :
                                </Typography>
                                <Grid container spacing={1} sx={{ marginTop: '5px' }} >
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }} >Connect 3 Social Media Profiles</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Planning & Publishing</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Unified User Dashboard</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>3 Credits per day</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Language Translator</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CancelIcon style={{ color: 'red' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>AI Assistant</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CancelIcon style={{ color: 'red' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Advanced Analytics</Typography>
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StyledPaper sx={{ backgroundColor: "#fcf8f8" }}>
                                <Grid item xs={12} sm={12} md={12} sx={{ backgroundColor: "#fcf8f8", display: "grid", gridTemplateColumns: "auto auto" }}>
                                    <Typography gutterBottom sx={{ textAlign: "start", fontSize: "22px", fontWeight: "bold", marginBottom: "0px" }}>
                                        Standard Plan
                                    </Typography>
                                </Grid>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontSize: "25px", textAlign: "start", marginBottom: "0px" }}>
                                    ****
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ textAlign: "start" }}>
                                    <span style={{ fontSize: "22px", color: "#b43f4f" }}>$</span><div style={{ marginTop: "-52px", marginLeft: "12px" }}><span style={{ fontSize: "56px", color: "#b43f4f", fontWeight: "bold" }}>14</span><span style={{ color: "#a3a3a5" }}>/month</span></div>
                                </Typography>
                                <Button variant="contained" onClick={handlePayment} sx={{ width: "200px", background: "#b43f4f", color: "white", boxShadow: "none", fontSize: '16px', fontWeight: '600', marginTop: '-5px' }} disabled >
                                    Buy now
                                </Button>
                                <Typography variant="body2" style={{ marginTop: '16px', marginBottom: "20px", fontSize: '14px', fontWeight: '600' }} >
                                    No credit card required.
                                </Typography>
                                <Typography variant="subtitle1" style={{ marginTop: '8px', textAlign: "start", fontSize: '18px', fontWeight: '600' }}>
                                    Includes :
                                </Typography>
                                <Grid container spacing={1} sx={{ marginTop: '5px' }}>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Connect 3 Social Media Profiles</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Planning & Publishing</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Unified User Dashboard</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Unlimited Credits per day</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Language Translator</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>AI Assistant</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" sx={{ textAlign: "start", paddingLeft: "25px", fontSize: '16px', fontWeight: '600' }}>Advanced Analytics</Typography>
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </PricingContainer>
            </Box>
            <div className="icon-container">
                <Link to='/reference-video'><FaCirclePlay className="circle-icon" /></Link>
                <div className="hover-content">reference video</div>
            </div>
            <Footer />
        </>
    );
};

const Footer = () => {
    return (
        <Box p={2} textAlign="center" bgcolor="#ba343b">
            <Typography variant="body1" color='#fff' textAlign="center">
                &copy; {new Date().getFullYear()} Quantum Share. All rights reserved | <Link to='/privacy-policy' id="privacy">Privacy Policy</Link>
            </Typography>
        </Box>
    );
}

export default Pricing;