/* eslint-disable no-unused-vars */
/* global FB */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Helper/AxiosInstance';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import QS from '../Assets/QS.webp';
import { setLinkLoggedIn } from '../Redux/action/loginStatusSilce';

const LinkedInCallback = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    let token = sessionStorage.getItem("token");
    const [code, setCode] = useState('');
    const [pages, setPages] = useState([]);
    const [linkedInUserName, setLinkedInUserName] = useState('');
    const [linkedInProfilePic, setLinkedInProfilePic] = useState('');
    const [linkedInFollowersCount, setLinkedInFollowersCount] = useState('');
    const [activeSelection, setActiveSelection] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageConnecting, setIsPageConnecting] = useState(false);
    const [isSubmitVisible, setIsSubmitVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const codeParam = urlParams.get('code');
        if (codeParam) {
            setCode(codeParam);
            handleLinkedInCallback(codeParam);
        } else {
            console.error('Authorization code is missing from the URL parameters.');
        }
    }, [location]);

    const handleLinkedInCallback = async (code) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`/quantum-share/linkedin/callback/success?code=${code}`, { code }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });

            const responseData = response.data;
            if (responseData && responseData.data) {
                const { linkedInPages, linkedInProfile } = responseData.data;
                if (linkedInProfile) {
                    setLinkedInUserName(linkedInProfile.name);
                    setLinkedInProfilePic(linkedInProfile.profile_image);
                }
                if (linkedInPages && Array.isArray(linkedInPages)) {
                    setPages(linkedInPages);
                }
            } else {
                console.error('Invalid response from the backend');
            }
        } catch (error) {
            console.error('Error fetching data from backend:', error);
            toast.error("Error connecting to LinkedIn. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelection = async (type, data) => {
        try {
            setIsPageConnecting(true);
            const response = await axiosInstance.post(`/quantum-share/linkedIn/selected/page?type=${type}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                const { linkedInUserName, linkedInProfilePic, linkedInFollowersCount } = response.data.data;
                setLinkedInUserName(linkedInUserName);
                setLinkedInProfilePic(linkedInProfilePic);
                setLinkedInFollowersCount(linkedInFollowersCount);
                dispatch(setLinkLoggedIn(true));
                navigate("/social-integration");
                toast.success(`Connected to LinkedIn ${type === 'profile' ? 'Profile' : 'Page'}!`);
            } else {
                toast.error(`Failed to connect to LinkedIn ${type === 'profile' ? 'Profile' : 'Page'}`);
            }
        } catch (error) {
            console.error('Error saving the selected page/profile:', error);
            toast.error("Error saving the selected page/profile. Please try again later.");
        } finally {
            setIsPageConnecting(false);
        }
    };

    const handleProfileClick = () => {
        setActiveSelection('profile');
        setIsSubmitVisible(true);
    };

    const handlePageSelect = (page) => {
        setActiveSelection(page.urn);
        setIsSubmitVisible(true);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        if (activeSelection === 'profile') {
            handleSelection('profile', {
                urn: "",
                name: linkedInUserName,
                profile_image: linkedInProfilePic,
                accessToken: "",
            }).finally(() => setIsSubmitting(false));
        } else {
            const selectedPage = pages.find(page => page.urn === activeSelection);
            handleSelection('page', {
                urn: selectedPage.urn,
                name: selectedPage.name,
                profile_image: selectedPage.profile_image,
                accessToken: selectedPage.accessToken
            }).finally(() => setIsSubmitting(false)); 
        }
    };

    return (
        <>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <TailSpin color="#d3040c" height={50} width={50} />
                </div>
            ) : (
                <div id='callbacks'>
                    <img src={QS} alt="Logo" style={{ height: 30, width: 'auto', marginLeft: '12rem' }} />
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '20px', fontWeight: 'bold' }}>
                        Add a LinkedIn Profile or a LinkedIn Company Page
                    </div>
                    <div style={{ color: '#d3040c', marginTop: '1rem', fontWeight: 'bold' }}>
                        Add a LinkedIn Profile:
                    </div>
                    <div onClick={handleProfileClick} style={{
                        marginTop: '1rem', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer'
                    }}>
                        <input type="radio" checked={activeSelection === 'profile'} onChange={() => setActiveSelection('profile')} style={{ marginRight: '10px' }} />
                        {linkedInUserName && linkedInProfilePic && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={linkedInProfilePic} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <div>
                                    <h4 style={{ margin: 0 }}>{linkedInUserName}</h4>
                                </div>
                            </div>
                        )}
                    </div>
                    {Array.isArray(pages) && pages.length > 0 && (
                        <>
                            <div style={{ color: '#d3040c', marginTop: '2rem', fontWeight: 'bold' }}>
                                Add a page associated with this account:
                            </div>
                            <ul style={{ paddingLeft: '0', listStyleType: 'none', marginTop: '1rem' }}>
                                {pages.map((page) => (
                                    <li key={page.urn} style={{
                                        padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer'
                                    }} onClick={() => handlePageSelect(page)}>
                                        <input type="radio" checked={activeSelection === page.urn} onChange={() => setActiveSelection(page.urn)} style={{ marginRight: '10px' }} />
                                        <img src={page.profile_image || 'https://via.placeholder.com/50'} alt={page.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        <div style={{ marginLeft: '10px' }}>
                                            <h4 style={{ margin: '0' }}>{page.name}</h4>
                                            <span style={{ fontSize: '14px' }}>LinkedIn Company Page</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {isSubmitVisible && (
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <button onClick={handleSubmit} style={{
                                padding: '10px 20px', backgroundColor: '#d3040c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
                            }}>
                                {isSubmitting ? (
                                    <TailSpin color="#ffffff" height={20} width={20} />
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default LinkedInCallback;