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
import { useDispatch, useSelector } from 'react-redux';
import { setPageUrls } from '../Redux/action/pageUrlsSlice';
import { setFbName } from '../Redux/action/NameSlice';
import { setIsLoggedIn } from '../Redux/action/loginStatusSilce';
import { useTranslation } from 'react-i18next';

const FacebookLogin = () => {
    let token = sessionStorage.getItem("token");
    const [code, setCode] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [facebookUrl, setFBProfileImage] = useState('');
    const [facebookUsername, setFBUsername] = useState('');
    const [facebookNumberofpages, setNumberOfPages] = useState('');
    const [pageData, setPageData] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const {t} = useTranslation('');
    // const [processing, setProcessing] = useState(false);

    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state) => state.loginStatus)

    const fetchConnectedSocial = async () => {
        try {
            const endpoint = 'quantum-share/user/connected/socialmedia/facebook'
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.data)
            if (response.data.status === 'success' && response.data.data.facebook) {
                const { facebookUrl, facebookUsername, facebookNumberofpages, pages_url } = response.data.data.facebook;
                const pageDataArray = Object.entries(pages_url).map(([pageName, pageUrl]) => ({
                    pageName,
                    pageUrl,
                }));
                setPageData(pageDataArray);
                setFBProfileImage(facebookUrl);
                const pageUrls = pageDataArray.map(({ pageUrl }) => pageUrl);
                const pageNames = pageDataArray.map(({ pageName }) => pageName)
                dispatch(setFbName(pageNames))
                dispatch(setPageUrls(pageUrls));
                dispatch(setIsLoggedIn(true))
                setFBUsername(facebookUsername);
                setNumberOfPages(facebookNumberofpages);
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchConnectedSocial()
    }, [token])

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
                }, { scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,business_management,read_insights' });
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
            dispatch(setIsLoggedIn(false))
            setLoading(false);
        }
    };

    const sendTokenToBackend = async (accessToken) => {
        // setProcessing(true); 
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
                const pageUrls = pageDataArray.map(({ pageUrl }) => pageUrl);
                const pageNames = pageDataArray.map(({ pageName }) => pageName)
                dispatch(setFbName(pageNames))
                dispatch(setPageUrls(pageUrls));
                dispatch(setIsLoggedIn(true))
                setFBUsername(facebookUsername);
                setNumberOfPages(facebookNumberofpages);
                toast.success("Connected to Facebook!");
                // const platform = response.data.platform;
                // const platformResponse = await axiosInstance.get(`/quatumshare/fetch/all/post`, {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     },
                //     params: { platform }
                // });    
                // console.log(platformResponse.data);
                // setProcessing(false);
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
            toast.error("Error connecting to Facebook. Please try again later.");
        } finally {
            setLoading(false);
            // setProcessing(false);
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
            dispatch(setIsLoggedIn(false))
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

    const adjustFontSize = (username) => {
        if (username.length > 20) return '0.875rem';
        if (username.length > 15) return '0.962rem';
        if (username.length > 10) return '1.2rem';
        return '1.2rem';
    };

    return (
        <>
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {isLoggedIn ? (
                    <>
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
                                <p style={{ marginTop: '1px', fontSize: adjustFontSize(facebookUsername), overflow: 'visible' }}>
                                    <span style={{ color: 'gray' }}>{facebookUsername}</span>
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {facebookNumberofpages && (
                                    <h5 style={{ marginRight: '6px' }}>Number Of Pages : {facebookNumberofpages}</h5>
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
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <ReactSVG src={facebook1}></ReactSVG>
                        </div>
                        <div style={{ marginTop: '15px', textAlign: 'center', overflow: 'visible', whiteSpace: 'nowrap' }}>
                            <p style={{ marginTop: '1px', fontSize: '1.2rem', overflow: 'visible' }}>
                                <span style={{ color: 'gray' }}>Facebook</span>
                            </p>
                        </div>
                    </>
                )}
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ marginTop: isLoggedIn ? '15px' : '30px', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !isLoggedIn ? (
                        <Button variant='contained' sx={{ marginTop: '30px', marginBottom: '10px', fontWeight: '600' }} onClick={handleFacebookLogin}>{t('connect')}</Button>
                    ) : (
                        <Button variant='contained' sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>{t('disconnect')}</Button>
                    )
                )}
            </section>

            {/* {processing && (
                <div className="processing-overlay">
                    <div className="processing-message">Processing...</div>
                </div>
            )} */}

            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '17px' }}>
                        {t('confirmDisconnect')} <b>{facebookUsername}</b> {t('facebookProfile')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('cancel')}</Button>
                    <Button onClick={handleConfirmDisconnect} autoFocus>{t('yes')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FacebookLogin;