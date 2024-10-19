/* eslint-disable no-unused-vars */
/* global FB */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import axiosInstance from "../Helper/AxiosInstance";
import instagram1 from '../Assets/instagram1.svg';
import instaicon from '../Assets/instagramsmall.svg';
import { ReactSVG } from 'react-svg';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInstaName } from '../Redux/action/NameSlice';
import { setInstagramUrl } from '../Redux/action/pageUrlsSlice';
import { setInstaLoggedIn } from '../Redux/action/loginStatusSilce';

const InstagramLogin = () => {
    let token = sessionStorage.getItem("token");
    const [code, setCode] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false)
    const [instagramUrl, setInstaProfileImage] = useState('');
    const [InstagramUsername, setInstaUsername] = useState('');
    const [Instagram_follwers_count, setInstaFollowers] = useState('');

    const dispatch = useDispatch()
    const { instaLoggedIn }=useSelector((state)=>state.loginStatus)

    const fetchConnectedSocial = async () => {
        try {
            const endpoint = 'quantum-share/user/connected/socialmedia/instagram'
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.data)
            if (response.data.status === 'success' && response.data.data) {
                const { instagramUrl, InstagramUsername, Instagram_follwers_count } = response.data.data.instagram;
                setInstaProfileImage(instagramUrl);
                setInstaUsername(InstagramUsername);
                dispatch(setInstaName(InstagramUsername))
                setInstaFollowers(Instagram_follwers_count);
                dispatch(setInstagramUrl(instagramUrl));
                dispatch(setInstaLoggedIn(true))
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchConnectedSocial()
    }, [token])

    const handleConnect = () => {
        setOpen(true);
    }

    const handleConnectClose = () => {
        setOpen(false);
    }

    const loadInstagramSdk = () => {
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

    const handleInstagramLogin = () => {
        handleConnectClose();
        setLoading(true);
        loadInstagramSdk()
            .then(() => {
                FB.login(function (response) {
                    if (response.authResponse) {
                        checkLoginState();
                    } else {
                        console.log('User canceled login or didn\'t authorize the app');
                        setLoading(false);
                    }
                }, { scope: 'instagram_basic,instagram_content_publish,business_management,instagram_manage_insights' });
            })
            .catch(error => {
                console.error('Error loading Instagram SDK:', error);
                toast.error('Error loading Instagram SDK. Please try again later.');
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
            dispatch(setInstaLoggedIn(false))
            setLoading(false);
        }
    };

    const sendTokenToBackend = async (accessToken) => {
        try {
            const response = await axiosInstance.post(`/quantum-share/instagram/user/verify-token?code=${accessToken}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log('Token sent to backend successfully');
            if (response.data.status === 'success' && response.data.data) {
                const { instagramUrl, InstagramUsername, Instagram_follwers_count } = response.data.data;
                setInstaProfileImage(instagramUrl);
                setInstaUsername(InstagramUsername);
                dispatch(setInstaName(InstagramUsername))
                setInstaFollowers(Instagram_follwers_count);
                dispatch(setInstagramUrl(instagramUrl));
                dispatch(setInstaLoggedIn(true))
                toast.success("Connected to Instagram!");
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
            toast.error("Error Connecting to Instagram. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen1(false);
    };

    const handleConfirmDisconnect = async () => {
        handleClose();
        setDisconnecting(true)
        try {
            await axiosInstance.get('/quantum-share/disconnect/instagram', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setInstaLoggedIn(false))
            setInstaUsername('');
            setInstaFollowers('');
            setInstaProfileImage('');
            toast.success("Disconnected from Instagram!");
        } catch (error) {
            console.error('Error disconnecting from Instagram:', error);
            toast.error("Error disconnecting from Instagram. Please try again later.");
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
                {instaLoggedIn ? (
                    <>
                        <div className="profile-container">
                            <div className="profile-circle">
                                <img
                                    src={instagramUrl}
                                    alt="User Profile"
                                    style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                                />
                                <div className="instagram-icon">
                                    <ReactSVG src={instaicon} />
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
                                <p style={{ marginTop: '1px', fontSize: adjustFontSize(InstagramUsername) }}>
                                    <span style={{ color: 'gray' }}>{InstagramUsername}</span>
                                </p>
                            </div>
                            <h5>{`Followers : ${Instagram_follwers_count}`}</h5>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <ReactSVG src={instagram1}></ReactSVG>
                        </div>
                        <div style={{ marginTop: '15px', textAlign: 'center', overflow: 'visible', whiteSpace: 'nowrap' }}>
                            <p style={{ marginTop: '1px', fontSize: '1.2rem', overflow: 'visible' }}>
                                <span style={{ color: 'gray' }}>Instagram</span>
                            </p>
                        </div>
                    </>
                )}
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ marginTop: instaLoggedIn ? '15px' : '30px', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !instaLoggedIn ? (
                        <Button variant='contained' sx={{ marginTop: '30px', marginBottom: '10px', fontWeight: '600' }} onClick={handleConnect}>Connect</Button>
                    ) : (
                        <Button variant='contained' sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                    )
                )}
            </section>

            <Dialog open={open} onClose={handleConnectClose}>
                <DialogTitle sx={{ m: 0, p: 2, color: '#ba343b', fontSize: '20px', textAlign: 'center' }}>
                    Link Instagram Profile
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText sx={{ fontSize: '18px' }}>
                        Ensure that you account is converted as <b>Instagram Business</b> or <b>Instagram Creator</b> Account.
                    </DialogContentText>
                    <DialogContentText sx={{ fontSize: '18px' }}>
                        And Verify that Instagram Account is connected to a <b>Facebook Page</b>.
                    </DialogContentText>
                    <br />
                    <DialogContentText sx={{ fontSize: '17px', textAlign: 'center' }}>
                        Know more how to <Link to='/connect-socialmedia#instagram' id='info'>Connect a Facebook Page to an Instagram</Link><OpenInNewIcon sx={{ color: '#067acc', verticalAlign: 'middle', marginLeft: '2px', marginBottom: '5px', fontSize: 'medium' }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConnectClose}>Cancel</Button>
                    <Button autoFocus value={code} name="code" onClick={handleInstagramLogin}>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open1} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '17px' }}>
                        Are you sure you want to disconnect from <b>{InstagramUsername}</b> Instagram Profile ?
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

export default InstagramLogin;