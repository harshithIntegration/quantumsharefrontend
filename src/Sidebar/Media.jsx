// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import { Button, Tooltip, Popover, Zoom, Checkbox } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import { CiCirclePlus } from "react-icons/ci";
// import { ReactSVG } from 'react-svg';
// import facebook1 from '../Assets/facebook.svg'
// import instagram1 from '../Assets/instagram.svg'
// import telegram1 from '../Assets/telegram.svg'
// import LinkedIn1 from '../Assets/LinkedIn.svg'
// import youtube1 from '../Assets/youtube.svg'
// import { useState } from 'react';

// const Media = ({ onMediaPlatform }) => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [showPopover, setShowPopover] = useState(false);
//     const [submittedIcons, setSubmittedIcons] = useState([]);
//     const [mediaPlatform, setMediaPlatform] = useState([]);

//     const mediaPlatforms = [
//         { id: 'facebook', icon: facebook1, name: 'Facebook' },
//         { id: 'instagram', icon: instagram1, name: 'Instagram' },
//         { id: 'telegram', icon: telegram1, name: 'Telegram' },
//         { id: 'LinkedIn', icon: LinkedIn1, name: 'LinkedIn' },
//         { id: 'youtube', icon: youtube1, name: 'Youtube' },
//     ];
//     console.log(mediaPlatform);

//     const handleSelectIconAndSendToParent = (icon) => {
//         const index = mediaPlatform.indexOf(icon);
//         let updatedIcons = [...mediaPlatform];
//         if (index === -1) {
//             updatedIcons.push(icon);
//         } else {
//             updatedIcons.splice(index, 1);
//         }
//         setMediaPlatform(updatedIcons);
//         console.log(updatedIcons);
//         onMediaPlatform(updatedIcons, extractIconNames(updatedIcons));
//     };

//     const handlePopoverOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//         setShowPopover(true);
//     };

//     const extractIconNames = (iconPaths) => {
//         return iconPaths.map(path => {
//             if (typeof path !== 'string') {
//                 console.error('Invalid path:', path);
//                 return '';
//             }
//             const fileName = path.split('/').pop();
//             const iconName = fileName.split('.')[0];
//             return iconName.replace('icons8-', '');
//         }).join(",");
//     };

//     const iconNames = extractIconNames(mediaPlatform);
//     console.log(iconNames);

//     const handlePopoverClose = () => {
//         if (showPopover) {
//             setShowPopover(false);
//             setMediaPlatform(submittedIcons);
//         }
//     };

//     const handleSubmit = () => {
//         setSubmittedIcons(mediaPlatform);
//         setShowPopover(false);
//         console.log(mediaPlatform);
//         onMediaPlatform(mediaPlatform, extractIconNames(mediaPlatform));
//     };

//     const handelCancel = () => {
//         if (showPopover) {
//             setShowPopover(false);
//             setMediaPlatform(submittedIcons);
//             onMediaPlatform(submittedIcons, extractIconNames(submittedIcons));
//         }
//     }

