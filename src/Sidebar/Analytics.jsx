// import React from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label }
//     from 'recharts';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import CallMadeIcon from '@mui/icons-material/CallMade';
// import CallReceivedIcon from '@mui/icons-material/CallReceived';
// import { PieChart } from '@mui/x-charts';
// import Nav from '../Navbar/Nav';
// import Sidenav from '../Navbar/Sidenav';

// const Analytics = () => {

//     const data = [
//         {
//             name: 'Jan',
//             competitors: 13,
//             followers: 24,
//             no: 50,
//         },
//         {
//             name: 'Feb',
//             competitors: 21,
//             followers: 13,

//         },
//         {
//             name: 'Mar',
//             competitors: 32,
//             followers: 8,

//         },
//         {
//             name: 'Apr',
//             competitors: 43,
//             followers: 39,

//         },
//         {
//             name: 'May',
//             competitors: 25,
//             followers: 40,

//         },
//         {
//             name: 'Jun',
//             competitors: 16,
//             followers: 30,

//         },
//     ];

//     return (
//         <div>
//             <Nav />
//             <div style={{ display: 'flex' }}>
//                 <Sidenav />
//                 <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={12} lg={12}>
//                             <div style={{ backgroundColor: 'white', padding: '20px' }}>
//                                 <h5 >Performance Summary</h5>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Profile Visitors</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>621</p>
//                                             <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
//                                             <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>52.4%</p>
//                                         </div>
//                                     </div>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Post View Counts</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>7,256</p>
//                                             <CallReceivedIcon sx={{ marginTop: '30px', fontSize: 16, color: 'red' }} />
//                                             <p style={{ color: 'red', fontSize: 10, marginTop: '30px' }}>5.2%</p>
//                                         </div>
//                                     </div>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Engagement</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>23,142</p>
//                                             <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
//                                             <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>72.3%</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Grid>
//                         <Grid item xs={12} md={6} lg={6}>
//                             <div className='charts' style={{ background: 'white', padding: '20px', margin: '0px', marginTop: '0px' }}>
//                                 <ResponsiveContainer width="100%" height="100%" >
//                                     <BarChart
//                                         width={500}
//                                         height={300}
//                                         data={data}
//                                         margin={{
//                                             top: 10,
//                                             right: 30,
//                                             left: 10,
//                                             bottom: 0,
//                                         }}
//                                     >
//                                         <CartesianGrid strokeDasharray="3 3" />
//                                         <XAxis dataKey="name" />
//                                         <YAxis >
//                                             <Label value="Activity In Percentage" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
//                                         </YAxis>
//                                         <Tooltip />
//                                         <Legend />
//                                         <Bar dataKey="followers" fill="#d9686e" />
//                                         <Bar dataKey="competitors" fill="#f5cbcd" />
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             </div>
//                         </Grid>
//                         <Grid item xs={12} md={6} lg={6} >
//                             <div style={{ background: '#fff', padding: '20px' }}>
//                                 <p>Post Engagement</p>
//                                 <div style={{ padding: '18px' }}>
//                                     <PieChart
//                                         series={[
//                                             {
//                                                 data: [
//                                                     { id: 0, value: 10, label: 'Text', color: '#e48d91' },
//                                                     { id: 1, value: 15, label: 'Image', color: '#f5cbcd' },
//                                                     { id: 2, value: 20, label: 'Video', color: '#d9686e' },
//                                                 ],
//                                             },
//                                         ]}
//                                         width={400}
//                                         height={200}
//                                     />
//                                 </div>
//                             </div>
//                         </Grid>
//                         <Grid item xs={12} md={12} lg={12}>
//                             <div style={{ backgroundColor: 'white', padding: '20px' }}>
//                                 <h5 >Audience Summary</h5>
//                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Followers</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>1423</p>
//                                             <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
//                                             <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>20.1%</p>
//                                         </div>
//                                     </div>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Likes</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>5,642</p>
//                                             <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
//                                             <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>41.1%</p>
//                                         </div>
//                                     </div>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Comments</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>1,023</p>
//                                             <CallMadeIcon sx={{ marginTop: '30px', fontSize: 16, color: 'green' }} />
//                                             <p style={{ color: 'green', fontSize: 10, marginTop: '30px' }}>32.0%</p>
//                                         </div>
//                                     </div>
//                                     <div style={{ marginTop: '10px', border: 1, borderStyle: 'ridge', padding: '15px', width: '100%' }}>
//                                         <p style={{ fontSize: 16 }}>Dislikes</p>
//                                         <div style={{ display: 'flex' }}>
//                                             <p style={{ color: '#000066', fontWeight: 'bold', fontSize: 30, margin: '10px' }}>20</p>
//                                             <CallReceivedIcon sx={{ marginTop: '30px', fontSize: 16, color: 'red' }} />
//                                             <p style={{ color: 'red', fontSize: 10, marginTop: '30px' }}>8.6%</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </div>
//         </div>
//     )
// }

