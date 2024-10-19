import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axiosInstance from "../Helper/AxiosInstance";
import telegram1 from '../Assets/telegram1.svg';
import tgicon from '../Assets/telegramsmall.svg';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Zoom from '@mui/material/Zoom';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setTelLoggedIn } from '../Redux/action/loginStatusSilce';
import { setTelName } from '../Redux/action/NameSlice';
import { setTelegramUrl } from '../Redux/action/pageUrlsSlice';

const TelegramLogin = () => {
    let token = sessionStorage.getItem("token");
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [telegramProfileUrl, setTelegramProfileUrl] = useState('');
    const [telegramGroupName, setTelegramGroupName] = useState('');
    const [telegramCode, setTelegramCode] = useState('');
    const [telegramGroupMembersCount, setTelegramGroupMembersCount] = useState('');
    const [copied, setCopied] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);

    const dispatch = useDispatch()
    const { telLoggedIn } = useSelector((state) => state.loginStatus)

    const fetchConnectedSocial = async () => {
        try {
            const endpoint = 'quantum-share/user/connected/socialmedia/telegram';
            const response = await axiosInstance.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);

            if (response.data.status === 'success' && response.data.data) {
                const { telegramProfileUrl, telegramGroupName, telegramGroupMembersCount } = response.data.data.telegram;

                if (telegramProfileUrl && telegramGroupName && telegramGroupMembersCount > 0) {
                    setTelegramProfileUrl(telegramProfileUrl);
                    dispatch(setTelegramUrl(telegramProfileUrl))
                    setTelegramGroupName(telegramGroupName);
                    dispatch(setTelName(telegramGroupName))
                    setTelegramGroupMembersCount(telegramGroupMembersCount);
                    dispatch(setTelLoggedIn(true));
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchConnectedSocial()
    }, [token])

    const handleConnectPopup = () => {
        setOpen1(false);
        setLoading(false);
    }

    const handleTelegramLogin = async () => {
        setOpen1(true);
        setLoadingCode(true);
        try {
            const response = await axiosInstance.get('/quantum-share/telegram/user/connect', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { data } = response.data;
            setTelegramCode(data);
            console.log(response.data);
        } catch (error) {
            console.error('Error', error);
        } finally {
            setLoadingCode(false);
        }
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(telegramCode)
            .then(() => {
                console.log('Text copied to clipboard');
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 2000);
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            })
    }

    const handleGetDetails = async () => {
        setOpen1(false);
        setLoading(true);
        try {
            const response = await axiosInstance.get('/quantum-share/telegram/user/authorization', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status === 'success' && response.data.data) {
                console.log(response);
                const { telegramProfileUrl, telegramGroupName, telegramGroupMembersCount } = response.data.data;
                setTelegramProfileUrl(telegramProfileUrl);
                dispatch(setTelegramUrl(telegramProfileUrl))
                setTelegramGroupName(telegramGroupName);
                dispatch(setTelName(telegramGroupName))
                setTelegramGroupMembersCount(telegramGroupMembersCount);
                dispatch(setTelLoggedIn(true))
                toast.success("Connected to Telegram!");
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.code === 400) {
                toast.info("Please paste the Generated Code in your Group or Channel.");
            } else if (error.response && error.response.data && error.response.data.code === 500) {
                toast.error("Telegram Server Error, Please Try Again Later");
            } else {
                toast.error("Error connecting to Telegram. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleDisconnect = () => {
        setOpen(true);
    };

    const handleDisconnectPopup = () => {
        setOpen(false);
    };

    const handleConfirmDisconnect = async () => {
        handleDisconnectPopup();
        setDisconnecting(true);
        try {
            await axiosInstance.get('/quantum-share/disconnect/telegram', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(setTelLoggedIn(false))
            setTelegramGroupName('');
            setTelegramProfileUrl('');
            setTelegramGroupMembersCount('');
            toast.success("Disconnected from Telegram!");
        } catch (error) {
            console.error('Error disconnecting from Telegram:', error);
            toast.error("Error disconnecting from Telegram. Please try again later.");
        } finally {
            setDisconnecting(false);
        }
    };

    const adjustFontSize = (username) => {
        if (username.length > 20) return '0.875rem';
        if (username.length > 15) return '0.962rem';
        if (username.length > 10) return '1.2rem';
        return '1.2rem';
    };

    return (
        <>
            <section className='box-soc' style={{ paddingTop: '20px' }}>
                {telLoggedIn ? (
                    <>
                        <div className="profile-container">
                            <div className="profile-circle">
                                <img
                                    src={telegramProfileUrl}
                                    alt="User Profile"
                                    style={{ width: '3.9rem', height: '3.9rem', borderRadius: '50%' }}
                                />
                                <div className="instagram-icon">
                                    <ReactSVG src={tgicon} />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div
                                style={{
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px',
                                    height: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <p style={{ marginTop: '1px', fontSize: adjustFontSize(telegramGroupName) }}>
                                    <span style={{ color: 'gray' }}>{telegramGroupName}</span>
                                </p>
                            </div>
                            <h5>{`Group Members : ${telegramGroupMembersCount}`}</h5>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <ReactSVG src={telegram1}></ReactSVG>
                        </div>
                        <div style={{ marginTop: '15px', textAlign: 'center', overflow: 'visible', whiteSpace: 'nowrap' }}>
                            <p style={{ marginTop: '1px', fontSize: '1.2rem', overflow: 'visible' }}>
                                <span style={{ color: 'gray' }}>Telegram</span>
                            </p>
                        </div>
                    </>
                )}
                {loading || disconnecting ? (
                    <Button variant='contained' sx={{ marginTop: telLoggedIn ? '15px' : '30px', marginBottom: '10px', fontWeight: '600' }} disabled>
                        {loading ? 'Connecting...' : 'Disconnecting...'}
                    </Button>
                ) : (
                    !telLoggedIn ? (
                        <Button variant='contained' sx={{ marginTop: '30px', marginBottom: '10px', fontWeight: '600' }} onClick={handleTelegramLogin}>Connect</Button>
                    ) : (
                        <Button variant='contained' sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: '600' }} onClick={handleDisconnect}>Disconnect</Button>
                    )
                )}
            </section>
            <Dialog open={open1} onClose={handleConnectPopup}>
                <DialogTitle sx={{ color: '#b4232a', fontSize: '20px', textAlign: 'center' }}>
                    Link Telegram
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText sx={{ fontSize: '18px' }}>
                        Telegram uses Bot to allow posting to a Group or Channel that you are an owner or admin. Please see this :
                    </DialogContentText>
                    <br />
                    <DialogContentText sx={{ fontSize: '18px', textAlign: 'center' }}>
                        Know more about adding Bot to the Group or Channel
                    </DialogContentText>
                    <DialogContentText sx={{ textAlign: 'center', fontSize: '18px', cursor: 'pointer' }}>
                        <Link to='/connect-socialmedia#telegram' id='info'>Detailed Instructions</Link>
                        <OpenInNewIcon sx={{ color: '#067acc', verticalAlign: 'middle', marginLeft: '2px', marginBottom: '5px', fontSize: 'medium' }} />
                    </DialogContentText>
                    <br />
                    <DialogContentText sx={{ fontSize: '18px' }}>
                        Once the <b> QuantumShare </b> Bot is enabled, you'll need to post the following message or code to your Group or Channel to complete activation.
                        Once posting the message or code in a Group or Channel, <b>Please click on OK here</b>. Please wait a few minutes for a response in Telegram.
                    </DialogContentText>
                    <DialogContentText sx={{ fontSize: '18px', textAlign: 'center' }}>
                        <Link to='/connect-socialmedia#telegram' id='info'>Instructions</Link><OpenInNewIcon sx={{ color: '#067acc', verticalAlign: 'middle', marginLeft: '2px', marginBottom: '5px', fontSize: 'medium' }} /> to connect Telegram Group.
                    </DialogContentText>
                    <br />
                    <DialogContentText>
                        {loadingCode ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TailSpin
                                    height="40"
                                    width="40"
                                    color="#b4232a"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    visible={true}
                                />
                            </div>
                        ) : (
                            <DialogContentText sx={{ color: 'black', fontSize: '18px', border: '0.5px solid gray', borderRadius: '5px', padding: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ marginTop: '5px' }}>{telegramCode}</div>
                                    {telegramCode && (
                                        <>
                                            <IconButton variant="standard" onClick={handleCopyCode}>
                                                <Tooltip title="Copy" placement="top" TransitionComponent={Zoom}>
                                                    {copied ? <DoneIcon /> : <ContentCopyIcon sx={{ color: 'grey' }} />}
                                                </Tooltip>
                                            </IconButton>
                                        </>
                                    )}
                                </div>
                            </DialogContentText>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConnectPopup}>Cancel</Button>
                    <Button autoFocus onClick={handleGetDetails}>OK</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleDisconnectPopup} maxWidth='lg'>
                <DialogContent>
                    <DialogContentText sx={{ color: 'black', fontSize: '17px' }}>
                        Are you sure you want to disconnect from {telegramGroupName} Telegram Group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisconnectPopup}>Cancel</Button>
                    <Button onClick={handleConfirmDisconnect} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TelegramLogin;