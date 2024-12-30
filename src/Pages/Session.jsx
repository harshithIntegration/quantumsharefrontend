// // import React from 'react';
// // import { Modal, Box, Typography, Button } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // const Session = (open, onClose) => {
// //     const navigate = useNavigate();
// //  const handleLogin = () => {
// //         if (onClose) onClose(); 
// //         navigate('/login'); 
// //     };
// //   return (
// //     <Modal open={open} onClose={onClose}>
// //     <Box
// //         sx={{
// //             position: 'absolute',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -50%)',
// //             width: 400,
// //             bgcolor: 'background.paper',
// //             border: '2px solid #000',
// //             boxShadow: 24,
// //             p: 4,
// //         }}
// //     >
// //         <Typography variant="h6" component="h2">
// //             Session Expired
// //         </Typography>
// //         <Typography sx={{ mt: 2 }}>
// //             Your session has expired. Please log in again.
// //         </Typography>
// //         <Button
// //             variant="contained"
// //             color="primary"
// //             sx={{ mt: 2 }}
// //             onClick={handleLogin}
// //         >
// //             Login
// //         </Button>
// //     </Box>
// // </Modal>
// //   )
// // }

// // export default Session


// import React from 'react'
// import { Dialog, DialogContent, DialogActions, Button, DialogContentText, Typography, Divider, IconButton } from "@mui/material";
// import { Link} from 'react-router-dom';
// import WarningIcon from '@mui/icons-material/Warning';

// const Session = () => {
//   return (
//     <>
//       <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth PaperProps={{
//           sx: { backgroundColor: '#ffffff' }}} >
//                             <DialogContent sx={{ backgroundColor: '#242424' }}>
//                                 <DialogContentText sx={{ color: 'white', fontSize: '18px', display:'flex' }}>
//                                     <IconButton>
//                                     <WarningIcon style={{ color: 'yellow', cursor: 'pointer', marginTop: '5px' }} />
//                                     </IconButton>
//                                     <Typography>
//                                     <Typography>Your session has expired</Typography>
//                                     <Typography>Please log in again to continue using the app</Typography>
//                                     </Typography>
//                                     </DialogContentText>
//                             </DialogContent>
//                             <DialogActions sx={{ backgroundColor: '#242424' }}>
//                                 <Link to='/login'><Button  style={{ color: '#ba343b' }}>Login</Button></Link>
//                             </DialogActions>
//                         </Dialog>
//     </>
//   )
// }

// export default Session