// export default Analytics






// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Nav from '../Navbar/Nav';
// import Sidenav from '../Navbar/Sidenav';
// import axiosInstance from '../Helper/AxiosInstance';
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';

// const Analytics = () => {
//     const token = localStorage.getItem('token');
//     const [recentPosts, setRecentPosts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);

//     useEffect(() => {
//         const fetchAnalyticsData = async () => {
//             try {
//                 const response = await axiosInstance.get('/quatumshare/socialmedia/history', {
//                     headers: {
//                         'Accept': 'application/json',
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setRecentPosts(response.data.data);
//             } catch (error) {
//                 console.error("Error fetching analytics data", error);
//             }
//         };

//         fetchAnalyticsData();
//     }, [token]);

//     const handleViewInsights = async (pid) => {
//         try {
//             const response = await axiosInstance.get(`/quatumshare/socialmedia/view/analytics?pid=${pid}`, {
//                 headers: {
//                     'Accept': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setSelectedPost(response.data);
//             setOpen(true);
//         } catch (error) {
//             console.error("Error fetching post insights", error);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedPost(null);
//     };

//     const getPlatformIcon = (platformName) => {
//         switch (platformName.toLowerCase()) {
//             case 'facebook':
//                 return <FacebookRoundedIcon style={{ fontSize: '33px', color: '#4267B2' }} />;
//             case 'instagram':
//                 return <InstagramIcon style={{ fontSize: '33px', background: 'linear-gradient(45deg, #f09433 30%, #e6683c 50%, #dc2743 70%, #cc2366 90%, #bc1888)', borderRadius: '50%', color: 'white', padding: '2px' }} />;
//             // Add cases for other platforms and their icons
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div>
//             <Nav />
//             <div style={{ display: 'flex' }}>
//                 <Sidenav />
//                 <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px' }}>
//                                 <h2 style={{ color: '#ba343b', fontSize: '1.5rem' }}>
//                                     Recent Posts
//                                 </h2><br />
//                                 <Grid container spacing={2}>
//                                     {recentPosts.filter(post => post.imageUrl).length > 0 ? (
//                                         recentPosts
//                                             .filter(post => post.imageUrl)
//                                             .map(post => (
//                                                 <Grid item xs={2.4} key={post.pid}>
//                                                     <div
//                                                         style={{
//                                                             display: 'flex',
//                                                             flexDirection: 'column',
//                                                             alignItems: 'center',
//                                                             border: '1px #ddd',
//                                                             borderRadius: '8px',
//                                                             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                                                             padding: '6px',
//                                                             width: '100%',
//                                                             height: '250px',
//                                                             textAlign: 'center',
//                                                             backgroundColor: '#f9f9f9',
//                                                             transition: 'transform 0.3s ease-in-out',
//                                                             position: 'relative',
//                                                         }}
//                                                     >
//                                                         <img
//                                                             src={post.imageUrl}
//                                                             alt={`Post on ${post.platformName}`}
//                                                             style={{
//                                                                 width: '100%',
//                                                                 height: '180px',
//                                                                 objectFit: 'contain',
//                                                                 borderRadius: '4px',
//                                                                 marginBottom: '10px'
//                                                             }}
//                                                         />
//                                                         <div
//                                                             style={{
//                                                                 position: 'absolute',
//                                                                 top: '-4px',
//                                                                 right: '-4px',
//                                                                 backgroundColor: 'white',
//                                                                 borderRadius: '50%',
//                                                                 padding: '0px',
//                                                                 boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                                 width: '27px',
//                                                                 height: '27px',
//                                                             }}
//                                                         >
//                                                             {getPlatformIcon(post.platformName)}
//                                                         </div>
//                                                         <button
//                                                             onClick={() => handleViewInsights(post.pid)}
//                                                             style={{
//                                                                 backgroundColor: '#fff',
//                                                                 color: '#ba343b',
//                                                                 border: '1px solid #ba343b',
//                                                                 borderRadius: '4px',
//                                                                 width: '7.5rem',
//                                                                 height: '2.4rem',
//                                                                 cursor: 'pointer',
//                                                                 fontSize: '15px',
//                                                                 fontWeight: '600',
//                                                                 marginTop: '5px'
//                                                             }}
//                                                         >
//                                                             View Insights
//                                                         </button>
//                                                     </div>
//                                                 </Grid>
//                                             ))
//                                     ) : (
//                                         <div style={{ margin: '0 16px' }}>
//                                             <p>No Recent Posts Available.</p>
//                                         </div>
//                                     )}
//                                 </Grid>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </div>

