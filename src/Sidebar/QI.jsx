// /* eslint-disable jsx-a11y/img-redundant-alt */
// /* eslint-disable no-unused-vars */
// import React, { useState, useContext } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import DownloadIcon from '@mui/icons-material/Download';
// import Grid from '@mui/material/Grid';
// import axiosInstance from '../Helper/AxiosInstance';
// import { Tooltip, CircularProgress, IconButton } from '@mui/material';
// import { RingLoader } from 'react-spinners';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import Zoom from '@mui/material/Zoom';
// import DoneIcon from '@mui/icons-material/Done';
// import Quantum from '../Assets/Quantum_Logo (1).png'
// import { ImageContext } from '../Helper/ImageContext';
// // import { ImageContext } from './ImageContext';

// export default function QI() {
//     var url = "";
//     const [open, setOpen] = useState(true);
//     const [input, setInput] = useState('');
//     const [inputText, setInputText] = useState('');
//     const [imageSrc, setImageSrc] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [textResponse, setTextResponse] = useState('');
//     const { setImage1} = useContext(ImageContext);

//     const handleClose = () => {
//         setOpen(false);
//     }

//     const handleTextSubmit = async () => {
//         const endpoint = '/quantum-share/aitext';
//         const formData = new FormData();
//         formData.append('userMessage', inputText);
//         try {
//             setLoading(true)
//             const response = await axiosInstance.post(endpoint, formData, {
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             })
//             console.log(response.data)
//             var res = response.data;
//             var data = res['data'];
//             console.log(res)
//             // console.log(data);
//             setTextResponse(data)
//         } catch (error) {
//             console.log('Error fetching response:', error);
//         } finally {
//             setLoading(false);
//         }
//     }
//     const handleSubmit = async () => {
//         try {
//             setLoading(true)
//             const formData = new FormData();
//             formData.append('textPromt', input);

//             const endpoint = "/quantum-share/generate-image";
//             const response = await axiosInstance.post(endpoint, formData, {
//                 responseType: 'arraybuffer',
//                 headers: {
//                     'Accept': 'application/json',
//                 },
//             });
//             console.log(response);
//             const blob = new Blob([response.data], { type: 'image/png' });
//             console.log(blob);
//             const imageUrl = URL.createObjectURL(blob);
//             url = imageUrl;
//             console.log(url);
//             console.log(imageUrl);
//             setImageSrc(imageUrl);
//             setError('');
//         } catch (error) {
//             console.error(error);
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError('Error generating image');
//             }
//         } finally {
//             setLoading(false);
//         }
//     }
//     const [copied, setCopied] = useState(false);
//     const copyTextToClipboard = () => {
//         navigator.clipboard.writeText(textResponse)
//             .then(() => {
//                 console.log('Text copied to clipboard');
//                 setCopied(true)
//                 setTimeout(() => setCopied(false), 2000)
//             })
//             .catch((error) => {
//                 console.error('Failed to copy text: ', error);
//             })
//     }

//     const handleDownload = () => {
//         if (!imageSrc) return
//         const link = document.createElement('a')
//         link.href = imageSrc
//         link.download = 'generated_image.png'
//         link.click()
//     }

