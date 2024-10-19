import { Box } from '@mui/material';
import React from 'react'
import axiosInstance from '../Helper/AxiosInstance';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';

const LoginWithGoogle = () => {
    let navigate = useNavigate()

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse?.credential);
            console.log('Decoded JWT:', decoded);

            const accessToken = credentialResponse?.credential;
            console.log('Access Token:', accessToken);

            const phoneNumber = await fetchUserPhoneNumber(accessToken);
            console.log('Phone Number:', phoneNumber);

            const formData = {
                email: decoded.email,
                firstName: decoded.given_name,
                lastName: decoded.family_name,
                phoneNumber, 
            };

            const endpoint = '/quantum-share/user/login/google/authentication';
            const response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            sessionStorage.setItem('token', response.data.data);
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 406) {
                    console.log("Account already exists.");
                    toast.error("Account already exists.");
                } else {
                    console.error('Google Login Error:', error);
                    toast.error('Error signing in with Google.');
                }
            } else {
                console.error('Google Login Error:', error);
                toast.error('Error signing in with Google.');
            }
        }
    };

    const fetchUserPhoneNumber = async (accessToken) => {
        try {
            const response = await fetch(
                'https://people.googleapis.com/v1/people/me?personFields=phoneNumbers',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();

            if (data && data.phoneNumbers && data.phoneNumbers.length > 0) {
                return data.phoneNumbers[0].value;
            } else {
                console.warn('Phone number not found in the user profile');
                return null;
            }
        } catch (error) {
            console.error('Error fetching phone number:', error);
            return null;
        }
    };

    return (
        <div>
            <Box sx={{ width: 'fit-content', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    style={{ width: '100%', borderRadius: '10px', overflow: 'hidden' }}
                    scope="openid email profile https://www.googleapis.com/auth/user.phonenumbers.read"
                />
            </Box>
        </div>
    )
}

export default LoginWithGoogle