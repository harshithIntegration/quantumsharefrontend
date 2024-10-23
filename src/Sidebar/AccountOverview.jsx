/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../Helper/AxiosInstance';
import { TailSpin } from 'react-loader-spinner';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import blankimage from '../Assets/BlankProfileImage.jpg'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const AccountOverview = () => {
    let token = sessionStorage.getItem("token");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [company, setCompany] = useState('');
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/quantum-share/user/account-overview', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.data;
                console.log('Fetched data:', data);
                setUserData(data);
                setFirstname(data.name.split(' ')[0] || '');
                setLastname(data.name.split(' ')[1] || '');
                setEmail(data.email || '');
                setPhoneNo(data.mobile || '');
                setCompany(data.company_name || '');
                if (data.profile_pic) {
                    setProfile(data.profile_pic);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile(URL.createObjectURL(file));
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSaveChanges = async () => {
        setLoading(true); 
        const formData = new FormData();

        if (firstname && firstname !== userData.name.split(' ')[0]) {
            formData.append('firstname', firstname);
        }

        if (lastname && lastname !== userData.name.split(' ')[1]) {
            formData.append('lastname', lastname);
        }

        if (phoneNo && phoneNo !== userData.mobile) {
            formData.append('phoneNo', phoneNo);
        }

        if (company && company !== userData.company_name) {
            formData.append('company', company);
        }

        if (email && email !== userData.email) {
            formData.append('email', email);
        }

        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append('file', fileInputRef.current.files[0]);
        }

        if (!formData.has('firstname') && !formData.has('lastname') && !formData.has('phoneNo') && !formData.has('company') && !formData.has('file') && !formData.has('email')) {
            toast.error("No changes to update.");
            setLoading(false); 
            return;
        }

        try {
            const response = await axiosInstance.post('/quantum-share/user/account-overview', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response.data.message);
            handleClose();
            if (email && email !== userData.email) {
                navigate('/verify/update');
            }
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
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
                                    <h1>User Profile</h1>
                                    <div className="avatar-container">
                                        {profile ? (
                                            <img src={profile} className='avatar' />
                                        ) : (
                                            <img src={blankimage} className='avatar' />
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="accountInfo">
                                        <p>{`${firstname} ${lastname}`}</p>
                                        <p><EmailIcon sx={{ marginBottom: '-8px', color: 'grey' }} /> {email}</p>
                                        <p><PhoneIcon sx={{ marginBottom: '-8px', color: 'grey' }} /> {phoneNo}</p>
                                        <p><BusinessIcon sx={{ marginBottom: '-8px', color: 'grey' }} /> {company}</p>
                                    </div>
                                    <button className="editBtn" onClick={handleClickOpen}>
                                        Edit <BorderColorOutlinedIcon sx={{ marginBottom: '-1px', color: 'white', fontSize: '18px' }} />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                    <div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle sx={{ textAlign: 'center' }}>Edit Profile
                                <IoMdClose onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }} />
                            </DialogTitle>
                            <DialogContent className="dialog-content">
                                <div className="avatar-container-in">
                                    {profile ? (
                                        <img src={profile} alt="Profile" className="avatar-in" />
                                    ) : (
                                        <img src={blankimage} alt="Profile" className="avatar-in" />
                                    )}
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            marginTop: '3px',
                                            display: 'block',
                                            textAlign: 'center',
                                            fontSize: 12,
                                            color: '#ba343b',
                                            fontWeight: '600',
                                        }}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        Change Photo
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <Divider sx={{ width: '450px', position: 'relative', top: '10px' }} />
                                <div id="scroll">

                                    <TextField
                                        label="First Name"
                                        name="firstname"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Last Name"
                                        name="lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Mobile"
                                        name="mobile"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Company Name"
                                        name="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        fullWidth
                                        margin="normal"
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <button onClick={handleSaveChanges}
                                    style={{ backgroundColor: '#ba343b', color: '#fff', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', margin: '10px' }}>
                                    {loading ? (
                                        <TailSpin height="20" width="20" color="#fff" ariaLabel="loading" />
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AccountOverview;