/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import linkedIn from '../Assets/LinkedIn1.svg';
import linkedinicon from '../Assets/linkedinsmall.svg'
import { ReactSVG } from 'react-svg';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import axiosInstance from '../Helper/AxiosInstance';
import { toast } from 'react-toastify';

const LinkedInLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [LinkedInUsername, setLinkedInUsername] = useState('');
    const [selectedPage, setSelectedPage] = useState(''); // State to store selected page
    const [openPageDisconnect, setOpenPageDisconnect] = useState(false); // State for page disconnect dialog
    const [linkedPageImage, setLinkedPageImage] = useState('');
    const [linkedProfileImage, setLinkedProfileImage] = useState('');
    const [linkedInFollowers_count, setLinkedInFollowers_count] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedUsername = localStorage.getItem('LinkedInUsername');
        const storedLinkedProfileImage = localStorage.getItem('linkedProfileImage');
        if (storedUsername && storedLinkedProfileImage) {
            setIsLoggedIn(true);
            setLinkedInUsername(storedUsername);
            setLinkedProfileImage(storedLinkedProfileImage);
        }

        const storedPageName = localStorage.getItem('linkedinPageName');
        const storedLinkedPageImage = localStorage.getItem('linkedPageImage');
        const storedLinkedInFollowers_count = localStorage.getItem('linkedInFollowers_count');
        if (storedPageName && storedLinkedPageImage && storedLinkedInFollowers_count) {
            setIsLoggedIn(true);
            setSelectedPage(storedPageName);
            setLinkedPageImage(storedLinkedPageImage);
            setLinkedInFollowers_count(storedLinkedInFollowers_count);
        }
    }, [token]);

    const handleLinkedInLogin = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/quantum-share/connect/linkedin', {
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
            // Handle error
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
            localStorage.removeItem('LinkedInUsername');
            localStorage.removeItem('linkedProfileImage');
            setIsLoggedIn(false);
            setLinkedInUsername('');
            toast.success("Disconnected from LinkedIn!");
        } catch (error) {
            console.error('Error disconnecting from LinkedIn:', error);
            toast.error("Error disconnecting from LinkedIn. Please try again later.");
        } finally {
            setDisconnecting(false);
        }
    };

    const handlePageDisconnect = () => {
        setOpenPageDisconnect(true);
    };

    const handlePageClose = () => {
        setOpenPageDisconnect(false);
    };

    const handleConfirmPageDisconnect = async () => {
        handlePageClose();
        setDisconnecting(true);
        try {
            const response = await axiosInstance.get('/quantum-share/disconnect/linkedin/page', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('linkedinPageName');
            localStorage.removeItem('linkedPageImage');
            localStorage.removeItem('linkedInFollowers_count');
            setSelectedPage('');
            setLinkedPageImage('');
            setLinkedInFollowers_count('');
            toast.success(response.data.data);
        } catch (error) {
            console.error('Error disconnecting LinkedIn page:', error);
            toast.error("Error disconnecting LinkedIn page. Please try again later.");
        } finally {
            setDisconnecting(false);
        }
    };

    return (
        <>
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {isLoggedIn ? (
                    <div className="profile-container">
                        {linkedProfileImage || linkedPageImage ? (
                            <div className="profile-circle">
                                {linkedProfileImage ? (
                                    <div>
                                        <img
                                            src={linkedProfileImage}
                                            alt="User Profile"
                                            style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                                        />
                                        <div className="instagram-icon">
                                            <ReactSVG src={linkedinicon} />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <img
                                            src={linkedPageImage}
                                            alt="Page Profile"
                                            style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                                        />
                                        <div className="instagram-icon">
                                            <ReactSVG src={linkedinicon} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ReactSVG src={linkedIn}></ReactSVG>
                        </div>}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <ReactSVG src={linkedIn}></ReactSVG>
                    </div>
                )}
                <div style={{ marginTop: '15px' }}>
                    <p style={{ marginTop: '1px', fontSize: '1.2rem' }}>
                        <span style={{ color: 'gray' }}>
                            {LinkedInUsername || selectedPage || 'LinkedIn'}
                        </span>
                    </p>
                    {selectedPage && (
                        <span style={{ marginRight: '6px' }}>Followers Count: {linkedInFollowers_count}</span>
                    )}
                </div>
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    <>
                        {!LinkedInUsername && !selectedPage ? (
                            <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleLinkedInLogin} disabled>Connect</Button>
                        ) : (
                            <>
                                {LinkedInUsername && (
                                    <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                                )}
                                {selectedPage && !LinkedInUsername && (
                                    <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handlePageDisconnect}>Disconnect Page</Button>
                                )}
                            </>
                        )}
                    </>
                )}
            </section>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>
                        Are you sure you want to disconnect {LinkedInUsername} LinkedIn profile?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmDisconnect} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openPageDisconnect} onClose={handlePageClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>
                        Are you sure you want to disconnect {selectedPage} LinkedIn page?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePageClose}>Cancel</Button>
                    <Button onClick={handleConfirmPageDisconnect} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LinkedInLogin;