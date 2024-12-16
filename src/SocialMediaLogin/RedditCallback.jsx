/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Helper/AxiosInstance';
import { toast } from 'react-toastify';
import { setRedditLoggedIn } from '../Redux/action/loginStatusSilce';
import { useDispatch } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';

const RedditCallback = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('token');
    const [redditProfileImage, setRedditProfileImage] = useState('');
    const [redditUsername, setRedditUsername] = useState('');
    const [subcribersCount, setSubcribersCount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    console.log("hi2");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        let codeParam = urlParams.get('code');
        if (codeParam) {
            console.log("Original Code:", codeParam);

            handleRedditCallback(codeParam);
        } else {
            console.error('Authorization code is missing from the URL parameters.');
        }
    }, [location]);

    const handleRedditCallback = async (code) => {
        setIsLoading(true);
        try {
            console.log('Sending request with code:', code);
            const response = await axiosInstance.post(`/quantum-share/callback/reddit?state=string&code=${code}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Token sent to backend successfully');
            if (response.data.data) {
                console.log(response);
                const responseData = response.data.data;
                const { redditUsername, redditProfileImage, subscribersCount } = responseData;
                setRedditProfileImage(redditProfileImage)
                setRedditUsername(redditUsername);
                setSubcribersCount(subscribersCount)
                setIsLoading(true);
                dispatch(setRedditLoggedIn(true));
                toast.success("Reddit connected successfully!");
                navigate('/social-integration');
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
            toast.error("Error connecting to Reddit. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            {isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <TailSpin color="#d3040c" height={50} width={50} />
            </div>}
        </div>
    );
};

export default RedditCallback;
