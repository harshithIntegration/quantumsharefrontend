/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import linkedIn from '../Assets/LinkedIn1.svg';
import linkedinicon from '../Assets/linkedinsmall.svg'
import { ReactSVG } from 'react-svg';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import axiosInstance from '../Helper/AxiosInstance';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLinkLoggedIn } from '../Redux/action/loginStatusSilce';
import { setLinkedInProfile } from '../Redux/action/pageUrlsSlice';
import { setLinkName } from '../Redux/action/NameSlice';

const LinkedInLogin = () => {
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [linkedInProfilePic, setLinkedInProfilePic] = useState('');
    const [linkedInUserName, setLinkedInUserName] = useState('');
    const [selectedPage, setSelectedPage] = useState('');
    const [linkedInFollowersCount, setLinkedInFollowersCount] = useState('');

    const dispatch = useDispatch()
    const { linkLoggedIn } = useSelector((state) => state.loginStatus)

    const fetchConnectedSocial = async () => {
        try {
            const endpoint = 'quantum-share/user/connected/socialmedia/linkedIn'
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.data)
            if (response.data.status === 'success' && response.data.data) {
                const { linkedInUserName, linkedInProfilePic, linkedInFollowersCount } = response.data.data.linkedIn;
                setLinkedInUserName(linkedInUserName);
                dispatch(setLinkName(linkedInUserName))
                setLinkedInProfilePic(linkedInProfilePic);
                dispatch(setLinkedInProfile(linkedInProfilePic))
                setLinkedInFollowersCount(linkedInFollowersCount);
                dispatch(setLinkLoggedIn(true))
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchConnectedSocial()
    }, [token])

    const handleLinkedInLogin = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/quantum-share/linkedin/user/connect', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });
            const { clientId, redirectUri, scope } = response.data;

            const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization` +
                `?response_type=code` +
                `&client_id=${clientId}` +
                `&redirect_uri=${encodeURIComponent(redirectUri)}` +
                `&scope=${encodeURIComponent(scope)}`;
            window.location.href = authorizationUrl;
        } catch (error) {
            console.error("Failed to fetch LinkedIn authorization URL:", error);
        }
    };

    const handleDisconnect = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDisconnect = async () => {
        handleClose();
        setDisconnecting(true);
        try {
            await axiosInstance.get('/quantum-share/disconnect/linkedin', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setLinkLoggedIn(false))
            setLinkedInUserName('');
            setLinkedInProfilePic('');
            setSelectedPage('');
            setLinkedInFollowersCount('');
            toast.success("Disconnected from LinkedIn!");
        } catch (error) {
            console.error('Error disconnecting from LinkedIn:', error);
            toast.error("Error disconnecting from LinkedIn. Please try again later.");
        } finally {
            setDisconnecting(false);
        }
    };

    const adjustFontSize = (username) => {
        if (!username) return '1.2rem';
        if (username.length > 20) return '0.875rem';
        if (username.length > 15) return '0.962rem';
        if (username.length > 10) return '1.2rem';
        return '1.2rem';
    };

    return (
        <>
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {linkLoggedIn ? (
                    <>
                        <div className="profile-container">
                            <div className="profile-circle">
                                <img
                                    src={linkedInProfilePic || linkedInProfilePic}
                                    alt="User Profile"
                                    style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                                />
                                <div className="instagram-icon">
                                    <ReactSVG src={linkedinicon} />
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
                                <p style={{ marginTop: '1px', fontSize: adjustFontSize(linkedInUserName) }}>
                                    <span style={{ color: 'gray' }}>{linkedInUserName}</span>
                                </p>
                            </div>
                            <div>
                                {linkedInFollowersCount ? (
                                    <h5>{`Followers : ${linkedInFollowersCount}`}</h5>
                                ) : (
                                    <h5 style={{ visibility: 'hidden' }}>{'Followers : 0'}</h5>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <ReactSVG src={linkedIn}></ReactSVG>
                        </div>
                        <div style={{ marginTop: '15px', textAlign: 'center', overflow: 'visible', whiteSpace: 'nowrap' }}>
                            <p style={{ marginTop: '1px', fontSize: '1.2rem', overflow: 'visible' }}>
                                <span style={{ color: 'gray' }}>LinkedIn</span>
                            </p>
                        </div>
                    </>
                )}
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ marginTop: linkLoggedIn ? '15px' : '30px', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !linkLoggedIn ? (
                        <Button variant='contained' sx={{ marginTop: '30px', marginBottom: '10px', fontWeight: '600' }} onClick={handleLinkedInLogin}>Connect</Button>
                    ) : (
                        <Button variant='contained' sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                    )
                )}
            </section>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>
                        Are you sure you want to disconnect from <b>{linkedInUserName}</b> LinkedIn ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDisconnect} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LinkedInLogin;