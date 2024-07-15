/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import Nav from "../Navbar/Nav"
import { FaCirclePlay } from "react-icons/fa6";
import { Dialog, DialogContent } from "@mui/material";
import { IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import bg from '../Assets/bg7.jpg'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import QS1 from '../Assets/QS-01.jpg'
import about from '../Assets/social-media-platforms-01.jpg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import bg1 from '../Assets/bground1.jpg'
import why from '../Assets/soc.png'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import sto from '../Assets/ais.jpg'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { CgPlayButtonO } from "react-icons/cg";

const About = () => {
    const token = localStorage.getItem('token')
    const [open, setOpen] = React.useState(false);

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
            <div>
                <Nav />
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                        {token && <Sidenav />}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{
                                    height: '455px', width: '100%', backgroundImage: `url(${sto})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center', textAlign: 'left',
                                }}>
                                    <p style={{ color: 'white', fontSize: 30, paddingTop: '50px', marginLeft: '5%' }}>Revolutionize Your </p>
                                    <p style={{ color: 'white', fontSize: 30, paddingBottom: '20px', marginLeft: '5%' }}> Social Sharing Experience</p>
                                    <div style={{ width: '40%', marginLeft: '5%', fontSize: '18px' }}><Typography style={{ color: 'white' }}> With Quantum Share we aim to streamline this process and empower
                                        users like you to effortlessly distribute content ,connect with other
                                        and amplify you online presence.</Typography></div>
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
                                                        <source src="https://quantumshare.quantumparadigm.in/vedio/SocialMedia.mp4" type="video/mp4" />
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
                                <div style={{ display: 'flex', marginLeft: "30px" }}>
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
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <p style={{ color: '#d3040c', fontSize: '32px', fontWeight: '600' }}>Functionalities of Quantum Share</p>
                                    <div style={{
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center', padding: '40px', marginTop: '5px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
                                    }}>
                                        <Card sx={{
                                            width: 290, height: 'auto', margin: 1, border: '1px solid #bd1a1d', borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                            },
                                        }}>
                                            <CardContent>
                                                <LinkRoundedIcon style={{ color: 'white', width: '35px', height: '35px', backgroundColor: '#bd1a1d', padding: '5px', borderRadius: '50%' }} ></LinkRoundedIcon>
                                                <Typography sx={{ fontSize: 21, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                    Connect Your Accounts
                                                </Typography>
                                                <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                    Link all your social media accounts
                                                    to Quantum Share. We support all major platforms including
                                                    Facebook, Instagram, Twitter, LinkedIn, and more.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{
                                            width: 290, height: 'auto', margin: 1, border: '1px solid #bd1a1d', borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                            },
                                        }}>
                                            <CardContent>
                                                <TextFieldsRoundedIcon style={{ color: 'white', width: '35px', height: '35px', backgroundColor: '#bd1a1d', padding: '5px', borderRadius: '50%' }} ></TextFieldsRoundedIcon>
                                                <Typography sx={{ fontSize: 21, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                    Craft Your Text Using AI
                                                </Typography>
                                                <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                    Revolutionize your messaging with AI-generated text, hashtags, and emojis.
                                                    Craft engaging content effortlessly and boost engagement with just a few clicks!
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{
                                            width: 290, height: 'auto', margin: 1, border: '1px solid #bd1a1d', borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                            },
                                        }}>
                                            <CardContent>
                                                <AutoFixHighRoundedIcon style={{ color: 'white', width: '35px', height: '35px', backgroundColor: '#bd1a1d', padding: '5px', borderRadius: '50%' }}></AutoFixHighRoundedIcon>
                                                <Typography sx={{ fontSize: 21, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                    Create Your AI Images
                                                </Typography>
                                                <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                    Experience instant image creation tailored to your needs. Customize styles,
                                                    colors, and themes effortlessly. Seamlessly integrate our intuitive tool into
                                                    your workflow.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{
                                            width: 290, height: 'auto', margin: 1, border: '1px solid #bd1a1d', borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                            },
                                        }}>
                                            <CardContent>
                                                < ContentCutRoundedIcon style={{ color: 'white', width: '35px', height: '35px', backgroundColor: '#bd1a1d', padding: '5px', borderRadius: '50%' }} ></ContentCutRoundedIcon>
                                                <Typography sx={{ fontSize: 21, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                    Customize Your Posts
                                                </Typography>
                                                <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                    Tailor your messages and visuals to
                                                    suit each platform's unique requirements. Quantum Share
                                                    allows you to customize your posts for maximum engagement.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{
                                            width: 290, height: 'auto', margin: 1, border: '1px solid #bd1a1d', borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                            },
                                        }}>
                                            <CardContent>
                                                <EventAvailableRoundedIcon style={{ color: 'white', width: '35px', height: '35px', backgroundColor: '#bd1a1d', padding: '5px', borderRadius: '50%' }} ></EventAvailableRoundedIcon>
                                                <Typography sx={{ fontSize: 21, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                    Schedule Publishing
                                                </Typography>
                                                <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                    Choose whether to schedule your posts for optimal timing or publish
                                                    them instantly across all connected platforms.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{
                                            width: 290, height: 'auto', margin: 1, border: '1px solid #bd1a1d', borderRadius: '8px', marginLeft: '50px', transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                            },
                                        }}>
                                            <CardContent>
                                                <ManageHistoryIcon style={{ color: 'white', width: '35px', height: '35px', backgroundColor: '#bd1a1d', padding: '5px', borderRadius: '50%' }} ></ManageHistoryIcon>
                                                <Typography sx={{ fontSize: 21, textAlign: 'center', color: '#000066', padding: '5px', borderRadius: '8px', fontWeight: 'bold' }} gutterBottom>
                                                    Analyse Performance                                       </Typography>
                                                <Typography sx={{ fontSize: 17, textAlign: 'center', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                                    Monitor the performance of your posts with Quantum Share's advanced analytics.
                                                    Gain valuable insights into engagement metrics and audience behavior to
                                                    optimize your content strategy.
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
                    <h1 style={{ color: "white", paddingTop: '15px' }}>Why Choose Quantum Share ?</h1>
                </Grid>
                <Grid container spacing={1} sx={{ backgroundColor: "#b61a1d", paddingTop: "50px", paddingBottom: "50px" }}>
                    <Grid item xs={4} sx={{ borderRight: "1px solid white", paddingLeft: '35px' }}>
                        <h3 style={{ color: "white", textAlign: 'start', fontSize: '20px', paddingLeft: "60px" }}>Save Time and Effort</h3>
                        <p style={{ paddingLeft: "60px", color: "white", fontSize: "18px", marginTop: '5%', paddingRight: '8px' }}>
                            Forget about logging in and out of multiple accounts. With Quantum Share, you can share your content across all your social media platforms in one go, saving you valuable time and effort.
                        </p>
                    </Grid>
                    <Grid item xs={4} sx={{ borderRight: "1px solid white" }}>
                        <h3 style={{ color: "white", paddingLeft: "20px", textAlign: 'start', fontSize: '20px' }}>Maximize Reach</h3>
                        <p style={{ paddingLeft: "20px", color: "white", fontSize: "18px", marginTop: '5%', paddingRight: "8px" }}>
                            Expand your reach by distributing your content across various social media networks at the same time. Enhance your online presence seamlessly with Quantum Share.
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <h3 style={{ color: "white", paddingLeft: "20px", textAlign: 'start', fontSize: '20px' }}>Streamlined Workflow</h3>
                        <p style={{ paddingLeft: "20px", color: "white", fontSize: "18px", marginTop: '5%', paddingRight: '8px' }}>
                            Simplify your content distribution process with Quantum Share's intuitive interface and powerful features. Focus on creating great content while we handle the rest.
                        </p>
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

// const Footer = () => {
//     return (
//         <Box p={2} textAlign="center" bgcolor="#333333" marginTop={0}>
//             <Typography variant="body1" color='#fff' textAlign="center">
//                 &copy; {new Date().getFullYear()} Quantum Share. All rights reserved | <Link to='/privacy-policy' id="privacy">Privacy Policy</Link>
//             </Typography>
//         </Box>
//     );
// }

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