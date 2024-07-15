/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axiosInstance from "../Helper/AxiosInstance";
import twitter1 from '../Assets/twitter.svg';
import twittericon from '../Assets/twittersmall.svg';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

const TwitterLogin = () => {
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [channelImageUrl, setChannelImageUrl] = useState('');
    const [channelName, setChannelName] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');

    useEffect(() => {
        const storedUrl = localStorage.getItem('channelImageUrl');
        const storedChannelName = localStorage.getItem('channelName');
        const storedSubscriberCount = localStorage.getItem('subscriberCount');
        if (storedUrl && storedChannelName && storedSubscriberCount) {
            setIsLoggedIn(true);
            setChannelImageUrl(storedUrl);
            setChannelName(storedChannelName);
            setSubscriberCount(storedSubscriberCount);
        }
    }, [token]);

    const handleTwitterLogin = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/quantum-share/twitter/user/connect', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const oauthUrl = response.data.data;
            console.log(oauthUrl);
            // window.open(oauthUrl, '_blank');
            window.location.href = oauthUrl;
        } catch (error) {
            console.error('Error', error);
            toast.error('Error loading Youtube Login Page. Please try again later.');
        } 
    }    

    const handleDisconnect = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDisconnect = async () => {
        handleClose();
        setDisconnecting(true)
        try {
            await axiosInstance.get('/quantum-share/disconnect/twitter', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('channelImageUrl');
            localStorage.removeItem('channelName');
            localStorage.removeItem('subscriberCount');
            setIsLoggedIn(false);
            setChannelName('');
            setChannelImageUrl('');
            setSubscriberCount('');
            toast.success("Disconnected from Youtube!");
        } catch (error) {
            console.error('Error disconnecting from Youtube:', error);
            toast.error("Error disconnecting from Youtube. Please try again later.");
        } finally {
            setDisconnecting(false)
        }
    };
    
    return (
        <>
            <section className='box-soc' style={{ paddingTop: '25px' }}>
                {isLoggedIn ? (
                    <div className="profile-container">
                        <div className="profile-circle">
                            <img
                                src={channelImageUrl}
                                alt="User Profile"
                                style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                            />
                            <div className="instagram-icon">
                                <ReactSVG src={twittericon} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <ReactSVG src={twitter1}></ReactSVG>
                    </div>
                )}
                <div style={{ marginTop: '15px' }}>
                    <p style={{ marginTop: '3px', fontSize: '1.3rem' }}>
                        <span style={{ color: 'gray' }}>
                            {channelName ? channelName : 'Twitter'}
                        </span>
                    </p>
                    <h5>{subscriberCount ? `Subsrcibers Count : ${subscriberCount}` : ''}</h5>
                </div>
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !isLoggedIn ? (
                        <Button variant='contained' sx={{ margin: '33px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleTwitterLogin} disabled>Connect</Button>
                    ) : (
                        <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                    )
                )}
            </section>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>
                        Are you sure you want to disconnect from Youtube?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleConfirmDisconnect} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TwitterLogin