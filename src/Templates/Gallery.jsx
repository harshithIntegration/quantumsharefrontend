import React, { useState, useRef, useContext } from 'react';
import template1 from '../Assets/Screenshot 2024-09-17 165040.png';
import template2 from '../Assets/AddBotImage-4.webp';
import template3 from '../Assets/AddBotImage-4.webp';
import template4 from '../Assets/AddBotImage-4.webp';
import '../CssFolder/gallery.css';
import Nav from '../Navbar/Nav';
import Sidenav from '../Navbar/Sidenav';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Import template components
import Template from './Template7';
import Template2 from './Template1';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';
import Template8 from './Template8';
import Template9 from './Template9';
import Template10 from './Template10';
import html2canvas from 'html2canvas';
import { PostImageContext } from '../Context/PostImageContext';
import Post from '../Sidebar/Post';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const templateRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [view, setView] = useState('gallery');
  const { setPostedImage } = useContext(PostImageContext);

  const handleClickOpen = (templateId) => {
    setSelectedTemplate(templateId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTemplate(null);
    setView('gallery');
  };

  const handlePreview = () => {
    if (templateRef.current) {
      html2canvas(templateRef.current)
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], "template_preview.png", {
                type: "image/png",
                lastModified: new Date().getTime()
              });
              setPostedImage(file);
              setPreviewImage(URL.createObjectURL(file));
              console.log('File ready to post:', file);
            })
            .catch((err) => {
              console.log('Error converting image to file', err);
            });
        })
        .catch((err) => {
          console.log('Error generating image', err);
        });
    }
  };
  const handlePost = () => {
    if (previewImage) {
      setPostedImage(previewImage);
      setPreviewImage(null);
      setView('post');
      console.log('Posted file', previewImage);
    } else {
      console.log('No preview image to post.');
      setView('gallery');
    }
  };
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1':
        return <Template ref={templateRef} />;
      case 'template2':
        return <Template2 ref={templateRef} />;
      case 'template3':
        return <Template3 ref={templateRef} />;
      case 'template4':
        return <Template4 ref={templateRef} />;
      case 'template5':
        return <Template5 ref={templateRef} />;
      case 'template6':
        return <Template6 ref={templateRef} />;
      case 'template8':
        return <Template8 ref={templateRef} />;
      case 'template7':
        return <Template9 ref={templateRef} />;
      case 'template9':
        return <Template10 ref={templateRef} />;
      case 'template10':
        return <Template10 ref={templateRef} />;
      case 'template8':
        return <Template8 ref={templateRef} />;
      case 'template7':
        return <Template9 ref={templateRef} />;
      default:
        return null;
    }
  };

  return (
    <>
    <Nav />
      {view === 'gallery' && (
        <div>
          <Sidenav />
            
            <div className="all-template">
              <img className="tempImg" src={template1} alt="Gallery Image 1" onClick={() => handleClickOpen('template1')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template2} alt="Gallery Image 2" onClick={() => handleClickOpen('template2')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template3} alt="Gallery Image 3" onClick={() => handleClickOpen('template3')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template4} alt="Gallery Image 4" onClick={() => handleClickOpen('template4')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template1} alt="Gallery Image 5" onClick={() => handleClickOpen('template5')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template2} alt="Gallery Image 6" onClick={() => handleClickOpen('template6')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template3} alt="Gallery Image 7" onClick={() => handleClickOpen('template7')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template4} alt="Gallery Image 8" onClick={() => handleClickOpen('template8')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template1} alt="Gallery Image 9" onClick={() => handleClickOpen('template1')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template1} alt="Gallery Image 10" onClick={() => handleClickOpen('template1')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template1} alt="Gallery Image 11" onClick={() => handleClickOpen('template1')} style={{ cursor: 'pointer' }} />
              <img className="tempImg" src={template1} alt="Gallery Image 12" onClick={() => handleClickOpen('template1')} style={{ cursor: 'pointer' }} />
            </div>
          
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="lg"
            PaperProps={{ className: 'dialog-paper' }}
          >
            <div className="dialog-buttons-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', }}>
              <button onClick={handleClose} className="dialog-close-btn" style={{ marginRight: 'auto' }}>
                Close
              </button>
              <button className="dialog-close-btn" onClick={handlePreview}>
                Previews
              </button>
            </div>
            <div className="dialog-content">
              <div ref={templateRef}>
                {renderTemplate()}
              </div>
            </div>
            {previewImage && (
              <div className="popup-containers">
                <div className="popup-contents">
                  <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  <div className='gallery-preview-button'>
                    <Button variant="outlined" onClick={() => setPreviewImage(null)}>Close Preview</Button>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handlePost} style={{ maxWidth: '15%', maxHeight: '15%', left: '10px' }}>
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Dialog>
        </div>
      )}
      {view === 'post' && (
        <Post onBack={() => setView('gallery')} />
      )}
    </>
  );
}
