/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Helper/AxiosInstance';
import { toast } from 'react-toastify';
import { FaRegCircle, FaRegCircleDot } from "react-icons/fa6";
import { TailSpin } from 'react-loader-spinner';

const LinkedInCallback = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [LinkedInUsername, setLinkedInUsername] = useState('');
    const [code, setCode] = useState('');
    const [pages, setPages] = useState([]);
    const [selectedPageName, setSelectedPageName] = useState(null);
    const [linkedProfileImage, setLinkedProfileImage] = useState('');
    const [linkedPageImage, setLinkedPageImage] = useState('');
    const [linkedInFollowers_count, setLinkedInFollower_count] = useState('');
    const [activeSelection, setActiveSelection] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageConnecting, setIsPageConnecting] = useState(false); // New state for page connection loading
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const codeParam = urlParams.get('code');
        if (codeParam) {
            setCode(codeParam);
        } else {
            console.error('Authorization code is missing from the URL parameters.');
        }
    }, [location]);

    const handleLinkedInCallback = async (code, type) => {
        try {
            setIsLoading(true);
            console.log('Sending request with code:', code, 'and type:', type);
            const response = await axiosInstance.post(`/quantum-share/callback/success?code=${code}&type=${type}`, { code, type }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });

            console.log('Full response:', response);
            const responseData = response.data;
            console.log('Response data:', responseData);

            if (responseData) {
                if (type === 'profile') {
                    if (responseData.data) {
                        const parsedData = JSON.parse(responseData.data);
                        console.log('Parsed profile data:', parsedData);
                        const { LinkedInUsername, image_url } = parsedData;
                        localStorage.setItem('LinkedInUsername', LinkedInUsername);
                        setLinkedInUsername(LinkedInUsername);
                        localStorage.setItem('linkedProfileImage', image_url);
                        setLinkedProfileImage(image_url);
                        setIsLoggedIn(true);
                        toast.success("Successfully connected to LinkedIn!");
                        navigate("/social-integration");
                    } else {
                        console.error('LinkedInUsername is missing in the response data.');
                    }
                } else if (type === 'page') {
                    const pagesData = responseData.data;
                    console.log('Pages data:', pagesData);

                    if (pagesData && Array.isArray(pagesData)) {
                        setPages(pagesData);
                    } else {
                        console.error('Pages data is missing or invalid in the response.');
                        setPages([]);
                    }
                }
            } else {
                console.error('Response data is missing.');
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
            toast.error("Error connecting to LinkedIn. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfileClick = () => {
        setActiveSelection('profile');
        if (code) {
            handleLinkedInCallback(code, 'profile');
        } else {
            console.error('Authorization code is missing.');
        }
    };

    const handlePageClick = () => {
        setActiveSelection('page');
        if (code) {
            handleLinkedInCallback(code, 'page');
        } else {
            console.error('Authorization code is missing.');
        }
    };

    const handlePageSelect = async (page) => {
        try {
            setIsPageConnecting(true); // Start loading
            console.log('Selected page:', page);
            const response = await axiosInstance.post('/quantum-share/save-selected-page', page, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log('Save page response:', response);

            if (response.status === 200) {
                const { message } = response.data;
                console.log(message);
                localStorage.setItem('linkedinPageName', message);
                console.log(message + ' connected successfully');
                toast.success(message + ' connected successfully');
                const { followers_count, logoUrl } = response.data.data;
                console.log({ followers_count, logoUrl });
                localStorage.setItem('linkedPageImage', logoUrl);
                localStorage.setItem('linkedInFollowers_count', followers_count);
                setIsLoggedIn(true);
                setSelectedPageName(message);
                setLinkedPageImage(logoUrl);
                setLinkedInFollower_count(followers_count);
                navigate("/social-integration");
            } else {
                toast.error("Failed to save the selected page.");
            }
        } catch (response) {
            toast.error("Error saving the selected page. Please try again later.");
        } finally {
            setIsPageConnecting(false); // Stop loading
        }
    };

    return (
        <section id='callbacks'>
            <article>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TailSpin color="#d3040c" height={50} width={50} />
                    </div>
                ) : (
                    <>
                        {activeSelection !== 'page' ? (
                            <div>
                                <h2 style={{ textAlign: 'center', marginTop: '1rem', color: '#d3040c' }}>LinkedIn: what do you want to set up?</h2>
                                <div style={{ marginLeft: '4.5rem', marginTop: '2rem' }}>
                                    <div onClick={handleProfileClick} style={{ margin: '1rem', display: 'flex', gap: '10px' }}>
                                        {activeSelection === 'profile' ? <FaRegCircleDot style={{ color: 'blue', fontSize: '1.3rem' }} /> : <FaRegCircle style={{ fontSize: '1.3rem' }} />}
                                        <h3>LinkedIn Personal Profile</h3>
                                    </div>
                                    <div onClick={handlePageClick} style={{ margin: '1rem', display: 'flex', gap: '10px' }}>
                                        {activeSelection === 'page' ? <FaRegCircleDot style={{ color: 'blue', fontSize: '1.3rem' }} /> : <FaRegCircle style={{ fontSize: '1.3rem' }} />}
                                        <h3>LinkedIn Company Page</h3>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {Array.isArray(pages) && pages.length > 0 && activeSelection === 'page' && !isPageConnecting ? (
                            <div>
                                <h3 style={{ color: '#d3040c', textAlign: 'center' }}>Your LinkedIn Associated Pages:</h3>
                                <ul>
                                    {pages.map((page) => (
                                        <li key={page.linkedinPageURN} style={{ marginLeft: '7.5rem' }}>
                                            <div onClick={() => handlePageSelect(page)} style={{ margin: '1rem', display: 'flex', gap: '10px' }}>
                                                {selectedPageName === page.linkedinPageName ? <FaRegCircleDot style={{ color: 'blue', fontSize: '1.3rem' }} /> : <FaRegCircle style={{ fontSize: '1.3rem' }} />}
                                                <h3>{page.linkedinPageName}</h3>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                        {isPageConnecting && ( // Show loader while connecting to the page
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TailSpin color="#d3040c" height={50} width={50} />
                            </div>
                        )}
                        {selectedPageName && (
                            <div>
                                <h3>Selected Page:</h3>
                                <p>{selectedPageName}</p>
                            </div>
                        )}
                    </>
                )}
            </article>
        </section>
    );
};

export default LinkedInCallback;