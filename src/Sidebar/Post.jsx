/* eslint-disable no-undef */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext,useRef } from "react";
import { Dialog, DialogContent, DialogActions, Grid, Button, Tooltip, Popover, Zoom, DialogContentText } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import EmojiPicker from "emoji-picker-react";
import Media from './Media'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from "../Helper/AxiosInstance";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../Context/ImageContext";
import { AppContext } from "../Context/AppContext";
import Webcam from 'react-webcam';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { FaVideo } from "react-icons/fa";

const Post = ({ onClose }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
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
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
    const [shareButtonDisabled, setShareButtonDisabled] = useState(true);
    const [commentValue, setCommentValue] = useState('');
    const [changesMade, setChangesMade] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState([]);
    const [mediaPlatform, setMediaPlatform] = useState([]);
    const { image1 } = useContext(ImageContext);
    const { setRemainingCredits } = useContext(AppContext);
    const [showBox, setShowBox] = useState(false);
    const [disableMainTooltip, setDisableMainTooltip] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    // const [capturedImage, setCapturedImage] = useState('');
    const boxRef = useRef(null);
    const tooltipTimerRef = useRef(null);
    const webcamRef = useRef(null)
    const mediaRecorderRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const handleSelectIconAndSendToParent = (selectedIcons, mediaPlatform) => {
        setSelectedIcons(selectedIcons);
        setMediaPlatform(mediaPlatform);
        console.log(mediaPlatform);
    };

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
            console.log("ps:hit");
            onClose()
            setConfirmCloseOpen(true);
        } else {
            console.log("ps:hit");
            onClose()
            closeDialog();
        }
    };

    const handleButtonClick = () => {
        if (!showBox && !disableMainTooltip) {
            setShowBox(true);
            tooltipTimerRef.current = setTimeout(() => {
                setDisableMainTooltip(true);
            }, 1000);
        } else {
            setShowBox(false);
            setDisableMainTooltip(false);
            clearTimeout(tooltipTimerRef.current);
        }
    };

    const handleCameraClick = () => {
        setShowCamera(true);
        setShowBox(false);
        setDisableMainTooltip(false);
        clearTimeout(tooltipTimerRef.current);
    };

    const handleGalleryClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileType(selectedFile.type.startsWith('image') ? 'image' : 'video');
        }
    };

    const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setShowBox(false);
            setDisableMainTooltip(false);
            clearTimeout(tooltipTimerRef.current);
        }
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();

        // Convert base64 image to Blob
        const byteCharacters = atob(imageSrc.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        // Create File object from Blob
        const file = new File([blob], 'captured_image.png', { type: 'image/png' });

        // Set state variables
        setFile(file); // Set the File object as the selected file
        setFileType('image'); // Update the file type to 'image'
        setShareButtonDisabled(false);
        setShowCamera(false);
    };

    const handleStartRecording = async () => {
        if (!isRecording) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            console.log(stream);
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } else {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

        }
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            const videoFile = new File([event.data], 'recorded_video.webm', { type: 'video/webm' });
            console.log(videoFile);
            setFile(videoFile); // Set the File object as the selected file
            setFileType('video'); // Update the file type to 'video'
            setShareButtonDisabled(false);
            setShowCamera(false);
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

    const handleChangesMade = () => {
        setChangesMade(true);
    };

    const platformMappings = {
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'telegram': 'Telegram',
        'youtube': 'Youtube',
        'twitter': 'Twitter'
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
            case 'youtube':
                return '/quantum-share/post/file/youtube';
            case 'twitter':
                return '/quantum-share/post/file/twitter';
            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
    };

    const createFormData = (file, caption, title, platform) => {
        const formData = new FormData();
        if (file) {
            formData.append('mediaFile', file);
        }
        formData.append('caption', caption);
        formData.append('title', title);
        formData.append('mediaPlatform', platform);
        return formData;
    };

    const handleSubmit = async () => {
        setOpen1(false);
        const platforms = mediaPlatform.split(',');
        if (!platforms || platforms.length === 0) {
            toast.error('Please Select a Social Media Platform!');
            return;
        }
        try {
            const loadingToasts = platforms.map(platform =>
                toast.loading(`Posting to ${getDisplayPlatformName(platform)}...`)
            );
            const responses = await Promise.all(platforms.map(async platform => {
                const endpoint = getEndpointForPlatform(platform);
                const formData = createFormData(file, caption, title, platform, image1);
                try {
                    const response = await axiosInstance.post(endpoint, formData, {
                        headers: {
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        params: { mediaPlatform: platform }
                    });
                    toast.dismiss(loadingToasts[platforms.indexOf(platform)]);

                    if (platform === 'facebook' && Array.isArray(response.data)) {
                        response.data.forEach(res => {
                            if (res.status === "success" && res.platform === "facebook") {
                                toast.success(res.message);
                                setRemainingCredits(res.remainingCredits); // Update remainingCredits context
                                localStorage.setItem('remainingCredits', res.remainingCredits); // Update local storage
                            } else if (res.status === "error" && res.code === 114) {
                                console.error('Credit Depleted Error Message:', res.message); // Log only the message
                                toast.error(res.message);
                            }
                        });
                    } else if (platform === 'instagram' && response.data.success?.status === "success") {
                        const res = response.data.success;
                        toast.success(res.message);
                        setRemainingCredits(res.remainingCredits); // Update remainingCredits context
                        localStorage.setItem('remainingCredits', res.remainingCredits); // Update local storage
                    } else if (platform === 'instagram' && response.data.structure?.status === "error" && response.data.structure.code === 114) {
                        const res = response.data.structure;
                        console.error('Credit Depleted Error Message:', res.message); // Log only the message
                        toast.error(res.message);
                    } else if (platform === 'telegram' && response.data.success?.status === "success") {
                        const res = response.data.success;
                        toast.success(res.message);
                        setRemainingCredits(res.remainingCredits);
                        localStorage.setItem('remainingCredits', res.remainingCredits)
                        // toast.success(response.data.success.message);
                    } else if (platform === 'telegram' && response.data.structure?.status === "error" && response.data.structure.code === 114) {
                        const res = response.data.structure;
                        console.error('Credit Depleted Error Message:', res.message); // Log only the message
                        toast.error(res.message);
                    } else if (platform === 'youtube' && response.data.success?.message) {
                        toast.success(response.data.success.message);
                    } else if (platform === 'twitter' && response.data.success?.message) {
                        toast.success(response.data.success.message);
                    }
                    return { platform, success: true };
                } catch (error) {
                    toast.dismiss(loadingToasts[platforms.indexOf(platform)]);
                    const responseData = error.response?.data || {};

                    if (error.response?.status === 403) {
                        // toast.error('Forbidden: You do not have permission to access this resource.');
                    } else if (error.response?.status === 406) {
                        if (Array.isArray(responseData)) {
                            responseData.forEach(err => {
                                if (err.status === "error" && err.code === 114) {
                                    console.error('Credit Depleted Error Message:', err.message); // Log only the message
                                    toast.error(err.message);
                                }
                            });
                        } else if (responseData.structure?.status === "error" && responseData.structure.code === 114) {
                            const err = responseData.structure;
                            console.error('Credit Depleted Error Message:', err.message); // Log only the message
                            toast.error(err.message);
                        }
                    } else if (Array.isArray(responseData)) {
                        responseData.forEach(err => {
                            if (err.status === "error" && err.code === 114) {
                                console.error('Credit Depleted Error Message:', err.message); // Log only the message
                                toast.error(err.message);
                            }
                        });
                    } else if (platform === 'facebook' && Array.isArray(responseData)) {
                        responseData.forEach(err => {
                            if (err.code === 404 && err.platform === platform.toLowerCase()) {
                                toast.error(err.message);
                            } else if (err.status === "error" && err.code === 114) {
                                console.error('Credit Depleted Error Message:', err.message); // Log only the message
                                toast.error(err.message);
                            }
                        });
                    } else if (platform === 'instagram' && responseData.structure?.status === "error" && responseData.structure.code === 114) {
                        const err = responseData.structure;
                        console.error('Credit Depleted Error Message:', err.message); // Log only the message
                        toast.error(err.message);
                    } else if (platform === 'instagram' && responseData.structure?.code === 404) {
                        toast.error(responseData.structure.message);
                    } else if (platform === 'instagram' && responseData.code === 500) {
                        toast.error("Instagram: Please Submit an Image with a Valid Aspect Ratio");
                    } else if (platform === 'telegram' && responseData.structure?.code === 404) {
                        toast.error(responseData.structure.message);
                    } else if (platform === 'youtube' && responseData.structure?.code === 404) {
                        toast.error(responseData.structure.message);
                    } else if (platform === 'youtube' && responseData.structure?.code === 500) {
                        toast.error("Youtube: The request cannot be completed because you have exceeded your Request Limits");
                    } else if (platform === 'twitter' && responseData.structure?.code === 404) {
                        toast.error(responseData.structure.message);
                    } else if (responseData.code === 115) {
                        toast.error("Token Expired, Please Login Again");
                        setTimeout(() => {
                            navigate("/login");
                        }, 4000);
                    } else {
                        toast.error('An error occurred while processing your request.');
                    }
                    return { platform, success: false };
                }
            }));
            resetState();
        } catch (error) {
            console.error('Request failed:', error);
            toast.error('Request failed:', error.response?.data?.message || 'An unexpected error occurred.');
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
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileType(selectedFile?.type.startsWith('image') ? 'image' : 'video');
        setShareButtonDisabled(false);
        handleChangesMade();
        console.log('File selected:', e.target.files[0]);
    };

    const handle = (event) => {
        setSelectedOption(event.target.value);
        handleChangesMade();
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        handleChangesMade();
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
        handleChangesMade();
    };

    const addEmoji = (e) => {
        if (e.unified.startsWith('1F1E6')) {
            const codePoints = e.unified.split('-').map((code) => parseInt(code, 16));
            const flagEmoji = String.fromCodePoint(...codePoints);
            setCaption((prevText) => prevText + flagEmoji);
        } else {
            const sym = e.unified.split('_');
            const codeArray = sym.map((el) => parseInt(el, 16));
            const emoji = String.fromCodePoint(...codeArray);
            setCaption((prevText) => prevText + emoji);
        }
        handleChangesMade();
    };

    const handleEmojiIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleHashtagIconClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClosePopover1 = () => {
        setAnchorEl1(null);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const filtered = suggestions.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        handleChangesMade();
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name);
        setFilteredSuggestions([]);
    }

    const handleTextAreaKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            setInputValue(inputValue + ' #')
        }
    }

    const handleSendClick = () => {
        if (inputValue.trim() !== '') {
            setCaption((prevValue) => prevValue + ' #' + inputValue.trim());
            setInputValue('');
        }
        setAnchorEl1(null);
    }

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
                    <Grid container spacing={1}>
                        <Grid item lg={7} md={7} xs={12} sx={{ border: 1, borderStyle: 'ridge' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 id="newPost">New Post</h4>
                                <Media onMediaPlatform={handleSelectIconAndSendToParent} initialMediaPlatform={mediaPlatform} />
                            </div>
                            <div className="choose">
                                {/* <textarea className="area" rows={12} placeholder="Add your Title here..." value={title} name="title" onChange={handleTitleChange}
                                    style={{ width: '98%', height: '40px', border: '1px solid #ccc', borderRadius: '5px', resize: 'none', outline: 'none', fontSize: '12px', padding: '12px' }} /> */}
                                <textarea className="area" rows={12} placeholder="Add your Caption/Description here..." value={caption} name="caption" onChange={handleCaptionChange}
                                    style={{ width: '98%', border: '1px solid #ccc', borderRadius: '5px', resize: 'none', outline: 'none' }} id="textHere" />
                                <div>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <Tooltip
                                                TransitionComponent={Zoom}
                                                title="Attach Photo or Video"
                                                enterDelay={100}
                                                leaveDelay={100}
                                                placement="bottom">
                                                <IconButton onClick={handleButtonClick}>
                                                    <AddPhotoAlternateOutlinedIcon />
                                                    <input
                                                        id="fileInput"
                                                        type="file"
                                                        accept="image/, video/"
                                                        style={{ display: "none" }}
                                                        onChange={handleChange}
                                                        name="mediaFile" />
                                                </IconButton>
                                            </Tooltip>
                                            {showBox && (
                                                <div
                                                    ref={boxRef}
                                                    style={{
                                                        border: '0.1px solid #d3d3d3',
                                                        padding: '1px',
                                                        position: 'absolute',
                                                        bottom: '100%',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        backgroundColor: 'white',
                                                        zIndex: 1
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                        <Tooltip title="Take Photo" placement="top">
                                                            <IconButton onClick={handleCameraClick}>
                                                                <PhotoCameraIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Select Photo or Video" placement="top">
                                                            <IconButton onClick={handleGalleryClick}>
                                                                <InsertPhotoIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            )}
                                            <input
                                                id="fileInput"
                                                type="file"
                                                accept="image/, video/"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                name="mediaFile"
                                            />
                                            {showCamera && (
                                                <div style={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    zIndex: 2
                                                }}>
                                                    <Webcam ref={webcamRef} style={{ width: '95%', height: '95%' }} />
                                                    <div style={{ position: 'absolute', bottom: 20, display: 'flex', gap: 10 }}>
                                                        <IconButton onClick={handleCapture} style={{ color: 'white' }} name="mediaFile" >
                                                            <PhotoCameraIcon name="mediaFile" />
                                                        </IconButton>
                                                        <IconButton onClick={handleStartRecording} style={{ color: 'white' }} name="mediaFile">
                                                            <FaVideo name="mediaFile" />
                                                        </IconButton>
                                                        <IconButton onClick={() => setShowCamera(false)} style={{ color: 'white' }}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <Tooltip TransitionComponent={Zoom} title="Add emojis" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <MoodOutlinedIcon onClick={handleEmojiIconClick} />
                                                <Popover
                                                    open={Boolean(anchorEl)}
                                                    anchorEl={anchorEl}
                                                    onClose={handleClosePopover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}

                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <EmojiPicker onEmojiClick={addEmoji} />
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Add Location" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <FmdGoodOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Hashtag" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <TagOutlinedIcon onClick={handleHashtagIconClick} />
                                                <Popover
                                                    open={Boolean(anchorEl1)}
                                                    anchorEl={anchorEl1}
                                                    onClose={handleClosePopover1}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            height: '185px',
                                                            background: '#f5f5f5'
                                                        },
                                                    }}>
                                                    <div style={{ padding: '10px', width: '100px', display: 'flex', flexDirection: 'column' }}>
                                                        <textarea
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={handleInputChange}
                                                            onKeyDown={handleTextAreaKeyPress}
                                                            placeholder="Enter text only"
                                                            style={{ width: '280px', resize: 'none', border: '0.5px solid grey', outline: 'none', borderRadius: '10px', paddingTop: '5px' }}
                                                        />
                                                        {filteredSuggestions.length > 0 && (
                                                            <div>
                                                                {filteredSuggestions.map((suggestion, index) => (
                                                                    <div key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer', padding: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                                                                        <div>{suggestion.name}</div>
                                                                        <div>{suggestion.view}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <Button onClick={handleSendClick} variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(200px,80px)' }} >
                                                            Add
                                                        </Button>
                                                    </div>
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Tag People" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <SellOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                    <FormControl className="option" sx={{ mt: 3, width: 300, maxWidth: '100%' }}>
                                        <InputLabel id="demo-select-small-label">Select an Option</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={selectedOption}
                                            onChange={handle}
                                            label="Select an Option"
                                            sx={{ fontSize: '16px', mb: 1 }}
                                        >
                                            <MenuItem value={10}>Post Now</MenuItem>
                                            <MenuItem disabled value={20}>Schedule Specific Date and Time</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {selectedOption === 20 && (
                                    <div className="datetime-picker" style={{ width: 300, maxWidth: '100%', marginBottom: '10px' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={scheduleDateTime}
                                                onChange={(newValue) => setScheduleDateTime(newValue)}
                                                sx={{ mt: 1 }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item lg={5} md={5} xs={12} sx={{ border: 1, borderStyle: 'ridge', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
                            <div className="preview" style={{ padding: '8px' }}>
                                <h4 id="newPost">Media Preview</h4>
                            </div>
                            <div style={{ background: '#fff', width: '95%', maxWidth: '100%', height: '100%', borderRadius: '10px' }}>
                                <div className="main-preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', background: '#fff' }}>
                                    <div className="file-preview-container" style={{ height: 'auto', width: '350px', padding: '1px', maxWidth: '100%', textAlign: 'center' }}>

                                        {fileType === 'image' && file && (
                                            <img src={URL.createObjectURL(file)} alt="File Preview" className="file-preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                        )}
                                        {imageUrl && (
                                            <img src={imageUrl} alt="Captured Preview" className="file-preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                        )}

                                        {fileType === 'video' && file && (
                                            <video controls className="file-preview" style={{ maxHeight: '100%', maxWidth: '100%' }}>
                                                <source src={URL.createObjectURL(file)} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {!file && !imageUrl && (
                                            <p id="imgPreview" style={{ marginTop: '100px', color: '#808080' }}>Image / Video Preview</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-preview" style={{ wordBreak: 'break-all', padding: '10px' }}>{title.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}</div>
                                <div className="text-preview" style={{ wordBreak: 'break-all', padding: '10px' }}>{caption.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}</div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="action">
                    <div>
                        <Button onClick={handleConfirmCloseOpen} color="error">
                            Cancel
                        </Button>
                        <Button variant="contained" disabled={shareButtonDisabled} endIcon={<SendIcon />} onClick={handleClickOpen} sx={{ borderRadius: '20px' }}>
                            Share
                        </Button>
                        <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth>
                            <DialogContent>
                                <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>
                                    Are you sure you want to Post?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default Post;  