//             {/* Dialog for displaying post insights */}
//             <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//                 <DialogTitle sx={{ color: '#ba343b', fontSize: '1.5rem', fontWeight: '600' }}>Post Insights</DialogTitle>
//                 <DialogContent dividers>
//                     {selectedPost && (
//                         <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                                 <img
//                                     src={selectedPost.data.full_picture}
//                                     alt="Post"
//                                     style={{ width: '100%', height: '250px', borderRadius: '4px', objectFit: 'contain' }}
//                                 />
//                                 <br />
//                                 <p>{selectedPost.data.description}</p>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 {selectedPost.data.love !== undefined && (
//                                     <p><strong>Love :</strong> {selectedPost.data.love}</p>
//                                 )}
//                                 {selectedPost.data.total_comments !== undefined && (
//                                     <p><strong>Comments :</strong> {selectedPost.data.total_comments}</p>
//                                 )}
//                                 {selectedPost.data.like !== undefined && (
//                                     <p><strong>Likes :</strong> {selectedPost.data.like}</p>
//                                 )}
//                                 {selectedPost.data.total_video_views !== undefined && (
//                                     <p><strong>Views :</strong> {selectedPost.data.total_video_views}</p>
//                                 )}
//                                 {selectedPost.data.total_video_impressions !== undefined && (
//                                     <p><strong>Impressions :</strong> {selectedPost.data.total_video_impressions}</p>
//                                 )}
//                             </Grid>
//                         </Grid>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default Analytics;








