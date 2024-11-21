/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Helper/AxiosInstance';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { setYoutubeProfile } from '../Redux/action/pageUrlsSlice';
import { setYouName } from '../Redux/action/NameSlice';
import { setYouLoggedIn } from '../Redux/action/loginStatusSilce';
import { useTranslation } from 'react-i18next';

const YoutubeCallback = () => {
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeChannelName, setYoutubeChannelName] = useState('');
    const [youtubeSubscriberCount, setYoutubeSubscriberCount] = useState('');
    const [openDialog, setOpenDialog] = useState(false); 
    const [dialogMessage, setDialogMessage] = useState(''); 
    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
        if (code) {
            console.log(code);
            handleFetchChannelDetails(code);
        }
    }, [location]);

    const handleFetchChannelDetails = async (code) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/quantum-share/youtube/user/verify-token?code=${code}`, code, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { youtubeUrl, youtubeChannelName, youtubeSubscriberCount } = response.data.data;
            setYoutubeUrl(youtubeUrl);
            dispatch(setYoutubeProfile(youtubeUrl))
            setYoutubeChannelName(youtubeChannelName);
            setYoutubeSubscriberCount(youtubeSubscriberCount);
            dispatch(setYouLoggedIn(true))
            dispatch(setYouName(youtubeChannelName))
            console.log('Youtube Connect:' , response)
            toast.success("Connected to YouTube!");
            navigate("/social-integration");
        } catch (error) {
            console.error('Error fetching channel details:', error);
            if (error.response && error.response.data.code === 404) {
                setDialogMessage("Please create a YouTube channel and try again.");
                setOpenDialog(true);
            } else {
                toast.error('Error Connecting to YouTube. Please try again later.');
            }
        } finally {
            setLoading(false); 
        }
    };    

    const handleCloseDialog = () => {
        navigate('/social-integration');
    };

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <TailSpin
                        height="60"
                        width="60"
                        color="#ba343b"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        visible={true}
                    />
                </div>
            ) : (
                <>
                
                </>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{ color: '#ba343b', fontSize: '16px', textAlign: 'center', fontWeight: '600' }}>
                    {t('oopsNoYouTubeChannel')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black' }}>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        {t('close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default YoutubeCallback;