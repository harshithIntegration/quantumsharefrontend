/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import Nav from "../Navbar/Nav"
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { FaCirclePlay } from "react-icons/fa6";
import { Dialog, DialogContent } from "@mui/material";
import { IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import why from '../Assets/soc.webp'
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import sto from '../Assets/ais.webp'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { CgPlayButtonO } from "react-icons/cg";

const About = () => {
    const token = sessionStorage.getItem('token')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [isMuted, setIsMuted] = React.useState(false);
    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Quantum Share - Revolutionizing Social Media & File Sharing with Security & Simplicity</title>
                    <meta name="description" content="Quantum Share offers a seamless and secure way to share files and posts across social media. Revolutionize your sharing experience with our easy-to-use, privacy-focused platform." />
                    <link rel="canonical" href='/About' />
                </Helmet>
            </HelmetProvider>
            <div>
                <Nav />
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                        {token && <Sidenav />}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{
                                    height: '600px', width: '100%', backgroundImage: `url(${sto})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center', textAlign: 'left',
                                }}>
                                    <div style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px', paddingRight: '50px', paddingLeft: '10px' }}>
                                        <p style={{ color: 'white', fontSize: '2rem', margin: '0' }}>Revolutionize Your</p>
                                        <p style={{ color: 'white', fontSize: '2rem', margin: '20px 0' }}>Social Sharing Experience</p>
                                        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
                                            <Typography style={{ color: 'white' }}>With Quantum Share, we aim to streamline this process and empower users like you to effortlessly distribute content, connect with others, and amplify your online presence.</Typography>
                                        </div>
                                    </div>
                                    <Typography sx={{ fontSize: 15, fontWeight: '400', paddingTop: '20px', marginLeft: '5%' }} gutterBottom>
                                        <span style={{ borderRadius: '3px ', backgroundColor: '#ba343b', color: 'white', marginLeft: '10px', height: '35px', padding: '15px', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>Watch Now</span>
                                        <IconButton>
                                            <CgPlayButtonO className='homeCgPlayButtonO' onClick={handleClickOpen} />
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogContent>
                                                    <video autoPlay loop muted={isMuted} style={{ width: '100%', height: 'auto' }}>
                                                        <source src="https://quantumshare.quantumparadigm.in/vedio/QP%20ADD%20VDIEO%202024.mp4" type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <IconButton onClick={toggleMute} style={{ position: 'absolute', left: '10px', color: '#BA343B' }}>
                                                        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                                    </IconButton>
                                                </DialogContent>
                                            </Dialog>
                                        </IconButton>
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} sx={{ paddingTop: "15px", backgroundColor: "#1c0205" }}>
                                <Grid item xs={12} md={12} lg={12} sx={{ textAlign: 'start' }}>
                                    <h1 style={{ color: 'white', marginLeft: "30px", paddingBottom: "30px", paddingTop: "30px" }}>Why Choose Quantum Share?</h1>
                                </Grid>
                                <div style={{ display: 'flex', marginLeft: "30px", marginRight: "40px" }}>
                                    <div>
                                        <Typography style={{ color: 'white', fontSize: '18px' }}> Quantum Share is the ultimate solution for seamless social media
                                            sharingmultiple social This powerful platform simplifies the process of
                                            publishing your creative content across media channels simultaneously.
                                            Whether you are a digital artist, content creator, marketer, or business
                                            Quantum Share empowers you to effortlessly reach your audience.</Typography>
                                    </div>
                                </div>
                                <div><p style={{ color: 'white', border: '2px solid white', width: '150px', height: '40px', fontFamily: 'Poppins', fontSize: 16, borderRadius: '5px', textAlign: 'center', marginTop: '5%', paddingTop: '7px', marginLeft: '5%' }}>Request a demo</p></div>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "#1c0205", paddingBottom: "0px" }}>
                                <img style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "auto", marginRight: 'auto' }} src={why} alt="image" />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ textAlign: 'center', marginTop: '20px', paddingLeft: '4px', paddingRight: '50px' }}>
                                    <p style={{ color: '#d3040c', fontSize: '32px', fontWeight: '600', margin: '0' }}>
                                        Functionalities of Quantum Share
                                    </p>
                                    <div
                                        style={{
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            padding: '40px',
                                            marginTop: '5px',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            paddingRight: '15px',
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                width: 290,
                                                height: 'auto',
                                                margin: '1rem auto',
                                                border: '1px solid #bd1a1d',
                                                borderRadius: '8px',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-10px)',
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <LinkRoundedIcon
                                                    style={{
                                                        color: 'white',
                                                        width: '35px',
                                                        height: '35px',
                                                        backgroundColor: '#bd1a1d',
                                                        padding: '5px',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 21,
                                                        textAlign: 'center',
                                                        color: '#000066',
                                                        padding: '5px',
                                                        borderRadius: '8px',
                                                        fontWeight: 'bold',
                                                    }}
                                                    gutterBottom
                                                >
                                                    Connect Your Accounts
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Link all your social media accounts to Quantum Share. We support all major platforms including Facebook, Instagram, Twitter, LinkedIn, and more.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            sx={{
                                                width: 290,
                                                height: 'auto',
                                                margin: '1rem auto',
                                                border: '1px solid #bd1a1d',
                                                borderRadius: '8px',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-10px)',
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <TextFieldsRoundedIcon
                                                    style={{
                                                        color: 'white',
                                                        width: '35px',
                                                        height: '35px',
                                                        backgroundColor: '#bd1a1d',
                                                        padding: '5px',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 21,
                                                        textAlign: 'center',
                                                        color: '#000066',
                                                        padding: '5px',
                                                        borderRadius: '8px',
                                                        fontWeight: 'bold',
                                                    }}
                                                    gutterBottom
                                                >
                                                    Craft Your Text Using AI
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Revolutionize your messaging with AI-generated text, hashtags, and emojis. Craft engaging content effortlessly and boost engagement with just a few clicks!
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            sx={{
                                                width: 290,
                                                height: 'auto',
                                                margin: '1rem auto',
                                                border: '1px solid #bd1a1d',
                                                borderRadius: '8px',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-10px)',
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <AutoFixHighRoundedIcon
                                                    style={{
                                                        color: 'white',
                                                        width: '35px',
                                                        height: '35px',
                                                        backgroundColor: '#bd1a1d',
                                                        padding: '5px',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 21,
                                                        textAlign: 'center',
                                                        color: '#000066',
                                                        padding: '5px',
                                                        borderRadius: '8px',
                                                        fontWeight: 'bold',
                                                    }}
                                                    gutterBottom
                                                >
                                                    Create Your AI Images
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Experience instant image creation tailored to your needs. Customize styles, colors, and themes effortlessly. Seamlessly integrate our intuitive tool into your workflow.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            sx={{
                                                width: 290,
                                                height: 'auto',
                                                margin: '1rem auto',
                                                border: '1px solid #bd1a1d',
                                                borderRadius: '8px',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-10px)',
                                                },
                                            }}
                                        >
                                            <CardContent>
                                                <ContentCutRoundedIcon
                                                    style={{
                                                        color: 'white',
                                                        width: '35px',
                                                        height: '35px',
                                                        backgroundColor: '#bd1a1d',
                                                        padding: '5px',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 21,
                                                        textAlign: 'center',
                                                        color: '#000066',
                                                        padding: '5px',
                                                        borderRadius: '8px',
                                                        fontWeight: 'bold',
                                                    }}
                                                    gutterBottom
                                                >
                                                    Customize Your Posts
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Tailor your messages and visuals to suit each platform's unique requirements. Quantum Share allows you to customize your posts for maximum engagement.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </div >
            <div  >
                <Grid item xs="auto" sx={{ borderRight: "1px solid white", backgroundColor: "#b61a1d", textAlign: "center" }}>
                    <h1 style={{ color: "white", fontFamily: 'Poppins', paddingTop: '15px' }}>Why Choose Quantum Share ?</h1>
                </Grid>
                <Grid container spacing={1} sx={{ backgroundColor: "#b61a1d", paddingTop: "50px", paddingBottom: "50px" }}>

                    <Grid item xs={4} sx={{ borderRight: "1px solid white", paddingLeft: '35px' }}>
                        <h3 style={{ color: "white", textAlign: 'start', fontSize: '16px', fontFamily: 'Poppins', paddingLeft: "60px" }}>Save Time and Effort</h3>
                        <p style={{ paddingLeft: "60px", color: "white", fontSize: "14px", marginTop: '5%', paddingRight: "8px" }}>Forget about logging in and out of multiple accounts. With Quantum Share, you can share your content across all your social media platforms in one go, saving you valuable time and effort.</p>
                    </Grid>
                    <Grid item xs={4} sx={{ borderRight: "1px solid white" }}>

                        <h3 style={{ color: "white", paddingLeft: "25px", textAlign: 'start', fontSize: '16px', fontFamily: 'Poppins' }}>Maximize Reach</h3>
                        <p style={{ paddingLeft: "25px", color: "white", fontSize: "14px", marginTop: '5%', paddingRight: "8px" }}>Reach a wider audience by broadcasting your content across various social media channels simultaneously. Expand your online presence effortlessly with Quantum Share.</p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3 style={{ color: "white", paddingLeft: "25px", textAlign: 'start', fontSize: '16px', fontFamily: 'Poppins' }}>Streamlined Workflow</h3>
                        <p style={{ paddingLeft: "25px", color: "white", fontSize: "14px", marginTop: '5%' }}>Simplify your content distribution process with Quantum Share's intuitive interface and powerful features. Focus on creating great content while we handle the rest.</p>
                    </Grid>
                </Grid>
            </div>
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

export default About;