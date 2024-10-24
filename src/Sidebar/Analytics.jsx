/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import axiosInstance from '../Helper/AxiosInstance';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Share } from '@mui/icons-material';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import facebookIcon from '../Assets/facebooksmall.svg';
import instagramIcon from '../Assets/instagramsmall.svg';
import youtubeIcon from '../Assets/youtubesmall.svg'
import { ReactSVG } from 'react-svg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { PieChart } from '@mui/x-charts';
import { TailSpin } from 'react-loader-spinner';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';

const Analytics = () => {
    let token = sessionStorage.getItem("token");
    const [recentPosts, setRecentPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [viewMoreOpen, setViewMoreOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentLoading, setRecentLoding] = useState(true);

    const fetchAnalyticsData = async () => {
        try {
            const response = await axiosInstance.get('/quatumshare/socialmedia/history', {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setRecentPosts(response.data.data);
        } catch (error) {
            console.error("Error fetching analytics data", error);
        } finally {
            setRecentLoding(false);
        }
    };

    useEffect(() => {
        fetchAnalyticsData();
    }, [token]);

    const handleViewInsights = async (pid) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/quatumshare/socialmedia/view/analytics?pid=${pid}`, {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setSelectedPost(response.data);
            setErrorMessage(null);
            setOpen(true);
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, platform } = error.response.data;
                setErrorMessage(`Error on ${platform}: ${message}`);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
            setSelectedPost(null);
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleViewInsightsClose = () => {
        setOpen(false);
        setSelectedPost(null);
        fetchAnalyticsData();
    };

    const getPlatformIcon = (platformName) => {
        switch (platformName.toLowerCase()) {
            case 'facebook':
                return <ReactSVG src={facebookIcon} alt="Facebook" />;
            case 'instagram':
                return <ReactSVG src={instagramIcon} alt="Instagram" />;
            case 'youtube':
                return <ReactSVG src={youtubeIcon} alt="Youtube" />;
            default:
                return null;
        }
    };

    const handleViewMore = async () => {
        try {
            const response = await axiosInstance.get(`/quatumshare/socialmedia/history/viewMore`, {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setPostsToDisplay(response.data.data);
            setViewMoreOpen(true);
        } catch (error) {
            console.error('Error fetching more posts:', error);
        }
    };

    const handleViewMoreClose = () => {
        setViewMoreOpen(false);
    };

    const iconStyle = {
        position: 'absolute',
        top: '55%',
        right: '10px',
        objectFit: 'contain',
        transform: 'translateY(-50%)',
    };

    const data = [
        {
            name: 'Jan',
            competitors: 13,
            followers: 24,
            no: 50,
        },
        {
            name: 'Feb',
            competitors: 21,
            followers: 13,
        },
        {
            name: 'Mar',
            competitors: 32,
            followers: 8,
        },
        {
            name: 'Apr',
            competitors: 43,
            followers: 39,
        },
        {
            name: 'May',
            competitors: 25,
            followers: 40,
        },
        {
            name: 'Jun',
            competitors: 16,
            followers: 30,
        },
    ];

    return (
        <>
            <div>
                <Nav />
                <div style={{ display: 'flex' }}>
                    <Sidenav />
                    <div style={{ flexGrow: 1 }} >
                        {recentLoading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                                <TailSpin
                                    height="50"
                                    width="50"
                                    color="#ba343b"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    visible={true}
                                />
                            </div>
                        ) : (
                            <>
                                <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px' }}>
                                                <h2 style={{ color: '#ba343b', fontSize: '1.4rem' }}>Recent Posts</h2><br />
                                                <Grid container spacing={2}>
                                                    {recentPosts.filter(post => post.imageUrl).length > 0 ? (
                                                        <>
                                                            {recentPosts
                                                                .filter(post => post.imageUrl)
                                                                .map((post, index) => (
                                                                    <Grid item xs={3} key={post.pid} sx={{ marginBottom: (index + 1) % 4 === 0 ? '1.5rem' : '0' }}>
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'center',
                                                                                border: '1px #ddd',
                                                                                borderRadius: '8px',
                                                                                padding: '6px',
                                                                                width: '90%',
                                                                                height: '295px',
                                                                                textAlign: 'center',
                                                                                backgroundColor: '#fefffa',
                                                                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                                                                position: 'relative',
                                                                            }}
                                                                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'}
                                                                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                                                        >
                                                                            {post.mediaType.startsWith('video') ? (
                                                                                post.platformName === "facebook" || post.platformName === "youtube" ? (
                                                                                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                                                                        <img
                                                                                            src={post.imageUrl}
                                                                                            alt="Video Thumbnail"
                                                                                            style={{
                                                                                                width: '90%',
                                                                                                height: '180px',
                                                                                                objectFit: 'contain',
                                                                                                borderRadius: '4px',
                                                                                            }}
                                                                                        />
                                                                                        <div
                                                                                            style={{
                                                                                                border: '2px solid white',
                                                                                                position: 'absolute',
                                                                                                top: '50%',
                                                                                                left: '50%',
                                                                                                transform: 'translate(-50%, -50%)',
                                                                                                width: '40px',
                                                                                                height: '40px',
                                                                                                borderRadius: '50%',
                                                                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                zIndex: 1,
                                                                                            }}
                                                                                        >
                                                                                            <button
                                                                                                style={{
                                                                                                    position: 'relative',
                                                                                                    bottom: '1px',
                                                                                                    left: '2px',
                                                                                                    backgroundColor: 'transparent',
                                                                                                    color: 'white',
                                                                                                    border: 'none',
                                                                                                    fontSize: '18px',
                                                                                                    cursor: 'pointer',
                                                                                                }}
                                                                                            >
                                                                                                ▶
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                                                                        <video
                                                                                            src={post.imageUrl}
                                                                                            alt="Video"
                                                                                            style={{
                                                                                                width: '90%',
                                                                                                height: '180px',
                                                                                                objectFit: 'contain',
                                                                                                borderRadius: '4px',
                                                                                            }}
                                                                                        />
                                                                                        <div
                                                                                            style={{
                                                                                                border: '2px solid white',
                                                                                                position: 'absolute',
                                                                                                top: '50%',
                                                                                                left: '50%',
                                                                                                transform: 'translate(-50%, -50%)',
                                                                                                width: '40px',
                                                                                                height: '40px',
                                                                                                borderRadius: '50%',
                                                                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                zIndex: 1,
                                                                                            }}
                                                                                        >
                                                                                            <button
                                                                                                style={{
                                                                                                    position: 'relative',
                                                                                                    bottom: '1px',
                                                                                                    left: '2px',
                                                                                                    backgroundColor: 'transparent',
                                                                                                    color: 'white',
                                                                                                    border: 'none',
                                                                                                    fontSize: '18px',
                                                                                                    cursor: 'pointer',
                                                                                                }}
                                                                                            >
                                                                                                ▶
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            ) : (
                                                                                <img
                                                                                    src={post.imageUrl}
                                                                                    alt="Image"
                                                                                    style={{
                                                                                        width: '90%',
                                                                                        height: '180px',
                                                                                        objectFit: 'contain',
                                                                                        borderRadius: '4px',
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            <div
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    top: '-4px',
                                                                                    right: '-4px',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    width: '27px',
                                                                                    height: '27px',
                                                                                }}
                                                                            >
                                                                                {getPlatformIcon(post.platformName)}
                                                                            </div>
                                                                            <div>
                                                                                <p style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#333', marginTop: '10px' }}>
                                                                                    {post.profileName}
                                                                                </p>
                                                                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                                                                                    {post.postDate}, {post.postTime}
                                                                                </p>
                                                                            </div>
                                                                            <button
                                                                                onClick={() => handleViewInsights(post.pid)}
                                                                                style={{
                                                                                    backgroundColor: '#fff',
                                                                                    color: '#ba343b',
                                                                                    border: '1px solid #ba343b',
                                                                                    borderRadius: '4px',
                                                                                    width: '7rem',
                                                                                    height: '2.1rem',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '14px',
                                                                                    fontWeight: '600',
                                                                                    position: 'absolute',
                                                                                    bottom: '15px',
                                                                                    left: '50%',
                                                                                    transform: 'translateX(-50%)',
                                                                                }}
                                                                            >
                                                                                View Insights
                                                                            </button>
                                                                        </div>
                                                                    </Grid>
                                                                ))}
                                                            {recentPosts.filter(post => post.imageUrl).length >= 10 && (
                                                                <Grid item xs={3}>
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            border: '1px dashed #ba343b',
                                                                            borderRadius: '8px',
                                                                            padding: '6px',
                                                                            width: '90%',
                                                                            height: '295px',
                                                                            textAlign: 'center',
                                                                            backgroundColor: 'transparent',
                                                                            cursor: 'pointer',
                                                                            transition: 'background-color 0.3s ease-in-out',
                                                                        }}
                                                                        onClick={handleViewMore}
                                                                    >
                                                                        <span style={{ color: '#ba343b', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                                            View More
                                                                        </span>
                                                                    </div>
                                                                </Grid>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div style={{ margin: '0 16px' }}>
                                                            <p>No Recent Posts Available.</p>
                                                        </div>
                                                    )}
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div style={{ backgroundColor: 'white', padding: '20px' }}>
                                                <h2 style={{ color: '#ba343b', fontSize: '1.4rem' }}>
                                                    Performance Summary
                                                </h2>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Profile Visitors</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>621</p>
                                                            <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
                                                            <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>52.4%</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Post View Counts</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>7,256</p>
                                                            <CallReceivedIcon sx={{ marginTop: '30px', fontSize: 16, color: 'red' }} />
                                                            <p style={{ color: 'red', fontSize: 10, marginTop: '30px' }}>5.2%</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Engagement</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>23,142</p>
                                                            <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
                                                            <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>72.3%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <div className='charts' style={{ background: 'white', padding: '20px', margin: '0px', marginTop: '0px' }}>
                                                <ResponsiveContainer width="100%" height="100%" >
                                                    <BarChart
                                                        width={500}
                                                        height={300}
                                                        data={data}
                                                        margin={{
                                                            top: 10,
                                                            right: 30,
                                                            left: 10,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis >
                                                            <Label value="Activity In Percentage" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
                                                        </YAxis>
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="followers" fill="#d9686e" />
                                                        <Bar dataKey="competitors" fill="#f5cbcd" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6} >
                                            <div style={{ background: '#fff', padding: '20px' }}>
                                                <p>Post Engagement</p>
                                                <div style={{ padding: '18px' }}>
                                                    <PieChart
                                                        series={[
                                                            {
                                                                data: [
                                                                    { id: 0, value: 10, label: 'Text', color: '#e48d91' },
                                                                    { id: 1, value: 15, label: 'Image', color: '#f5cbcd' },
                                                                    { id: 2, value: 20, label: 'Video', color: '#d9686e' },
                                                                ],
                                                            },
                                                        ]}
                                                        width={400}
                                                        height={200}
                                                    />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div style={{ backgroundColor: 'white', padding: '20px' }}>
                                                <h2 style={{ color: '#ba343b', fontSize: '1.4rem' }}>
                                                    Audience Summary
                                                </h2>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Followers</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>1423</p>
                                                            <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
                                                            <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>20.1%</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Likes</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>5,642</p>
                                                            <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
                                                            <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>41.1%</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Comments</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>1,023</p>
                                                            <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
                                                            <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>32.0%</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
                                                        <p style={{ fontSize: 16 }}>Dislikes</p>
                                                        <div style={{ display: 'flex' }}>
                                                            <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>20</p>
                                                            <CallReceivedIcon sx={{ marginTop: '30px', fontSize: 16, color: 'red' }} />
                                                            <p style={{ color: 'red', fontSize: 10, marginTop: '30px' }}>8.6%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        )}
                    </div>
                </div>
                <Dialog open={viewMoreOpen} onClose={handleViewMoreClose} maxWidth="lg" fullWidth>
                    <DialogTitle sx={{ color: '#ba343b', fontSize: '1.2rem', fontWeight: '600', textAlign: 'center' }}>
                        All Posts
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            {postsToDisplay.map((post, index) => (
                                <Grid item xs={3} key={post.pid} sx={{ marginBottom: (index + 1) % 4 === 0 ? '1rem' : '0' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            border: '1px #ddd',
                                            borderRadius: '8px',
                                            padding: '6px',
                                            width: '90%',
                                            height: '295px',
                                            textAlign: 'center',
                                            backgroundColor: '#fefffa',
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                            position: 'relative',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'}
                                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                    >
                                        {post.mediaType.startsWith('video') ? (
                                            post.platformName === "facebook" || post.platformName === "youtube" ? (
                                                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                                    <img
                                                        src={post.imageUrl}
                                                        alt="Video Thumbnail"
                                                        style={{
                                                            width: '90%',
                                                            height: '180px',
                                                            objectFit: 'contain',
                                                            borderRadius: '4px',
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            border: '2px solid white',
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        <button
                                                            style={{
                                                                position: 'relative',
                                                                bottom: '1px',
                                                                left: '2px',
                                                                backgroundColor: 'transparent',
                                                                color: 'white',
                                                                border: 'none',
                                                                fontSize: '18px',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            ▶
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                                    <video
                                                        src={post.imageUrl}
                                                        alt="Video"
                                                        style={{
                                                            width: '90%',
                                                            height: '180px',
                                                            objectFit: 'contain',
                                                            borderRadius: '4px',
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            border: '2px solid white',
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        <button
                                                            style={{
                                                                position: 'relative',
                                                                bottom: '1px',
                                                                left: '2px',
                                                                backgroundColor: 'transparent',
                                                                color: 'white',
                                                                border: 'none',
                                                                fontSize: '18px',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            ▶
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <img
                                                src={post.imageUrl}
                                                alt="Image"
                                                style={{
                                                    width: '90%',
                                                    height: '180px',
                                                    objectFit: 'contain',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        )}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '-4px',
                                                right: '-4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '27px',
                                                height: '27px',
                                            }}
                                        >
                                            {getPlatformIcon(post.platformName)}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#333', marginTop: '10px' }}>
                                                {post.profileName}
                                            </p>
                                            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                                                {post.postDate}, {post.postTime}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleViewInsights(post.pid)}
                                            style={{
                                                backgroundColor: '#fff',
                                                color: '#ba343b',
                                                border: '1px solid #ba343b',
                                                borderRadius: '4px',
                                                width: '7rem',
                                                height: '2.1rem',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                position: 'absolute',
                                                bottom: '15px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                            }}
                                        >
                                            View Insights
                                        </button>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleViewMoreClose} style={{ color: '#ba343b' }}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress sx={{ color: '#ba343b' }} size={40} />
                </Backdrop>
                <Dialog open={open} onClose={handleViewInsightsClose} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ color: '#ba343b', fontSize: '1.2rem', fontWeight: '600', position: 'relative', paddingRight: '70px' }}>
                        Post Insights
                        {selectedPost && selectedPost.platform && (
                            <>
                                {selectedPost.platform === 'facebook' && (
                                    <ReactSVG src={facebookIcon} alt="Facebook" style={iconStyle} />
                                )}
                                {selectedPost.platform === 'instagram' && (
                                    <ReactSVG src={instagramIcon} alt="Instagram" style={iconStyle} />
                                )}
                                {selectedPost.platform === 'youtube' && (
                                    <ReactSVG src={youtubeIcon} alt="Youtube" style={iconStyle} />
                                )}
                            </>
                        )}
                    </DialogTitle>
                    <DialogContent dividers>
                        {selectedPost && selectedPost.status === 'error' ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <p style={{ color: '#ee6c6e', fontWeight: '600', textAlign: 'center' }}>
                                        {selectedPost.message}
                                    </p>
                                </Grid>
                            </Grid>
                        ) : (
                            selectedPost && (
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        {selectedPost.platform === 'facebook' && selectedPost.data.media_type.startsWith('video') ? (
                                            <img
                                                src={selectedPost.data.full_picture}
                                                alt="Facebook Post Thumbnail"
                                                style={{ width: '100%', height: '250px', borderRadius: '4px', objectFit: 'contain' }}
                                            />
                                        ) : selectedPost.data.media_type.startsWith('video') ? (
                                            selectedPost.data.full_picture.includes('youtube.com') || selectedPost.data.full_picture.includes('youtu.be') ? (
                                                <iframe
                                                    width="100%"
                                                    height="250"
                                                    src={`https://www.youtube.com/embed/${new URL(selectedPost.data.full_picture).searchParams.get("v")}?rel=0&modestbranding=1&controls=1&disablekb=1&cc_load_policy=0&fs=0`}
                                                    title="YouTube video player"
                                                    style={{ borderRadius: '4px', objectFit: 'contain' }}
                                                ></iframe>
                                            ) : (
                                                <video
                                                    src={selectedPost.data.full_picture}
                                                    alt="Post"
                                                    style={{ width: '100%', height: '250px', borderRadius: '4px', objectFit: 'contain' }}
                                                    controls
                                                />
                                            )
                                        ) : (
                                            <img
                                                src={selectedPost.data.full_picture}
                                                alt="Post"
                                                style={{ width: '100%', height: '250px', borderRadius: '4px', objectFit: 'contain' }}
                                            />
                                        )}
                                        <br /><br />
                                        <p>{selectedPost.data.description}</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {/* Facebook */}
                                        {selectedPost.data.total_comments !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <CommentOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Comments : {selectedPost.data.total_comments}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.love !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <FavoriteBorderOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Love : {selectedPost.data.love}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.like !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <ThumbUpAltOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Likes : {selectedPost.data.like}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.total_video_views !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <VisibilityOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Views : {selectedPost.data.total_video_views}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.total_video_impressions !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <InsightsOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Impressions : {selectedPost.data.total_video_impressions}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.reactions !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <SentimentVerySatisfiedOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Reactions : {selectedPost.data.reactions}</span>
                                            </p>
                                        )}
                                        {/* Instagram */}
                                        {selectedPost.data.comments !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <CommentOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Comments : {selectedPost.data.comments}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.likes !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <FavoriteBorderOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Likes : {selectedPost.data.likes}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.shares !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <Share sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Shares : {selectedPost.data.shares}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.saved !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <BookmarksOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Saved : {selectedPost.data.saved}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.reach !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <TrendingUpOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Reach : {selectedPost.data.reach}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.media_type === 'video' && selectedPost.data.video_views !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <VisibilityOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Views : {selectedPost.data.video_views}</span>
                                            </p>
                                        )}
                                        {/* Youtube */}
                                        {selectedPost.data.media_type === 'video/mp4' && selectedPost.data.commentCount !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <CommentOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Comments : {selectedPost.data.commentCount}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.media_type === 'video/mp4' && selectedPost.data.viewCount !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <VisibilityOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Views : {selectedPost.data.viewCount}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.media_type === 'video/mp4' && selectedPost.data.likeCount !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <FavoriteBorderOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Likes : {selectedPost.data.likeCount}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.media_type === 'video/mp4' && selectedPost.data.favoriteCount !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <StarBorderPurple500OutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Favourite : {selectedPost.data.favoriteCount}</span>
                                            </p>
                                        )}
                                        {selectedPost.data.media_type === 'video/mp4' && selectedPost.data.dislikeCount !== undefined && (
                                            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <ThumbDownOffAltOutlinedIcon sx={{ color: 'grey', fontSize: '20px', marginRight: '8px' }} />
                                                <span style={{ fontWeight: '600' }}>Dislikes : {selectedPost.data.dislikeCount}</span>
                                            </p>
                                        )}
                                    </Grid>
                                </Grid>
                            )
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleViewInsightsClose} style={{ color: '#ba343b' }}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Analytics;