//     const handleImageChange = () => {
//         // setText(textResponse)
//         setImage1(imageSrc)
//         setOpen(false)
//         // console.log("Added to Post:", { image, text })
//     }
//     return (
//         <>
//             <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}
//                 PaperProps={{
//                     component: 'form',
//                     onSubmit: (event) => {
//                         event.preventDefault();
//                         handleSubmit();
//                     }
//                 }}>
//                 <DialogTitle>Share with Quantum <AutoAwesomeIcon /></DialogTitle>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} md={6} lg={6} sx={{ border: 0.5, borderStyle: 'ridge' }}>
//                         <DialogTitle>
//                             Now you are using Quantum share's Quantum AI
//                         </DialogTitle>
//                         <DialogContent style={{ marginTop: '10px', flexDirection: 'column' }}>
//                             <TextField
//                                 autoFocus
//                                 margin="dense"
//                                 name="userMessage"
//                                 label="Enter text here"
//                                 type="text"
//                                 variant="standard"
//                                 value={inputText}
//                                 style={{ width: '100%', maxWidth: '350px', marginBottom: '10px' }}
//                                 onChange={(e) => setInputText(e.target.value)}
//                             />
//                             <Button variant="outlined" sx={{ mt: 2 }} onClick={handleTextSubmit} disabled={!inputText || loading}>Generate &nbsp;<AutoFixHighIcon /></Button>
//                         </DialogContent>
//                         <DialogContent style={{ marginTop: '50px', flexDirection: 'column' }}>
//                             <TextField autoFocus margin='none' name='textPromt' label='Generate image' type='text' variant='standard' style={{ width: '100%', maxWidth: '350px', marginBottom: '10px' }} value={input} onChange={(e) => setInput(e.target.value)} />
//                             <Button variant="outlined" onClick={handleSubmit} sx={{ mt: 1 }} disabled={!input || loading}>Generate  &nbsp; <AutoAwesomeIcon /></Button>
//                         </DialogContent>
//                     </Grid>
//                     {/* <div style={{overflowY:'hidden'}}> */}
//                     <Grid item xs={12} md={6} lg={6} sx={{ border: 0.5, borderStyle: 'ridge' }}>
//                         <DialogTitle>Preview</DialogTitle>
//                         {/* <div style={{ position: 'relative' ,textAlign:'center'}}>
//                             {loading ? (
//                                 <RingLoader
//                                     color={'#d3040c'}
//                                     loading={loading}
//                                     size={60}
//                                     aria-label="Loading Spinner"
//                                     data-testid="loader"
//                                 />
//                             ) : (
//                                 <>
//                                     {imageSrc  && <img src={imageSrc} alt="Generated Image" style={{ maxWidth: "100%", maxHeight: '100%' }} />}
//                                     {imageSrc && (
//                                         <Button
//                                             onClick={handleDownload}
//                                             sx={{
//                                                 position: 'relative',
//                                                 top: -330,
//                                                 // right: -5,
//                                                 left:285,
//                                                 zIndex: 1,
//                                                 display: { xs: 'flex', md: 'none'}
//                                             }}
//                                         > <Tooltip title="Download image">
//                                                 <DownloadIcon style={{ backgroundColor: '#596259', borderRadius: '50%', padding: "5px", color: 'white', fontSize: "30px" }} />
//                                             </Tooltip>
//                                         </Button>
//                                     )} 
//                                 </>
//                             )}
//                         </div> */}
//                         <div style={{ marginTop: '20px', position: 'relative', textAlign: 'center' }}>
//                             {loading ? (
//                                 <RingLoader
//                                     color={'#d3040c'}
//                                     loading={loading}
//                                     size={50}
//                                     aria-label="Loading Spinner"
//                                     data-testid="loader"
//                                 />
//                             ) : (
//                                 <>
//                                     {imageSrc && (
//                                         <div style={{ position: 'relative', display: 'inline-block' }}>
//                                             <img src={imageSrc} alt="Generated Image" style={{ maxWidth: "100%", maxHeight: '100%' }} />
//                                             <IconButton
//                                                 onClick={handleDownload}
//                                                 sx={{
//                                                     position: 'absolute',
//                                                     top: 0,
//                                                     right: 0,
//                                                     zIndex: 1,
//                                                     display: { xs: 'flex', md: 'none' }
//                                                 }}
//                                             >
//                                                 <Tooltip title="Download image" placement="top" TransitionComponent={Zoom}>
//                                                     <DownloadIcon style={{ backgroundColor: '#596259', borderRadius: '50%', padding: "5px", color: 'white', fontSize: "30px" }} />
//                                                 </Tooltip>
//                                             </IconButton>
//                                             <IconButton
//                                                 onClick={handleDownload}
//                                                 sx={{
//                                                     position: 'absolute',
//                                                     top: 0,
//                                                     right: 0,
//                                                     zIndex: 1,
//                                                     display: { xs: 'none', md: 'flex' }
//                                                 }}
//                                             >
//                                                 <Tooltip title="Download image" placement="top" TransitionComponent={Zoom}>
//                                                     <DownloadIcon style={{ backgroundColor: '#596259', borderRadius: '50%', padding: "5px", color: 'white', fontSize: "30px" }} />
//                                                 </Tooltip>
//                                             </IconButton>
//                                         </div>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                         <div style={{ wordWrap: 'break-word', position: 'relative', whiteSpace: 'pre-line', lineHeight: '1.5em', padding: '10px' }}>
//                             {loading}
//                             {textResponse && <div>{textResponse}</div>}
//                             <div style={{ position: 'absolute', top: 0, right: 0 }}>
//                                 {textResponse && (
//                                     <>
//                                         <IconButton variant="standard" onClick={copyTextToClipboard} sx={{
//                                             position: 'absolute',
//                                             left: -80,
//                                             bottom: 0,
//                                             display: { xs: 'flex', md: 'none' }
//                                         }}>
//                                             <Tooltip title="Copy" placement="top" TransitionComponent={Zoom}>
//                                                 <ContentCopyIcon sx={{ color: 'grey' }} />
//                                             </Tooltip>
//                                         </IconButton>
//                                         <IconButton variant="standard" onClick={copyTextToClipboard} sx={{
//                                             position: 'absolute',
//                                             left: -80,
//                                             bottom: 0,
//                                             display: { xs: 'none', md: 'flex' }
//                                         }}>
//                                             <Tooltip title="Copy" placement="top" TransitionComponent={Zoom}>
//                                                 {copied ? <DoneIcon /> : <ContentCopyIcon sx={{ color: 'grey' }} />}
//                                             </Tooltip>
//                                         </IconButton>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                         {error && <div>{error}</div>}
//                     </Grid>
//                     {/* </div> */}
//                 </Grid>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1px' }}>
//                     <h6 style={{ color: 'grey' }}> Powered by <img src={Quantum} alt="" height={30} style={{ marginLeft: '5px' }} /> Quantum Paradigm</h6>
//                     <DialogActions>
//                         <Button onClick={handleClose} style={{ marginRight: '10px' }}>Cancel</Button>
//                         <Button  onClick={handleImageChange}>Add to Post</Button>
//                     </DialogActions>
//                 </div>
//             </Dialog>
//         </>
//     );
// }



