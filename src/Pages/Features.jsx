import React from 'react'
import 'animate.css';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import bg from '../Assets/bg7.webp'
import { FaCirclePlay } from "react-icons/fa6";

const Features = () => {
    const token = localStorage.getItem('token')

    return (
        <>
            <div >
                <Nav />
                {token && <Sidenav />}
                <div className='main-feature-container01'>
                    <div className='main-feature-container1'>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'space-around', }}>
                                        <div style={{
                                            height: '250px', width: '100%', textAlign: 'center', backgroundImage: `url(${bg})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}>
                                            <h1 className='animate__animated  animate__fadeInLeftBig' style={{ color: '#d40d17', fontSize: 40, paddingBottom: '20px', paddingTop: '50px' }}>What We Provide ?</h1>
                                            <p className='animate__animated  animate__fadeInLeftBig' style={{ fontSize: 18 }}>Our plans are packed with the right features tailored to your unique business needs.</p>
                                            <p className='animate__animated  animate__fadeInLeftBig' style={{ fontSize: 18 }}>Switch plans at any time or choose from our expanding list of platform add-ons.</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <h1 className='animate__animated animate__bounce' style={{ color: '#d40d17' }}>All Features</h1>
                                            <div style={{
                                                backgroundColor: '#f0f0f0', backgroundSize: 'cover',
                                                backgroundPosition: 'center', padding: '40px', marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
                                            }}>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Unified Dashboard
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Provide users with a single dashboard to manage and monitor multiple social media accounts from different platforms.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Cross-Platform Posting
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            The ability to create and schedule posts across multiple social media networks simultaneously, optimizing posting times based on AI insights.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Content Suggestions
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            AI-driven content recommendations based on user interests, trending topics, and historical engagement data across different platforms
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Privacy and Security
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Implement robust privacy and security measures to protect user data and ensure compliance with each social media platform's policies.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Create a Post
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Use the tool to create a new post. You can write your message, add any media (e.g., images, videos), and include hashtags or mentions as needed
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Analytics and Insights
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Provide users with analytics and insights into their social media performance across different platforms, helping them understand their audience and improve their content strategy.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card className='bg_slider' sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider' >
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            AI Content Generation
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Implement advanced AI algorithms to provide personalized content recommendations based on user behavior, preferences, and interests. The AI can learn and adapt in real-time, offering more relevant and engaging content.                                 </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card className='bg_slider' sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider' >
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Theme Selection Interface
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Provide users with an interface where they can select and customize themes. This could include options for selecting color schemes, typography, layout styles, and other visual elements.                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{
                                                    width: 340, height: 'auto', margin: 1, borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-10px)',
                                                    },
                                                }}>
                                                    <CardContent className='bg_slider'>
                                                        <Typography sx={{ fontSize: 22, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                            Schedule And Post
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                            Plan and automate your social media posts with our Schedule and Post feature. Stay organized, manage your content, and engage your audience effortlessly with optimized timing and cross-platform integration.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div >
            <div className="icon-container">
                <Link to='/reference-video'><FaCirclePlay className="circle-icon" /></Link>
                <div className="hover-content">reference video</div>
            </div>
            <Footer />
        </>
    )
}

const Footer = () => {
    return (
        <Box p={2} textAlign="center" bgcolor="#ba343b">
            <Typography variant="body1" color='#fff' textAlign="center">
                &copy; {new Date().getFullYear()} Quantum Share. All rights reserved | <Link to='/privacy-policy' id="privacy">Privacy Policy</Link>
            </Typography>
        </Box>
    );
}

export default Features