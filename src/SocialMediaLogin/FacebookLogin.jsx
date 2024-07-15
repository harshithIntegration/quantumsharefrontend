/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* global FB */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axiosInstance from "../Helper/AxiosInstance";
import facebook1 from '../Assets/facebook1.svg';
import fbicon from '../Assets/facebooksmall.svg';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, Select } from '@mui/material';

const FacebookLogin = () => {
    const token = localStorage.getItem('token');
    const [code, setCode] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [facebookUrl, setFBProfileImage] = useState('');
    const [facebookUsername, setFBUsername] = useState('');
    const [facebookNumberofpages, setNumberOfPages] = useState('');
    const [pageData, setPageData] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');

    useEffect(() => {
        const storedUrl = localStorage.getItem('facebookUrl');
        const storedUsername = localStorage.getItem('facebookUsername');
        const storedPages = localStorage.getItem('facebookNumberofpages');
        const storedPageData = localStorage.getItem('pageData');
        if (storedUrl && storedUsername && storedPages && storedPageData) {
            setIsLoggedIn(true);
            setFBProfileImage(storedUrl);
            setFBUsername(storedUsername);
            setNumberOfPages(storedPages);
            setPageData(JSON.parse(storedPageData));
        }
    }, [token]);

    const loadFacebookSdk = () => {
        return new Promise((resolve, reject) => {
            if (window.FB) {
                resolve();
            } else {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: '421449853704517',
                        // appId: '1397130744461736',
                        cookie: true,
                        xfbml: true,
                        version: 'v19.0'
                    });
                    resolve();
                };

                (function (d, s, id) {
                    var js,
                        fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        resolve();
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk.js';
                    fjs.parentNode.insertBefore(js, fjs);
                })(document, 'script', 'facebook-jssdk');
            }
        });
    };

    const handleFacebookLogin = () => {
        setLoading(true);
        loadFacebookSdk()
            .then(() => {
                FB.login(function (response) {
                    if (response.authResponse) {
                        checkLoginState();
                    } else {
                        console.log('User canceled login or didn\'t authorize the app');
                        setLoading(false);
                    }
                }, { scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,business_management' });
            })
            .catch(error => {
                console.error('Error loading Instagram SDK:', error);
                toast.error('Error loading Facebook SDK. Please try again later.');
                setLoading(false);
            })
    }

    const checkLoginState = () => {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    };

    const statusChangeCallback = async (response) => {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            const accessToken = response.authResponse.accessToken;
            await sendTokenToBackend(accessToken);
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    };

    const sendTokenToBackend = async (accessToken) => {
        try {
            const response = await axiosInstance.post(`/quantum-share/facebook/user/verify-token?code=${accessToken}`, accessToken, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.status === 'success' && response.data.data) {
                const { facebookUrl, facebookUsername, facebookNumberofpages, pages_url } = response.data.data;
                setFBProfileImage(facebookUrl);
                setFBUsername(facebookUsername);
                setNumberOfPages(facebookNumberofpages);
                const pageDataArray = Object.entries(pages_url).map(([pageName, pageUrl]) => ({
                    pageName,
                    pageUrl,
                }));
                setPageData(pageDataArray);
                console.log(pageDataArray);
                localStorage.setItem('facebookUrl', facebookUrl);
                localStorage.setItem('facebookUsername', facebookUsername);
                localStorage.setItem('facebookNumberofpages', facebookNumberofpages);
                localStorage.setItem('pageData', JSON.stringify(pageDataArray));
                setIsLoggedIn(true);
                toast.success("Connected to Facebook!");
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
            toast.error("Error connecting to Facebook. Please try again later.");
        } finally {
            setLoading(false);
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
            await axiosInstance.get('/quantum-share/disconnect/facebook', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('facebookUrl');
            localStorage.removeItem('facebookUsername');
            localStorage.removeItem('facebookNumberofpages');
            localStorage.removeItem('pageData');
            setIsLoggedIn(false);
            setFBUsername('');
            setNumberOfPages('');
            setFBProfileImage('');
            setPageData([]);
            toast.success("Disconnected from Facebook!");
        } catch (error) {
            console.error('Error disconnecting from Facebook:', error);
            toast.error("Error disconnecting from Facebook. Please try again later.");
        } finally {
            setDisconnecting(false);
        }
    };

    return (
        <>
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {isLoggedIn ? (
                    <div className="profile-container">
                        <div className="profile-circle">
                            <img
                                src={facebookUrl}
                                alt="User Profile"
                                style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                            />
                            <div className="instagram-icon">
                                <ReactSVG src={fbicon} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <ReactSVG src={facebook1}></ReactSVG>
                    </div>
                )}
                <div style={{ marginTop: '15px' }}>
                    <p style={{ marginTop: '1px', fontSize: '1.3rem' }}>
                        <span style={{ color: 'gray' }}>
                            {facebookUsername ? facebookUsername : 'Facebook'}
                        </span>
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {facebookNumberofpages && (
                            <span style={{ marginRight: '6px' }}>Number Of Pages: {facebookNumberofpages}</span>
                        )}
                        {isLoggedIn && pageData.length > 0 && (
                            <Select
                                value={selectedPage}
                                onChange={(e) => setSelectedPage(e.target.value)}
                                style={{ width: '40px', height: '20px' }}
                            >
                                {/* <MenuItem value="" disabled>
                                    Select Page
                                </MenuItem> */}
                                {pageData.map((page, index) => (
                                    <MenuItem key={index} value={page.pageName}>
                                        <img src={page.pageUrl} alt={page.pageName} style={{ width: '20px', height: '20px', marginRight: '8px', borderRadius: '50%' }} />
                                        {page.pageName}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </div>
                </div>
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !isLoggedIn ? (
                        <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} value={code} name="code" onClick={handleFacebookLogin}>Connect</Button>
                    ) : (
                        <Button variant='contained' sx={{ margin: '30px auto', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                    )
                )}
            </section>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '17px' }}>
                        Are you sure you want to disconnect from {facebookUsername} Facebook Profile ?
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

export default FacebookLogin;