/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import axiosInstance from '../Helper/AxiosInstance';
import { Tooltip, CircularProgress, IconButton } from '@mui/material';
import { RingLoader } from 'react-spinners';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Zoom from '@mui/material/Zoom';
import DoneIcon from '@mui/icons-material/Done';
import Quantum from '../Assets/Quantum_Logo.webp'
import { ImageContext } from '../Context/ImageContext';
import UpgradeIcon from '@mui/icons-material/Upgrade';

export default function QI() {
    var url = "";
    const [open, setOpen] = useState(true);
    const [input, setInput] = useState('');
    const [inputText, setInputText] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [textResponse, setTextResponse] = useState('');
    const { setImage1} = useContext(ImageContext);

    const handleClose = () => {
        setOpen(false);
    }

    const handleTextSubmit = async () => {
        const endpoint = '/quantum-share/aitext';
        const formData = new FormData();
        formData.append('userMessage', inputText);
        try {
            setLoading(true)
            const response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            console.log(response.data)
            var res = response.data;
            var data = res['data'];
            console.log(res)
            setTextResponse(data)
        } catch (error) {
            console.log('Error fetching response:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('textPromt', input);

            const endpoint = "/quantum-share/generate-image";
            const response = await axiosInstance.post(endpoint, formData, {
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'application/json',
                },
            });
            console.log(response);
            const blob = new Blob([response.data], { type: 'image/png' });
            console.log(blob);
            const imageUrl = URL.createObjectURL(blob);
            url = imageUrl;
            console.log(url);
            console.log(imageUrl);
            setImageSrc(imageUrl);
            setError('');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error generating image');
            }
        } finally {
            setLoading(false);
        }
    }

    const [copied, setCopied] = useState(false);
    const copyTextToClipboard = () => {
        navigator.clipboard.writeText(textResponse)
            .then(() => {
                console.log('Text copied to clipboard');
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            })
    }

    const handleDownload = () => {
        if (!imageSrc) return
        const link = document.createElement('a')
        link.href = imageSrc
        link.download = 'generated_image.png'
        link.click()
    }

    const handleImageChange = () => {
        setImage1(imageSrc)
        setOpen(false)
    }

    const [upgradeOpen, setUpgradeOpen] = useState(true);

    const handleUpgradeClose = () => {
        setOpen(false)
        setUpgradeOpen(false);
    }

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit();
                    }
                }}
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <DialogTitle>Share with Q <AutoAwesomeIcon /></DialogTitle>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6} sx={{ border: 0.5, borderStyle: 'ridge' }}>
                        <DialogTitle>Now you are using Quantum share's Q AI</DialogTitle>
                        <DialogContent style={{ marginTop: '10px', flexDirection: 'column' }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="userMessage"
                                label="Enter text here"
                                type="text"
                                variant="standard"
                                value={inputText}
                                style={{ width: '100%', maxWidth: '350px', marginBottom: '10px' }}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleTextSubmit} disabled={!inputText || loading}>
                                Generate &nbsp;<AutoFixHighIcon />
                            </Button>
                        </DialogContent>
                        <DialogContent style={{ marginTop: '50px', flexDirection: 'column' }}>
                            <TextField
                                autoFocus
                                margin="none"
                                name="textPromt"
                                label="Generate image"
                                type="text"
                                variant="standard"
                                style={{ width: '100%', maxWidth: '350px', marginBottom: '10px' }}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button variant="outlined" onClick={handleSubmit} sx={{ mt: 1 }} disabled={!input || loading}>
                                Generate &nbsp;<AutoAwesomeIcon />
                            </Button>
                        </DialogContent>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} sx={{ border: 0.5, borderStyle: 'ridge' }}>
                        <DialogTitle>Preview</DialogTitle>
                        <div style={{ marginTop: '20px', position: 'relative', textAlign: 'center' }}>
                            {loading ? (
                                <RingLoader
                                    color={'#d3040c'}
                                    loading={loading}
                                    size={50}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : (
                                <>
                                    {imageSrc && (
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <img src={imageSrc} alt="Generated Image" style={{ maxWidth: "100%", maxHeight: '100%' }} />
                                            <IconButton
                                                onClick={handleDownload}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    zIndex: 1,
                                                    display: { xs: 'flex', md: 'none' }
                                                }}
                                            >
                                                <Tooltip title="Download image" placement="top" TransitionComponent={Zoom}>
                                                    <DownloadIcon style={{ backgroundColor: '#596259', borderRadius: '50%', padding: "5px", color: 'white', fontSize: "30px" }} />
                                                </Tooltip>
                                            </IconButton>
                                            <IconButton
                                                onClick={handleDownload}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    zIndex: 1,
                                                    display: { xs: 'none', md: 'flex' }
                                                }}
                                            >
                                                <Tooltip title="Download image" placement="top" TransitionComponent={Zoom}>
                                                    <DownloadIcon style={{ backgroundColor: '#596259', borderRadius: '50%', padding: "5px", color: 'white', fontSize: "30px" }} />
                                                </Tooltip>
                                            </IconButton>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div style={{ wordWrap: 'break-word', position: 'relative', whiteSpace: 'pre-line', lineHeight: '1.5em', padding: '10px' }}>
                            {loading}
                            {textResponse && <div>{textResponse}</div>}
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                {textResponse && (
                                    <>
                                        <IconButton variant="standard" onClick={copyTextToClipboard} sx={{
                                            position: 'absolute',
                                            left: -80,
                                            bottom: 0,
                                            display: { xs: 'flex', md: 'none' }
                                        }}>
                                            <Tooltip title="Copy" placement="top" TransitionComponent={Zoom}>
                                                <ContentCopyIcon sx={{ color: 'grey' }} />
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton variant="standard" onClick={copyTextToClipboard} sx={{
                                            position: 'absolute',
                                            left: -80,
                                            bottom: 0,
                                            display: { xs: 'none', md: 'flex' }
                                        }}>
                                            <Tooltip title="Copy" placement="top" TransitionComponent={Zoom}>
                                                {copied ? <DoneIcon /> : <ContentCopyIcon sx={{ color: 'grey' }} />}
                                            </Tooltip>
                                        </IconButton>
                                    </>
                                )}
                            </div>
                        </div>
                        {error && <div>{error}</div>}
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1px' }}>
                    <h6 style={{ color: 'grey' }}> Powered by <img src={Quantum} alt="" height={30} style={{ marginLeft: '5px' }} /> Quantum Paradigm</h6>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ marginRight: '10px' }}>Cancel</Button>
                        <Button onClick={handleImageChange}>Add to Post</Button>
                    </DialogActions>
                </div>
            </Dialog>

            {/* <Dialog
                open={upgradeOpen}
                onClose={handleUpgradeClose}
                style={{ backdropFilter: 'blur(2.5px)' }}
            >
                <DialogTitle>Upgrade Required <UpgradeIcon/></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This AI feature is available for premium plan users only. Please upgrade to access this feature.

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpgradeClose}>Cancel</Button>
                    <Button onClick={() => alert('Upgrade process')} disabled>Upgrade</Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
}