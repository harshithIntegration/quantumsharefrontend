/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Label } from 'recharts';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import TryIcon from '@mui/icons-material/Try';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { IconButton, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidenav from '../Navbar/Sidenav';
import Nav from '../Navbar/Nav';
import { AppContext } from '../Context/AppContext';
import RemainingDaysChecker from '../Pages/RemainingDaysChecker';
import { FaCirclePlay } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { remainingDays, remainingCredits } = useContext(AppContext);

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
                    <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
                                    <h2 style={{ padding: '10px', color: 'grey' }}>Welcome!</h2>
                                    <RemainingDaysChecker />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', padding: '10px' }}>
                                        {remainingDays !== null && (
                                            <Button
                                                sx={{
                                                    mr: 1,
                                                    color: '#ba343b',
                                                    fontSize: '14px',
                                                    border: '1px solid #ba343b'
                                                }}
                                                variant="outlined"
                                            >
                                                Trail Expires in {remainingDays} Days
                                            </Button>
                                        )}
                                        {remainingCredits !== null && (
                                            <Button
                                                sx={{
                                                    mr: 1,
                                                    bgcolor: '#ba343b',
                                                    fontSize: '14px',
                                                    '&:hover': { bgcolor: '#9e2b31' },
                                                }}
                                                variant="contained"
                                            >
                                                {remainingCredits} Credits Left
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <Card sx={{ width: 250, height: 100, margin: 1 }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Typography sx={{ fontSize: 18, paddingTop: '20px' }} gutterBottom>
                                                AI Text Creation
                                            </Typography>
                                            <IconButton>
                                                <AutoAwesomeIcon sx={{ color: 'white', bgcolor: '#ba343b', width: '50px', height: '50px', padding: '7px', borderRadius: '50%' }} />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ width: 250, height: 100, margin: 1 }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Typography sx={{ fontSize: 18, paddingTop: '20px' }} gutterBottom>
                                                AI Image Creation
                                            </Typography>
                                            <IconButton>
                                                <AutoFixHighIcon sx={{ color: 'white', bgcolor: '#ba343b', width: '50px', height: '50px', padding: '7px', borderRadius: '50%' }} />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ width: 250, height: 100, margin: 1 }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Typography sx={{ fontSize: 18, paddingTop: '20px' }} gutterBottom>
                                                Templates
                                            </Typography>
                                            <IconButton>
                                                <TryIcon sx={{ color: 'white', bgcolor: '#ba343b', width: '50px', height: '50px', padding: '7px', borderRadius: '50%' }} />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ width: 250, height: 100, margin: 1 }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Typography sx={{ fontSize: 18, paddingTop: '20px' }} gutterBottom>
                                                Social Media Post
                                            </Typography>
                                            <IconButton>
                                                <PhotoFilterIcon sx={{ color: 'white', bgcolor: '#ba343b', width: '50px', height: '50px', padding: '7px', borderRadius: '50%' }} />
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                </div>
                                <h3 style={{ padding: '30px', backgroundColor: 'white', margin: '10px', textAlign: 'center', fontSize: 24 }}>Stay tuned for upcoming features.</h3>
                                <h4 style={{ padding: '10px', backgroundColor: 'white', margin: '10px', marginBottom: '0', borderRadius: '5px', marginTop: '15px', fontSize: 20 }}>Analytics Overview</h4>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <div className='charts' style={{ background: 'white', padding: '20px', margin: '10px', marginTop: '0px' }}>
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
                            <Grid item xs={12} md={6} lg={6}>
                                <div className='charts' style={{ background: 'white', padding: '20px', margin: '10px', marginTop: '0px' }}>
                                    <ResponsiveContainer width="100%" height="100%" >
                                        <LineChart
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
                                            <Line type="monotone" dataKey="followers" stroke="#d9686e" activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="competitors" stroke="#f5cbcd" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <Card className='mystyle' sx={{ width: 270, height: 300, margin: 1 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 18, textAlign: 'center', color: '#fff', bgcolor: '#ba343b', padding: '5px', borderRadius: '5px' }} gutterBottom>
                                                Scheduled Post
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                            Plan your content in advance, set the timing and target your competitors, and watch your posts go live automatically. Stay consistent, save time, and reach your audience when they're most engaged. Keep an eye out for this exciting feature!  Effortlessly manage your social media and connect with your audience seamlessly.    
                                                  </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ width: 270, height: 300, margin: 1 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 18, textAlign: 'center', color: '#fff', bgcolor: '#ba343b', padding: '5px', borderRadius: '5px' }} gutterBottom>
                                                Recent Post
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                            Effortlessly view your latest social media posts and monitor engagement metrics, including likes, comments, and shares, all in one place. Our detailed analytics provide valuable insights into your posts' performance, helping you understand what resonates with your audience. Track trends and refine your strategy to boost your social media presence.                                            
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ width: 270, height: 300, margin: 1 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 18, textAlign: 'center', color: '#fff', bgcolor: '#ba343b', padding: '5px', borderRadius: '5px' }} gutterBottom>
                                                Published Post
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                            Access all your shared content across social media platforms easily. Stay organized with a centralized hub for posts, likes, and comments. Monitor your social presence effortlessly and engage with your audience effectively. Keep track of your content and its performance. Experience seamless social media management.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ width: 270, height: 300, margin: 1 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 18, textAlign: 'center', color: '#fff', bgcolor: '#ba343b', padding: '5px', borderRadius: '5px' }} gutterBottom>
                                                Draft
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                            Manage your drafts with ease! Access and edit your unpublished posts. Keep your ideas in one place and refine your content before publishing. Seamlessly transition from draft to published post whenever you're ready. Stay organized and ensure your content is polished before sharing. Experience efficient social media planning with our draft management feature.                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
            <div className="icon-container">
                <Link to='/reference-video'><FaCirclePlay className="circle-icon" /></Link>
                <div className="hover-content">reference video</div>
            </div>
        </>
    )
}

export default Dashboard