import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import axiosInstance from '../Helper/AxiosInstance';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Analytics = () => {
    const token = localStorage.getItem('token');
    const [recentPosts, setRecentPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
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
            }
        };

        fetchAnalyticsData();
    }, [token]);

    const handleViewInsights = async (pid) => {
        try {
            const response = await axiosInstance.get(`/quatumshare/socialmedia/view/analytics?pid=${pid}`, {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setSelectedPost(response.data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching post insights", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPost(null);
    };

    const getPlatformIcon = (platformName) => {
        switch (platformName.toLowerCase()) {
            case 'facebook':
                return <FacebookRoundedIcon style={{ fontSize: '33px', color: '#4267B2' }} />;
            case 'instagram':
                return <InstagramIcon style={{ fontSize: '33px', background: 'linear-gradient(45deg, #f09433 30%, #e6683c 50%, #dc2743 70%, #cc2366 90%, #bc1888)', borderRadius: '50%', color: 'white', padding: '2px' }} />;
            // Add cases for other platforms and their icons
            default:
                return null;
        }
    };

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex' }}>
                <Sidenav />
                <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px' }}>
                                <h2 style={{ color: '#ba343b', fontSize: '1.5rem' }}>
                                    Recent Posts
                                </h2><br />
                                <Grid container spacing={2}>
                                    {recentPosts.filter(post => post.imageUrl).length > 0 ? (
                                        recentPosts
                                            .filter(post => post.imageUrl)
                                            .map(post => (
                                                <Grid item xs={2.4} key={post.pid}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            border: '1px #ddd',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                            padding: '6px',
                                                            width: '100%',
                                                            height: '250px',
                                                            textAlign: 'center',
                                                            backgroundColor: '#f9f9f9',
                                                            transition: 'transform 0.3s ease-in-out',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        {post.mediaType === 'video/mp4' ? (
                                                            <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                                                                <img
                                                                    src={post.imageUrl}
                                                                    alt={`Video post on ${post.platformName}`}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '180px',
                                                                        objectFit: 'contain',
                                                                        borderRadius: '4px',
                                                                    }}
                                                                />
                                                                <button
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '50%',
                                                                        left: '50%',
                                                                        transform: 'translate(-50%, -50%)',
                                                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '50%',
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        fontSize: '18px',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    ▶
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={post.imageUrl}
                                                                alt={`Post on ${post.platformName}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '180px',
                                                                    objectFit: 'contain',
                                                                    borderRadius: '4px',
                                                                    marginBottom: '10px'
                                                                }}
                                                            />
                                                        )}
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: '-4px',
                                                                right: '-4px',
                                                                backgroundColor: 'white',
                                                                borderRadius: '50%',
                                                                padding: '0px',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                width: '27px',
                                                                height: '27px',
                                                            }}
                                                        >
                                                            {getPlatformIcon(post.platformName)}
                                                        </div>
                                                        <button
                                                            onClick={() => handleViewInsights(post.pid)}
                                                            style={{
                                                                backgroundColor: '#fff',
                                                                color: '#ba343b',
                                                                border: '1px solid #ba343b',
                                                                borderRadius: '4px',
                                                                width: '7.5rem',
                                                                height: '2.4rem',
                                                                cursor: 'pointer',
                                                                fontSize: '15px',
                                                                fontWeight: '600',
                                                                marginTop: '5px'
                                                            }}
                                                        >
                                                            View Insights
                                                        </button>
                                                    </div>
                                                </Grid>
                                            ))
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
            </div>

            {/* Dialog for displaying post insights */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ color: '#ba343b', fontSize: '1.5rem', fontWeight: '600' }}>Post Insights</DialogTitle>
                <DialogContent dividers>
                    {selectedPost && (
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {selectedPost.data.mediaType === 'video/mp4' ? (
                                    <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                                        <img
                                            src={selectedPost.data.full_picture}
                                            alt="Video post"
                                            style={{
                                                width: '100%',
                                                height: '250px',
                                                objectFit: 'contain',
                                                borderRadius: '4px',
                                            }}
                                        />
                                        <button
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                fontSize: '24px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            ▶
                                        </button>
                                    </div>
                                ) : (
                                    <img
                                        src={selectedPost.data.full_picture}
                                        alt="Post"
                                        style={{ width: '100%', height: '250px', borderRadius: '4px', objectFit: 'contain' }}
                                    />
                                )}
                                <br />
                                <p>{selectedPost.data.description}</p>
                            </Grid>
                            <Grid item xs={6}>
                                {selectedPost.data.love !== undefined && (
                                    <p><strong>Love :</strong> {selectedPost.data.love}</p>
                                )}
                                {selectedPost.data.total_comments !== undefined && (
                                    <p><strong>Comments :</strong> {selectedPost.data.total_comments}</p>
                                )}
                                {selectedPost.data.like !== undefined && (
                                    <p><strong>Likes :</strong> {selectedPost.data.like}</p>
                                )}
                                {selectedPost.data.total_video_views !== undefined && (
                                    <p><strong>Views :</strong> {selectedPost.data.total_video_views}</p>
                                )}
                                {selectedPost.data.total_video_impressions !== undefined && (
                                    <p><strong>Impressions :</strong> {selectedPost.data.total_video_impressions}</p>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Analytics;