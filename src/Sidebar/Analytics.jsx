import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label }
    from 'recharts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { PieChart } from '@mui/x-charts';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';

const Analytics = () => {
    
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
        <div>
            <Nav />
            <div style={{ display: 'flex' }}>
                <Sidenav />

                <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <div style={{ backgroundColor: 'white', padding: '20px' }}>
                                <h5 >Performance Summary</h5>
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
                                <h5 >Audience Summary</h5>
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
            </div>
        </div>
    )
}

export default Analytics