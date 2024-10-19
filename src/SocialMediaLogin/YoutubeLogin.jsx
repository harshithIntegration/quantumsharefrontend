/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axiosInstance from "../Helper/AxiosInstance";
import youtube1 from '../Assets/youtube1.svg';
import yticon from '../Assets/youtubesmall.svg';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setYoutubeProfile } from '../Redux/action/pageUrlsSlice';
import { setYouLoggedIn } from '../Redux/action/loginStatusSilce';
import { setYouName } from '../Redux/action/NameSlice';

const YoutubeLogin = () => {
    const token = sessionStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeChannelName, setYoutubeChannelName] = useState('');
    const [youtubeSubscriberCount, setYoutubeSubscriberCount] = useState('');

    const dispatch = useDispatch()
    const { YouLoggedIn } = useSelector((state) => state.loginStatus)

    const fetchConnectedSocial = async () => {
        try {
            const endpoint = 'quantum-share/user/connected/socialmedia/youtube'
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.status === 'success' && response.data.data) {
                const { youtubeUrl, youtubeChannelName, youtubeSubscriberCount } = response.data.data.youtube;
                console.log(youtubeUrl);
                setYoutubeUrl(youtubeUrl);
                dispatch(setYoutubeProfile(youtubeUrl))
                setYoutubeChannelName(youtubeChannelName);
                dispatch(setYouName(youtubeChannelName))
                setYoutubeSubscriberCount(youtubeSubscriberCount);
                console.log('Youtube Fetch:', response)
                dispatch(setYouLoggedIn(true))
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchConnectedSocial()
    }, [token])

    const handleYoutubeLogin = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/quantum-share/youtube/user/connect', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const oauthUrl = response.data.data;
            console.log(oauthUrl);
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
            await axiosInstance.get('/quantum-share/disconnect/youtube', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setYouLoggedIn(false))
            setYoutubeChannelName('');
            setYoutubeUrl('');
            setYoutubeSubscriberCount('');
            toast.success("Disconnected from YouTube!");
        } catch (error) {
            console.error('Error disconnecting from Youtube:', error);
            toast.error("Error disconnecting from Youtube. Please try again later.");
        } finally {
            setDisconnecting(false)
        }
    };

    const adjustFontSize = (username) => {
        if (username.length > 20) return '0.875rem';
        if (username.length > 15) return '0.962rem';
        if (username.length > 10) return '1.2rem';
        return '1.2rem';
    };

    return (
        <>
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {YouLoggedIn ? (
                    <>
                        <div className="profile-container">
                            <div className="profile-circle">
                                <img
                                    src={youtubeUrl}
                                    alt="User Profile"
                                    style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                                />
                                <div className="instagram-icon">
                                    <ReactSVG src={yticon} />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div
                                style={{
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px',
                                    height: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <p style={{ marginTop: '1px', fontSize: adjustFontSize(youtubeChannelName) }}>
                                    <span style={{ color: 'gray' }}>{youtubeChannelName}</span>
                                </p>
                            </div>
                            <h5>{`Subscribers : ${youtubeSubscriberCount}`}</h5>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <ReactSVG src={youtube1}></ReactSVG>
                        </div>
                        <div style={{ marginTop: '15px', textAlign: 'center', overflow: 'visible', whiteSpace: 'nowrap' }}>
                            <p style={{ marginTop: '1px', fontSize: '1.2rem', overflow: 'visible' }}>
                                <span style={{ color: 'gray' }}>YouTube</span>
                            </p>
                        </div>
                    </>
                )}
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ marginTop: YouLoggedIn ? '15px' : '30px', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !YouLoggedIn ? (
                        <Button variant='contained' sx={{ marginTop: '30px', marginBottom: '10px', fontWeight: '600' }} onClick={handleYoutubeLogin}>Connect</Button>
                    ) : (
                        <Button variant='contained' sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                    )
                )}
            </section>

            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '17px' }}>
                        Are you sure you want to disconnect from <b>{youtubeChannelName}</b> Youtube Channel ?
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

export default YoutubeLogin