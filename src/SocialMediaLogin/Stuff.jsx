/* eslint-disable no-undef */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext, useRef } from "react";
import { Dialog, DialogContent, DialogActions, Grid, Button, Tooltip, Popover, Zoom, DialogContentText } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from "../Helper/AxiosInstance";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../Context/ImageContext";
import { useToast } from '../Context/ToastContext';

const Post = ({ onClose }) => {
    const navigate = useNavigate()
    let token = sessionStorage.getItem("token");
    const [open, setOpen] = useState(true);
    const [open1, setOpen1] = useState(false);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [scheduleDateTime, setScheduleDateTime] = useState(null);
    const [caption, setCaption] = useState('');
    const [title, setTitle] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
    const [shareButtonDisabled, setShareButtonDisabled] = useState(true);
    const [commentValue, setCommentValue] = useState('');
    const [changesMade, setChangesMade] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState([]);
    const [mediaPlatform, setMediaPlatform] = useState([]);
    const { image1 } = useContext(ImageContext);
    const [showBox, setShowBox] = useState(false);
    const [disableMainTooltip, setDisableMainTooltip] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const boxRef = useRef(null);
    const tooltipTimerRef = useRef(null);
    const webcamRef = useRef(null)
    const mediaRecorderRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [sr, setSr] = useState('');
    const [postSubmitted, setPostSubmitted] = useState(false)
    const [AIopen, setAIopen] = useState(false)
    const dispatch = useDispatch()
    const AiText = useSelector((state) => state.Aitext.AiText)

    const validatePlatforms = () => {
        let newWarningMessages = [];
        let shouldDisableShare = false;

        if (!file && !caption) {
            newWarningMessages.push("A post cannot be shared without either text or media.");
            shouldDisableShare = true;
        }

        if (file && !mediaPlatform.length) {
            newWarningMessages.push("Please select at least one media platform to share the post.");
            shouldDisableShare = true;
        }
        if (mediaPlatform.includes('youtube')) {
            if (!title) {
                newWarningMessages.push("Please enter a title for YouTube.");
                shouldDisableShare = true;
            } else if (fileType !== 'video') {
                if (mediaPlatform.length > 1) {
                    newWarningMessages.push(
                        "The selected image will be shared to all selected platforms except YouTube. Only video files can be shared to YouTube."
                    );
                    shouldDisableShare = true;
                } else {
                    newWarningMessages.push(
                        "Only video files can be shared to YouTube. Please select a video."
                    );
                    shouldDisableShare = true;
                }
            }
        }

        if (mediaPlatform.includes('Reddit')) {
            if (!title || !sr) {
                if (!title) newWarningMessages.push("Please enter a title for Reddit.");
                if (!sr) newWarningMessages.push("Please enter a subreddit for Reddit.");
                shouldDisableShare = true;
            }
        }

        if (mediaPlatform.includes('Reddit') && (fileType === 'image' || fileType === 'video')) {
            newWarningMessages.push(
                "Reddit does not support image or video sharing. Please remove the media or deselect Reddit."
            );
            shouldDisableShare = true;
        }

        if ((mediaPlatform.includes('instagram') || mediaPlatform.includes('youtube')) && !file) {
            newWarningMessages.push(
                "Instagram and YouTube only support media posts. The text will be shared to other platforms."
            );
            shouldDisableShare = true;
        }

        setWarningMessages(newWarningMessages);
        setShareButtonDisabled(shouldDisableShare);
    };

    useEffect(() => {
        if (!mediaPlatform.length && !file && !caption) {
            setWarningMessages(["A post cannot be shared without either text or media."]);
            setShareButtonDisabled(true);
        } else if (file && !mediaPlatform.length) {
            setWarningMessages(["Please select at least one media platform to share the post."]);
            setShareButtonDisabled(true);
        } else if (mediaPlatform.length > 0 && (file || caption)) {
            validatePlatforms();
        }
    }, [mediaPlatform, title, sr, file, fileType, caption]);

    const closeDialog = () => {
        setOpen(false);
        setFile(null);
        setFileType('');
        setSelectedOption('');
        setScheduleDateTime(null);
        setTitle('');
        setCaption('');
        setCommentValue('');
        setMediaPlatform([]);
        onClose();
    };

    const handleConfirmCloseOpen = () => {
        if (changesMade) {
            setCaption('');
            dispatch(clearAiText());
            setChangesMade(false);
            closeDialog();
        } else {
            setCaption('');
            dispatch(clearAiText());
            closeDialog();
        }
    };

    const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setShowBox(false);
            setDisableMainTooltip(false);
            clearTimeout(tooltipTimerRef.current);
        }
    };

    useEffect(() => {
        if (showBox) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            clearTimeout(tooltipTimerRef.current);
        };
    }, [showBox]);

    const platformMappings = {
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'telegram': 'Telegram',
        'LinkedIn': 'LinkedIn',
        'youtube': 'Youtube'
    };

    const getDisplayPlatformName = (platform) => {
        const lowercasePlatform = platform.toLowerCase();
        if (platformMappings[lowercasePlatform]) {
            return platformMappings[lowercasePlatform];
        } else {
            return platform.charAt(0).toUpperCase() + platform.slice(1);
        }
    };

    const getEndpointForPlatform = (platform) => {
        switch (platform) {
            case 'facebook':
                return '/quantum-share/post/file/facebook';
            case 'instagram':
                return '/quantum-share/post/file/instagram';
            case 'telegram':
                return '/quantum-share/post/file/telegram';
            case 'LinkedIn':
                return '/quantum-share/post/file/linkedIn';
            case 'youtube':
                return '/quantum-share/post/file/youtube';
            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
    };

    const createFormData = (file, caption, title, platform, sr) => {
        const formData = new FormData();
        if (file) {
            formData.append('mediaFile', file);
        }
        formData.append('caption', caption);
        formData.append('title', title);
        formData.append('mediaPlatform', platform);
        formData.append('sr', sr);
        return formData;
    };

    const { showToast } = useToast();
    const handleSubmit = async () => {
        setConfirmCloseOpen(false);
        setOpen1(false);
        const platforms = mediaPlatform.split(',');
        if (!platforms || platforms.length === 0) {
            showToast('Please Select a Social Media Platform!');
            return;
        }
        try {
            const loadingToasts = platforms.map(platform =>
                showToast(`Posting to ${getDisplayPlatformName(platform)}...`)
            );
            const responses = await Promise.all(platforms.map(async platform => {
                const endpoint = getEndpointForPlatform(platform);
                const formData = createFormData(file, caption, title, platform, image1, sr);
                try {
                    const response = await axiosInstance.post(endpoint, formData, {
                        headers: {
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        params: { mediaPlatform: platform }
                    });
                    showToast(loadingToasts[platforms.indexOf(platform)]);
                    if (platform === 'LinkedIn') {
                        if (response.data.structure && response.data.structure.message) {
                            const res = response.data.structure;
                            showToast(res.message);
                        } else if (response.data.structure?.status === "error" && response.data.structure.code === 114) {
                            const res = response.data.structure;
                            console.error('Credit Depleted Error Message:', res.message);
                            showToast(res.message);
                        } else if (response.data.structure?.code === 404) {
                            showToast(response.data.structure.message);
                        }
                    }
                    return { platform, success: true };
                } catch (error) {
                    showToast(loadingToasts[platforms.indexOf(platform)]);
                    const responseData = error.response?.data || {};
                    if (error.response?.status === 403) {
                        showToast('Forbidden: You do not have permission to access this resource.');
                    } else if (platform === 'LinkedIn') {
                        if (responseData.structure?.status === "error" && responseData.structure.code === 114) {
                            const err = responseData.structure;
                            console.error('Credit Depleted Error Message:', err.message);
                            showToast(err.message);
                        } else if (responseData.structure?.code === 404) {
                            showToast(responseData.structure.message);
                        }
                    } else if (responseData.code === 115) {
                        showToast("Token Expired, Please Login Again");
                        setTimeout(() => {
                            navigate("/login");
                        }, 4000);
                    } else {
                        console.log('An error occurred while processing your request.');
                        showToast('An error occurred while processing your request.');
                    }
                    return { platform, success: false };
                }
            }));
            resetState();
            setPostSubmitted(true);
        } catch (error) {
            console.error('Request failed:', error);
            showToast('Request failed:', error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    const resetState = () => {
        setFile(null);
        setFileType('');
        setSelectedOption('');
        setScheduleDateTime(null);
        setTitle('');
        setCaption('');
        setCommentValue('');
        setChangesMade(false);
        setSelectedIcons([]);
        setMediaPlatform([]);
        setImageUrl('')
    };

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen1(false);
    };

    useEffect(() => {
        if (image1) {
            setFileType('image');
            fetch(image1)
                .then(res => res.blob())
                .then(blob => {
                    const fileFromBlob = new File([blob], 'image1.png', { type: blob.type });
                    setFile(fileFromBlob);
                    setShareButtonDisabled(false);
                });
        }
    }, [image1]);

    return (
        <>
            <Dialog className="postContent" open={open} onClose={closeDialog} fullWidth maxWidth="lg">
                <DialogContent>
                    {/* my component JSX here */}
                </DialogContent>
                <DialogActions className="action">
                    <Button onClick={handleConfirmCloseOpen} color="error">Cancel</Button>
                    <Button variant="contained" disabled={shareButtonDisabled} endIcon={<SendIcon />} onClick={handleClickOpen} sx={{ borderRadius: '20px' }}>Share</Button>
                    <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth>
                        <DialogContent>
                            <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>Are you sure you want to Post?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} style={{ color: '#ba343b' }}>Cancel</Button>
                            <Button onClick={handleSubmit} style={{ color: '#ba343b' }} autoFocus>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default Post;  