//     return (
//         <div>
//             <Tooltip TransitionComponent={Zoom} enterDelay={100} leaveDelay={100}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     {submittedIcons.length === 0 && (
//                         <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
//                             <span style={{ fontSize: '14px', color: 'black' }}>Select Social Media</span>
//                         </div>
//                     )}
//                     <IconButton>
//                         <CiCirclePlus style={{ fontSize: '30px' }} onClick={handlePopoverOpen} />
//                     </IconButton>
//                     {submittedIcons.map((icon, index) => (
//                         <div key={index} className="selected-icon" style={{ marginLeft: '10px', margin: '4px' }}>
//                             <img src={icon} alt={`Selected Icon ${index}`} style={{ width: '35px', maxWidth: '100%', maxHeight: '100%' }} />
//                         </div>
//                     ))}
//                 </div>
//                 <Popover
//                     open={showPopover}
//                     anchorEl={anchorEl}
//                     onClose={handlePopoverClose}
//                     slotProps={{
//                         style: {
//                             borderRadius: '10px',
//                             padding: '10px',
//                             width: '380px',
//                             overflow: 'auto',
//                             height: '230px',
//                         },
//                     }}
//                 >
//                     <Typography sx={{ p: 2, maxWidth: '350px' }}>
//                         <Tooltip style={{ display: 'flex', flexWrap: 'wrap' }}>
//                             <div className='box-container-soc' style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '230px', padding: '10px' }}>
//                                 {mediaPlatforms.map((platform) => (
//                                     <div
//                                         key={platform.id}
//                                         style={{
//                                             display: 'flex',
//                                             flexDirection: 'row',
//                                             alignItems: 'center',
//                                             padding: '10px',
//                                             backgroundColor: mediaPlatform.includes(platform.icon),
//                                             borderRadius: '10px',
//                                             transition: 'background-color 0.3s ease',
//                                             cursor: 'pointer'
//                                         }}
//                                         onClick={() => handleSelectIconAndSendToParent(platform.icon)}
//                                     >
//                                         <Checkbox
//                                             checked={mediaPlatform.includes(platform.icon)}
//                                             onChange={() => handleSelectIconAndSendToParent(platform.icon)}
//                                             color="primary"
//                                             style={{ padding: '0 10px 0 0' }}
//                                         />
//                                         <ReactSVG src={platform.icon} style={{ marginRight: '10px', width: '35px', height: '35px' }} />
//                                         <span style={{ fontSize: '14px', color: 'black' }}>{platform.name}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </Tooltip>
//                     </Typography>
//                     <Button variant="outlined" color="error" style={{ marginTop: 'auto', padding: '5px 5px', transform: 'translate(20px,-10px)' }} onClick={handelCancel} >
//                         Cancel
//                     </Button>
//                     <Button variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(100px,-10px)' }} onClick={handleSubmit}  >
//                         Submit
//                     </Button>
//                 </Popover>
//             </Tooltip>
//         </div>
//     )
// }

// export default Media



import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Tooltip, Popover, Zoom, Checkbox } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import FacebookIcon from '../Assets/facebooksmall.svg';
import LinkedinIcon from '../Assets/linkedinsmall.svg';
import InstagramIcon from '../Assets/instagramsmall.svg'
import TelegramIcon from '../Assets/telegramsmall.svg'
import YoutubeIcon from '../Assets/youtubesmall.svg'

