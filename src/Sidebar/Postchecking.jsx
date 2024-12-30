import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Grid, Button, IconButton, Tooltip, DialogContentText, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer } from 'react-toastify';

const PostComponent = ({ open, setOpen, closeDialog, handleConfirmCloseOpen, handleClickOpen, handleSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open1, setOpen1] = useState(false); // For confirm dialog

  // Close the main dialog when navigating back
  useEffect(() => {
    const handleBackNavigation = () => {
      setOpen(false); // Close main dialog on back navigation
    };

    // Listen to changes in location to detect back navigation
    const unlisten = navigate.listen((newLocation) => {
      if (newLocation.pathname !== location.pathname) {
        handleBackNavigation();
      }
    });

    return () => unlisten();
  }, [navigate, location.pathname, setOpen]);

  return (
    <>
      <Dialog className="postContent" open={open} onClose={closeDialog} fullWidth maxWidth="lg">
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item lg={7} md={7} xs={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 id="newPost">New Post</h4>
                <Media onMediaPlatform={handleSelectIconAndSendToParent} initialMediaPlatform={mediaPlatform} postSubmitted={postSubmitted} />
              </div>
              {/* Rest of your input fields and controls */}
            </Grid>
            <Grid item lg={5} md={5} xs={12} sx={{ border: 1, borderStyle: 'ridge', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
              <div className="preview" style={{ padding: '8px' }}>
                <h4 id="newPost">Media Preview</h4>
              </div>
              {/* Media and text preview section */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="action">
          <div style={{ display: 'flex' }}>
            <Button onClick={handleConfirmCloseOpen} color="error">Cancel</Button>
            <Button variant="contained" disabled={shareButtonDisabled} endIcon={<SendIcon />} onClick={handleClickOpen} sx={{ borderRadius: '20px' }}>Share</Button>
            <Dialog open={open1} onClose={() => setOpen1(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth>
              <DialogContent>
                <DialogContentText sx={{ color: 'black', fontSize: '18px' }}>Are you sure you want to Post?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen1(false)} style={{ color: '#ba343b' }}>Cancel</Button>
                <Button onClick={handleSubmit} style={{ color: '#ba343b' }} autoFocus>Yes</Button>
              </DialogActions>
            </Dialog>
          </div>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default PostComponent;
