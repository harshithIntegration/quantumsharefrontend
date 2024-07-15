import React, { useState } from 'react';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Dialog, DialogContent, Box } from '@mui/material';

const ReferenceVideo = () => {
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const videos = [
        {
            title: 'Facebook',
            description: 'Welcome to QuantumShare! In this video,we will guide you through the seamless process of integrating your Facebook business page with QuantumShare and posting your content. Follow these easy steps to get started and enhance your social media management !',
            url: 'https://youtu.be/-2XXxqIMd38?si=R44V3PmhNYOtwCNP',
        },
        {
            title: 'Instagram',
            description: 'In this video, we will walk you through the seamless integration of your Instagram business account with QuantumShare. Learn how to effortlessly connect your Instagram and start posting your content with ease. Our step-by-step guide will help you optimize your social media management.',
            url: 'https://youtu.be/lFTgfTKa69w?si=y0XXm3f97b-y2u-Y',
        },
        {
            title: 'Telegram',
            description: 'Welcome to QuantumShare! In this instructional video, we will walk you through the process of integrating your Telegram group with QuantumShare and seamlessly posting content. Follow these detailed steps to enhance your social media management capabilities.',
            url: 'https://youtu.be/prr9XTkN-p4?si=VbrtWIqkkjNTRA2x',
        },
    ];

    const handleClickOpen = (video) => {
        setSelectedVideo(video);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVideo(null);
    };

    const isVideoUrl = (url) => {
        return url.match(/\.(mp4|webm|ogg)$/);
    };

    const getEmbedUrl = (url) => {
        if (url.includes('youtu.be')) {
            const videoId = url.split('/').pop().split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`
        } else if (url.includes('youtube.com/watch')) {
            const videoId = new URLSearchParams(new URL(url).search).get('v');
            return `https://www.youtube.com/embed/${videoId}`
        }
        return url;
    };

    return (
        <div>
            <Nav />
            {token && <Sidenav />}
            <Box sx={{ marginTop: token ? '-4rem' : '-1rem' }}>
                <Container>
                    <Typography variant="h5" gutterBottom color="#d3040c" fontWeight="bold">
                        <h1 style={{ textAlign: 'center', color: '#ba343b', fontSize: '26px', marginTop: '3rem' }}>
                            Step-by-Step Guide: Connecting Social Media Profiles with QuantumShare
                        </h1>
                    </Typography>
                    <Grid container spacing={4} marginTop={3}>
                        {videos.map((video, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card onClick={() => handleClickOpen(video)}>
                                    {isVideoUrl(video.url) ? (
                                        <CardMedia
                                            component="video"
                                            height="140"
                                            src={video.url}
                                            title={video.title}
                                            controls
                                        />
                                    ) : (
                                        <CardMedia
                                            component="iframe"
                                            height="200"
                                            src={getEmbedUrl(video.url)}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                    <CardContent>
                                        <Typography variant="body1">{video.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {video.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogContent>
                            {selectedVideo && (
                                <>
                                    {isVideoUrl(selectedVideo.url) ? (
                                        <video
                                            width="100%"
                                            height="400"
                                            controls
                                            autoPlay
                                        >
                                            <source src={selectedVideo.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <iframe
                                            width="100%"
                                            height="400"
                                            src={getEmbedUrl(selectedVideo.url)}
                                            title="Video Player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                </Container>
            </Box>
        </div>
    );
};

export default ReferenceVideo;