const Media = ({ onMediaPlatform, postSubmitted }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [submittedIcons, setSubmittedIcons] = useState([]);
    const [mediaPlatform, setMediaPlatform] = useState([]);

    const isLoggedIn = useSelector((state) => state.loginStatus.isLoggedIn);
    const instaLoggedIn = useSelector((state) => state.loginStatus.instaLoggedIn);
    const telLoggedIn = useSelector((state) => state.loginStatus.telLoggedIn);
    const linkLoggedIn = useSelector((state) => state.loginStatus.linkLoggedIn);
    const YouLoggedIn = useSelector((state) => state.loginStatus.YouLoggedIn);

    const instagramUrl = useSelector((state) => state.imageUrls.instagramUrl);
    const pageUrls = useSelector((state) => state.imageUrls.pageUrls);
    const telegramProfileUrl = useSelector((state) => state.imageUrls.telegramProfileUrl);
    const linkedinprofile = useSelector((state) => state.imageUrls.linkedinprofile);
    const youtubeProfile = useSelector((state) => state.imageUrls.youtubeProfile);

    const fbpagename = useSelector((state) => state.profilename.fbpagename);
    const instaname = useSelector((state) => state.profilename.instaname)
    const linkname = useSelector((state) => state.profilename.linkname)
    const youname = useSelector((state) => state.profilename.youname)
    const telname = useSelector((state) => state.profilename.telname)

    const mediaPlatforms = [
        { id: 'facebook', icon: pageUrls, name: 'facebook', isLoggedIn, profileUrl: fbpagename },
        { id: 'instagram', icon: instagramUrl, name: 'instagram', isLoggedIn: instaLoggedIn, profileUrl: instaname },
        { id: 'telegram', icon: telegramProfileUrl, name: 'telegram', isLoggedIn: telLoggedIn, profileUrl: telname },
        { id: 'LinkedIn', icon: linkedinprofile, name: 'LinkedIn', isLoggedIn: linkLoggedIn, profileUrl: linkname },
        { id: 'youtube', icon: youtubeProfile, name: 'youtube', isLoggedIn: YouLoggedIn, profileUrl: youname },
    ];
    console.log(mediaPlatform);

    const handleSelectIconAndSendToParent = (platform) => {
        const index = mediaPlatform.indexOf(platform.name);
        let updatedPlatforms = [...mediaPlatform];
        if (index === -1) {
            updatedPlatforms.push(platform.name);
        } else {
            updatedPlatforms.splice(index, 1);
        }
        setMediaPlatform(updatedPlatforms);
        const platformString = updatedPlatforms.join(",");
        console.log(platformString);
        onMediaPlatform(updatedPlatforms, platformString);
    }

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setShowPopover(true);
    }

    const handlePopoverClose = () => {
        if (showPopover) {
            setShowPopover(false);
            setMediaPlatform(submittedIcons);
        }
    };

    const handleSubmit = () => {
        setSubmittedIcons(mediaPlatform);
        setShowPopover(false);
    };

    const handleCancel = () => {
        if (showPopover) {
            setShowPopover(false);
            setMediaPlatform(submittedIcons);
            const platformString = submittedIcons.join(',');
            onMediaPlatform(submittedIcons, platformString);
        }
    };

    const platformIcon = {
        facebook: FacebookIcon,
        instagram: InstagramIcon,
        LinkedIn: LinkedinIcon,
        telegram: TelegramIcon,
        youtube: YoutubeIcon,
    }

    useEffect(() => {
        if (postSubmitted) {
            setSubmittedIcons([])
            setMediaPlatform([])
        }
    }, [postSubmitted])

    return (
        <div>
            <Tooltip TransitionComponent={Zoom} enterDelay={100} leaveDelay={100}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {submittedIcons.length === 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
                            <span style={{ fontSize: '14px', color: 'black' }}>Select Social Media</span>
                        </div>
                    )}
                    <IconButton>
                        <CiCirclePlus style={{ fontSize: '30px' }} onClick={handlePopoverOpen} />
                    </IconButton>
                    {submittedIcons.map((iconName, index) => {
                        const platform = mediaPlatforms.find(p => p.name === iconName);
                        return (
                            <div
                                key={index}
                                className="selected-icon"
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    margin: '10px'
                                }}>
                                <img
                                    src={platform.icon}
                                    alt={`Profile for ${iconName}`}
                                    style={{
                                        width: '35px',
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <img
                                    src={platformIcon[iconName]}
                                    alt={`${iconName} Logo`}
                                    style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '0.5px white'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
                <Popover
                    open={showPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    slotProps={{
                        style: {
                            borderRadius: '10px',
                            padding: '10px',
                            width: '380px',
                            overflow: 'auto',
                            height: '230px',
                        },
                    }}
                >
                    <Typography sx={{ p: 2, maxWidth: '350px' }}>
                        <Tooltip style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className='box-container-soc' style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '230px', padding: '10px' }}>
                                {mediaPlatforms.some(platform => platform.isLoggedIn) ? (
                                    mediaPlatforms.filter(platform => platform.isLoggedIn).map((platform) => (
                                        <div
                                            key={platform.id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: '10px',
                                                backgroundColor: mediaPlatform.includes(platform.name) ? '#f0f0f0' : 'transparent',
                                                borderRadius: '10px',
                                                transition: 'background-color 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleSelectIconAndSendToParent(platform)}
                                        >
                                            <Checkbox
                                                checked={mediaPlatform.includes(platform.name)}
                                                color="primary"
                                                style={{ padding: '0 10px 0 0' }}
                                            />
                                            <img
                                                src={platform.icon}
                                                alt={`${platform.name} icon`}
                                                style={{ marginRight: '10px', width: '35px', height: '35px', borderRadius: '50%' }}
                                            />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '14px', color: 'black' }}>{platform.name}</span>
                                                <span style={{ fontSize: '10px', color: '#aaa' }}>{platform.profileUrl}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '10px', textAlign: 'start', color: '#888' }}>
                                        Please connect to social media
                                    </div>
                                )}

                            </div>
                        </Tooltip>
                    </Typography>
                    <Button variant="outlined" color="error" sx={{ marginTop: 'auto', padding: '5px 5px', transform: 'translate(20px,-10px)' }} onClick={handleCancel} >
                        Cancel
                    </Button>
                    <Button variant="contained" sx={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(100px,-10px)' }} onClick={handleSubmit}  >
                        Submit
                    </Button>
                </Popover>
            </Tooltip>
        </div>
    );
}

export default Media;