import React from 'react'
import Nav from '../Navbar/Nav';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import bg from '../Assets/one.webp'
import text from '../Assets/AIImage-1.webp'
import img from '../Assets/AIImage-2.webp'
import generated1 from '../Assets/Generated-Image-01.webp'
import generated2 from '../Assets/Generated-Image-02.webp'
import generated3 from '../Assets/Generated-Image-03.webp'
import Sidenav from '../Navbar/Sidenav';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { FaCirclePlay } from "react-icons/fa6";

const QI = () => {
    const token = localStorage.getItem('token')

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
                                    backgroundImage: `url(${bg})`, backgroundSize: 'cover',
                                    backgroundPosition: 'center', textAlign: 'center', paddingBottom: '30px'
                                }}>
                                    <h1 style={{ paddingTop: '60px' }}>Achieve More with Quantum</h1>
                                    <p style={{ fontSize: 20, margin: '70px', marginTop: '40px' }}>Meet Quantum, the AI powerhouse capable of generating stunning images and compelling text effortlessly. Harness the potential of advanced artificial intelligence to bring your creative visions to life. Experience seamless and innovative content creation with Quantum.</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1>AI Text Creation</h1>
                                    <img src={text} alt="" style={{ margin: '20px', width: '900px', maxWidth: '100%' }} />
                                    <p style={{ marginTop: '10px', fontSize: 20, margin: '20px', marginBottom: '40px' }}>
                                    Quantum, the AI marvel designed to craft high-quality text with precision and creativity. Whether you need engaging articles, captivating stories, or persuasive copy, Quantum delivers content that resonates with your audience. Empower your writing projects with the advanced capabilities of Quantum AI, ensuring every word counts.
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1>AI Image Generate</h1>
                                    <img src={img} alt="" style={{ margin: '20px', width: '900px', maxWidth: '100%' }} />
                                    <p style={{ marginTop: '10px', fontSize: 20, margin: '20px', marginBottom: '40px' }}>
                                        Experience the visual creativity of Quantum AI, your go-to solution for generating stunning images. From detailed illustrations to dynamic graphics, Quantum transforms your ideas into visual masterpieces. Elevate your projects with the innovative power of Quantum AI, where imagination meets technology."                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1>Generated Images</h1>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', flexFlow: 'wrap' }}>
                                    <img src={generated1} alt="" style={{ margin: '20px' }} />
                                    <img src={generated2} alt="" style={{ margin: '20px' }} />
                                    <img src={generated3} alt="" style={{ margin: '20px' }} />
                                </div>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
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

export default QI