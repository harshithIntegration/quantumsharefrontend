/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axiosInstance from "../Helper/AxiosInstance";
import reddit1 from '../Assets/Reddit1.svg';
import redditicon from '../Assets/redditSmall.svg';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RedditLogin = () => {
    const token = sessionStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [channelImageUrl, setChannelImageUrl] = useState('');
    const [channelName, setChannelName] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');
    const {t} =  useTranslation('');

    const handleRedditLogin = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/quantum-share/reddit/user/connect', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const oauthUrl = response.data.data;
        } catch (error) {
            console.error('Error', error);
            toast.error('Error loading Reddit Login Page. Please try again later.');
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
            await axiosInstance.get('/quantum-share/disconnect/youtube', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsLoggedIn(false);
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
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {isLoggedIn ? (
                    <div className="profile-container">
                        <div className="profile-circle">
                            <img
                                src={channelImageUrl}
                                alt="User Profile"
                                style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                            />
                            <div className="instagram-icon">
                                <ReactSVG src={redditicon} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <ReactSVG src={reddit1}></ReactSVG>
                    </div>
                )}
                <div style={{ marginTop: '15px' }}>
                    <p style={{ marginTop: '1px', fontSize: '1.2rem' }}>
                        <span style={{ color: 'gray' }}>
                            {channelName ? channelName : 'Reddit'}
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
                        <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleRedditLogin} disabled>{t('connect')}</Button>
                    ) : (
                        <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>{t('disconnect')}</Button>
                    )
                )}
            </section>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '17px' }}>
                       {t('confirmDisconnect')} {channelName} Youtube Channel ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('no')}</Button>
                    <Button onClick={handleConfirmDisconnect} autoFocus>{t('yes')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RedditLogin