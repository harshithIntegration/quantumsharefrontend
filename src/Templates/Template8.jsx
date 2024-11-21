import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../CssFolder/Template.css';
import t8bimg from '../Assets/t8pp.jpg'; 
import t8lgo from '../Assets/T6l.jpg';
import t8p from '../Assets/t8ppp.jpg'; // Default background image

const BackgroundSettings = ({ setShowBackgroundPopup }) => {
  return (
    <div className="background-settings">
      <button onClick={() => setShowBackgroundPopup(true)}>Change Background Image</button>
    </div>
  );
};

const Template8 = () => {
  const [text, setText] = useState({
    title: 'CREATIVE\nMARKETING\nAGENCY',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  });

  const [images, setImages] = useState({
    logo: t8lgo,
    profile: t8p,
  });

  const [backgroundImage, setBackgroundImage] = useState(t8bimg); // Set default background image
  const [fontSettings, setFontSettings] = useState({
    title: {
      color: '#000000',
      fontSize: '24px',
      fontStyle: 'normal',
    },
    description: {
      color: '#000000',
      fontSize: '16px',
      fontStyle: 'normal',
    },
  });

  const [editingText, setEditingText] = useState(null); // Track which text (title/description) is being edited
  const [showPopup, setShowPopup] = useState(false); // Popup visibility
  const [showBackgroundPopup, setShowBackgroundPopup] = useState(false); // Popup visibility for background

  // Handle text changes for title and description
  const handleTextChange = (key, event) => {
    setText({
      ...text,
      [key]: event.target.innerText,
    });
  };

  // Handle image changes for logo and profile
  const handleImageChange = (key, event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages({
          ...images,
          [key]: e.target.result, // Update image with uploaded file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Open the popup for editing font settings for the clicked text
  const handleEditText = (textType) => {
    setEditingText(textType);
    setShowPopup(true);
  };

  // Save the font settings for the currently editing text
  const handleFontChange = (key, value) => {
    setFontSettings({
      ...fontSettings,
      [editingText]: {
        ...fontSettings[editingText],
        [key]: value,
      },
    });
  };

  // Handle background image change
  const handleBackgroundChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result); // Update background image with uploaded file
        setShowBackgroundPopup(false); // Close the background popup
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Background Settings Button */}
      <BackgroundSettings setShowBackgroundPopup={setShowBackgroundPopup} />

      {/* Main Template */}
      <div className="t8post-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <div className="t8left-content">
          {/* Draggable and Editable Brand Logo */}
          <Draggable bounds="parent">
            <div className="t8logo-section">
              <label htmlFor="logo-upload">
                <img src={images.logo} alt="Brand Logo" className="t8logo" style={{ cursor: 'pointer' }} />
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange('logo', e)}
              />
            </div>
          </Draggable>

          {/* Draggable and Editable Main Heading */}
          <Draggable bounds="parent">
            <div
              className="t8text-section"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextChange('title', e)}
              style={{
                whiteSpace: 'pre-wrap',
                fontStyle: fontSettings.title.fontStyle,
              }}
              onClick={() => handleEditText('title')}
            >
              <h1
                className="t8main-title"
                style={{
                  color: fontSettings.title.color,
                  fontSize: fontSettings.title.fontSize,
                  fontStyle: fontSettings.title.fontStyle,
                }}
              >
                {text.title}
              </h1>
            </div>
          </Draggable>

          {/* Draggable and Editable Description */}
          <Draggable bounds="parent">
            <p
              className="t8description"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextChange('description', e)}
              style={{
                color: fontSettings.description.color,
                fontSize: fontSettings.description.fontSize,
                fontStyle: fontSettings.description.fontStyle,
              }}
              onClick={() => handleEditText('description')}
            >
              {text.description}
            </p>
          </Draggable>

          {/* Draggable Call to Action Button */}
          <Draggable bounds="parent">
            <button className="t8cta-button">Learn more</button>
          </Draggable>
        </div>

        <div className="t8right-content">
          {/* Draggable and Editable Profile Image Section */}
          <Draggable bounds="parent">
            <div className="t8profile-section">
              <label htmlFor="profile-upload">
                <div className="t8image-mask" style={{ cursor: 'pointer' }}>
                  <img src={images.profile} alt="Profile" className="t8profile-image" />
                </div>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange('profile', e)}
              />
            </div>
          </Draggable>

          {/* Draggable Social Icons */}
          <Draggable bounds="parent">
            <div className="t8social-icons">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-whatsapp"></i>
              <i className="fab fa-facebook-f"></i>
            </div>
          </Draggable>
        </div>

        {/* Popup for editing font settings */}
        {showPopup && (
          <div className="t8popup">
            <h3>Edit Font Settings for {editingText}</h3>
            <label>
              Font Color:
              <input
                type="color"
                value={fontSettings[editingText].color}
                onChange={(e) => handleFontChange('color', e.target.value)}
              />
            </label><br />
            <label>
              Font Size:
              <input
                type="number"
                value={parseInt(fontSettings[editingText].fontSize)}
                onChange={(e) => handleFontChange('fontSize', `${e.target.value}px`)}
                min="10"
                max="100"
              />
            </label><br />
            <label>
              Font Style:
              <select
                value={fontSettings[editingText].fontStyle}
                onChange={(e) => handleFontChange('fontStyle', e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
              </select>
            </label>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        )}

        {/* Popup for changing background image */}
        {showBackgroundPopup && (
          <div className="t8popup">
            <h3>Change Background Image</h3>
            <label>
              Background Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
              />
            </label>
            <button onClick={() => setShowBackgroundPopup(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template8;
