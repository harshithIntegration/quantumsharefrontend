/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../Helper/AxiosInstance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaCamera } from "react-icons/fa";
import { TailSpin } from 'react-loader-spinner';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
// import bg1 from '../Assets/ok.jpg';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { IoMdClose } from "react-icons/io";

const AccountOverview = () => {
    let token = localStorage.getItem('token');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/quantum-share/user/account-overview', {
                headers: {
                    'Content-Type': 'application/json',
                    'Method': 'GET',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserData(response.data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axiosInstance.post('/quantum-share/user/account-overview', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Method': 'POST',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.status === 'success' && response.data.data) {
                    const { profile_pic } = response.data.data;
                    setProfile(profile_pic);
                    console.log(profile_pic);
                    localStorage.setItem('profile_pic', profile_pic);
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        fetchData();
        const storedData = localStorage.getItem('profile_pic');
        if (storedData) {
            setProfile(storedData);
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex' }}>
                <Sidenav />
                <div style={{ flexGrow: 1 }} id='accountOverview'>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                            <TailSpin
                                height="40"
                                width="40"
                                color="#ba343b"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                visible={true}
                            />
                        </div>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        userData && (
                            <div id='accountDisplay'>
                                <div className="avatar-container">
                                    {userData.profile_pic ? (
                                        <img src={userData.profile_pic} alt="Profile" className='avatar' />
                                    ) : (
                                        <AccountCircleIcon id='avatar' />
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div><br /><br />
                                <p>{userData.name}</p><br />
                                <p>{userData.email}</p><br />
                                <p>{userData.mobile}</p><br />
                                <p>{userData.company_name}</p><br />
                                <button style={{ backgroundColor: '#ba343b', color: '#fff', padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', margin: '10px' }} onClick={handleClickOpen}>
                                    Edit
                                </button>
                            </div>
                        )
                    )}
                </div>
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle sx={{ textAlign: 'center' }}>Edit Profile
                            <IoMdClose
                                onClick={handleClose}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '10px',
                                    cursor: 'pointer'
                                }}
                            />
                        </DialogTitle>
                        <DialogContent>
                            <div className="display">
                                <div className="avatar-container-in" style={{ backgroundColor: profile ? '#fff' : '#8f8a8a' }}>
                                    {profile ? (
                                        <img src={profile} alt="Profile" className='avatar-in' />
                                    ) : (
                                        <AccountCircleIcon id='avatar' />
                                    )}
                                    <label htmlFor="profilePicInput" style={{ cursor: 'pointer', marginTop: '10px', display: 'block', textAlign: 'center', fontSize: 12, color: '#ba343b', fontWeight: '600' }} onClick={handleCameraClick}>
                                        Change Photo
                                    </label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {/* <div style={{ marginTop: '20px' }}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={userData ? userData.name : ''}
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ style: { height: '10px' } }}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={userData ? userData.email : ''}
                                        fullWidth
                                        margin="normal"
                                        disabled
                                        inputProps={{ style: { height: '10px' } }}
                                    />
                                    <TextField
                                        label="Mobile"
                                        name="mobile"
                                        value={userData ? userData.mobile : ''}
                                        fullWidth
                                        margin="normal"
                                        disabled
                                        inputProps={{ style: { height: '10px' } }}
                                    />
                                    <TextField
                                        label="Company_Name"
                                        name="company_name"
                                        value={userData ? userData.company_name : ''}
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ style: { height: '10px' } }}
                                    />
                                </div> */}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <button onClick={handleClose} style={{ backgroundColor: '#ba343b', color: '#fff', padding: '10px 15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', marginTop: '1rem', marginRight: '1.4rem' }}>UPDATE</button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default AccountOverview;