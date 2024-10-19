import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import 'animate.css';
import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import bg from '../Assets/bg7.webp';
import { FaCirclePlay } from "react-icons/fa6";

const Features = () => {
    const token = sessionStorage.getItem('token');
    const theme = useTheme();

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Quantum Share Features - Streamline Your Social Media Management with AI-Powered Tools</title>
                    <meta name="description" content="Explore the powerful features of Quantum Share, designed to simplify and elevate your social media experience. Manage multiple accounts with a unified dashboard, schedule posts across platforms with AI-driven insights, and receive personalized content recommendations. Our platform ensures privacy and security, offers advanced analytics, AI content generation, and customizable themes, all in one seamless interface. Stay ahead with tools that optimize your strategy, save time, and enhance audience engagement." />
                    <link rel="canonical" href='/Features' />
                </Helmet>
            </HelmetProvider>
            <div>
                <Nav />
                {token && <Sidenav />}
                <div className='main-feature-container01'>
                    <div className='main-feature-container1'>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div style={{
                                            height: 'auto',
                                            width: '100%',
                                            textAlign: 'center',
                                            backgroundImage: `url(${bg})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            padding: '50px 20px',
                                            paddingLeft: '50px'
                                        }}>
                                            <h1 className='animate__animated animate__fadeInLeftBig'
                                                style={{
                                                    color: '#d40d17',
                                                    fontSize: '2.5rem',
                                                    paddingBottom: '20px'
                                                }}>
                                                What We Provide?
                                            </h1>
                                            <Typography className='animate__animated animate__fadeInLeftBig'
                                                variant="body1"
                                                sx={{
                                                    fontSize: { xs: '1rem', md: '1.2rem' }
                                                }}>
                                                Our plans are packed with the right features tailored to your unique business needs.
                                            </Typography>
                                            <Typography className='animate__animated animate__fadeInLeftBig'
                                                variant="body1"
                                                sx={{
                                                    fontSize: { xs: '1rem', md: '1.2rem' }
                                                }}>
                                                Switch plans at any time or choose from our expanding list of platform add-ons.
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <h1 className='animate__animated animate__bounce'
                                                style={{ color: '#d40d17', fontSize: '2rem' }}>
                                                All Features
                                            </h1>
                                            <Box sx={{
                                                backgroundColor: '#f0f0f0',
                                                padding: { xs: '20px', md: '40px' },
                                                marginTop: '20px',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                gap: 2
                                            }}>
                                                {featureCards.map((feature, index) => (
                                                    <Card key={index} sx={{
                                                        width: '100%',
                                                        maxWidth: 340,
                                                        borderRadius: '8px',
                                                        marginLeft: '10px',
                                                        transition: 'transform 0.3s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-10px)',
                                                        },
                                                        [theme.breakpoints.down('sm')]: {
                                                            maxWidth: '100%',
                                                        }
                                                    }}>
                                                        <CardContent className='bg_slider'>
                                                            <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', fontWeight: 'bold' }} gutterBottom>
                                                                {feature.title}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                                {feature.description}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </Box>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
            <Box className="icon-container" sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Link to='/reference-video'><FaCirclePlay className="circle-icon" /></Link>
                <Typography className="hover-content">reference video</Typography>
            </Box>
            <Footer />
        </>
    );
}

const Footer = () => {
    return (
        <Box p={2} textAlign="center" bgcolor="#ba343b">
            <Typography variant="body1" color='#fff'>
                &copy; {new Date().getFullYear()} Quantum Share. All rights reserved | <Link to='/privacy-policy' id="privacy">Privacy Policy</Link>
            </Typography>
        </Box>
    );
};

const featureCards = [
    {
        title: 'Unified Dashboard',
        description: 'Provide users with a single dashboard to manage and monitor multiple social media accounts from different platforms.'
    },
    {
        title: 'Cross-Platform Posting',
        description: 'The ability to create and schedule posts across multiple social media networks simultaneously, optimizing posting times based on AI insights.'
    },
    {
        title: 'Content Suggestions',
        description: 'AI-driven content recommendations based on user interests, trending topics, and historical engagement data across different platforms.'
    },
    {
        title: 'Privacy and Security',
        description: 'Implement robust privacy and security measures to protect user data and ensure compliance with each social media platform\'s policies.'
    },
    {
        title: 'Create a Post',
        description: 'Use the tool to create a new post. You can write your message, add any media (e.g., images, videos), and include hashtags or mentions as needed.'
    },
    {
        title: 'Analytics and Insights',
        description: 'Provide users with analytics and insights into their social media performance across different platforms, helping them understand their audience and improve their content strategy.'
    },
    {
        title: 'AI Content Generation',
        description: 'Implement advanced AI algorithms to provide personalized content recommendations based on user behavior, preferences, and interests.'
    },
    {
        title: 'Theme Selection Interface',
        description: 'Provide users with an interface where they can select and customize themes, including options for color schemes, typography, and layout styles.'
    },
    {
        title: 'Schedule And Post',
        description: 'Plan and automate your social media posts with our Schedule and Post feature. Stay organized, manage content, and engage your audience effortlessly.'
    }
];

export default Features;