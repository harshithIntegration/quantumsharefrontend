/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from "../Helper/AxiosInstance";
import { toast } from 'react-toastify';

const YoutubeCallback = () => {
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [channelImageUrl, setChannelImageUrl] = useState('');
    const [channelName, setChannelName] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

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
                }
            });
            const { channelImageUrl, channelName, subscriberCount } = response.data.data;
            localStorage.setItem('channelImageUrl', channelImageUrl);
            localStorage.setItem('channelName', channelName);
            localStorage.setItem('subscriberCount', subscriberCount);
            setChannelImageUrl(channelImageUrl);
            setChannelName(channelName);
            setSubscriberCount(subscriberCount);
            setIsLoggedIn(true);
            toast.success("Connected to YouTube!");
            navigate("/social-integration");
        } catch (error) {
            console.error('Error fetching channel details:', error);
            toast.error("Error Connecting to Youtube. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

        </>
    )
}

export default YoutubeCallback