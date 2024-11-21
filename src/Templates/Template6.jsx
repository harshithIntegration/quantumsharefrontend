import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Import Draggable
import '../CssFolder/template.css';
import t6img from '../Assets/T7b.jpg'; 
import t6lgo from '../Assets/T6l.jpg';

// Modal Component for Font Settings
const FontModal = ({ isOpen, onClose, onChange, fontProps, setFontProps }) => {
  const [fontSize, setFontSize] = useState(fontProps.fontSize);
  const [fontStyle, setFontStyle] = useState(fontProps.fontStyle);
  const [fontColor, setFontColor] = useState(fontProps.fontColor);

  // Update font properties and call onChange whenever there is a change
  const updateFontProps = (newProps) => {
    setFontProps((prevProps) => ({ ...prevProps, ...newProps }));
    onChange({ ...fontProps, ...newProps });
  };

  if (!isOpen) return null;

  return (
    <div className="t6modal-overlay">
      <div className="modal-content">
        <h2>Font Settings</h2>
        <label>
          Font Size:
          <select 
            value={fontSize} 
            onChange={(e) => {
              setFontSize(e.target.value);
              updateFontProps({ fontSize: e.target.value });
            }}
          >
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="30px">30px</option>
          </select>
        </label>
        <label>
          Font Style:
          <select 
            value={fontStyle} 
            onChange={(e) => {
              setFontStyle(e.target.value);
              updateFontProps({ fontStyle: e.target.value });
            }}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="bold">Bold</option>
            <option value="bold italic">Bold Italic</option>
          </select>
        </label>
        <label>
          Font Color:
          <input 
            type="color" 
            value={fontColor} 
            onChange={(e) => {
              setFontColor(e.target.value);
              updateFontProps({ fontColor: e.target.value });
            }} 
          />
        </label>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Template6 = () => {
  const [logo, setLogo] = useState(t6lgo); // State to store logo image
  const [photo, setPhoto] = useState(t6img); // State to store right-side photo
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentText, setCurrentText] = useState(null); // State to track which text is being edited
  const [fontProps, setFontProps] = useState({ fontSize: '16px', fontStyle: 'normal', fontColor: '#000' }); // Font properties

  // Track individual font properties for each text element
  const [textStyles, setTextStyles] = useState({
    h1: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
    about: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
    aboutParagraph: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
    callDetails: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
    callNumber: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
    businessQuote: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
    website: { fontSize: '16px', fontStyle: 'normal', fontColor: '#000' },
  });

  // Handler to update logo
  const handleLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Handler to update right-side photo
  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Handler to open the font modal
  const openFontModal = (textType) => {
    setCurrentText(textType);
    const currentStyle = textStyles[textType] || fontProps;
    setFontProps(currentStyle); // Set current font props for the modal
    setIsModalOpen(true);
  };

  // Handler to apply font settings
  const applyFontSettings = (newFontProps) => {
    setFontProps(newFontProps);
    if (currentText) {
      setTextStyles((prevStyles) => ({
        ...prevStyles,
        [currentText]: newFontProps, // Update specific text style
      }));
    }
  };

  return (
    <div className="t6template-container">
      {/* Left Section */}
      <div className="t6left-section">
        <div className="t6green-section">
          {/* Draggable logo, open file picker on click */}
          <Draggable>
            <div onClick={() => document.getElementById('logoInput').click()}>
              <img src={logo} alt="Logo" className="t6logo" />
            </div>
          </Draggable>
          <input 
            type="file" 
            id="logoInput" 
            style={{ display: 'none' }} 
            onChange={handleLogoChange} 
            accept="image/*"
          />
          {/* Draggable and editable content */}
          
          <Draggable>
            <div className="Heading"><h1 
              contentEditable="true" 
              onClick={() => openFontModal('h1')}
              style={{ fontSize: textStyles.h1.fontSize, fontStyle: textStyles.h1.fontStyle, color: textStyles.h1.fontColor }}
            >
             CREATIVE MARKETING AGENCY
            </h1></div>
          </Draggable>
        </div>

        <div className="t6white-section">
          <Draggable>
            <h2 
              contentEditable="true" 
              onClick={() => openFontModal('about')}
              style={{ fontSize: textStyles.about.fontSize, fontStyle: textStyles.about.fontStyle, color: textStyles.about.fontColor }}
            >
              ABOUT US
            </h2>
          </Draggable>
          <Draggable>
            <p 
              contentEditable="true" 
              onClick={() => openFontModal('aboutParagraph')}
              style={{ fontSize: textStyles.aboutParagraph.fontSize, fontStyle: textStyles.aboutParagraph.fontStyle, color: textStyles.aboutParagraph.fontColor }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </Draggable>
          <Draggable>
            <p className='t6call-details' 
              contentEditable="true" 
              onClick={() => openFontModal('callDetails')}
              style={{ fontSize: textStyles.callDetails.fontSize, fontStyle: textStyles.callDetails.fontStyle, color: textStyles.callDetails.fontColor }}
            >
              Call for more info: 
            </p>
          </Draggable>
          <Draggable>
            <p className='t6call-number' 
              contentEditable="true" 
              onClick={() => openFontModal('callNumber')}
              style={{ fontSize: textStyles.callNumber.fontSize, fontStyle: textStyles.callNumber.fontStyle, color: textStyles.callNumber.fontColor }}
            >
              (000) 123 456 789
            </p>
          </Draggable>
        </div>
      </div>

      {/* Right Section */}
      <div className="t6right-section">
        <div className="t6orange-curve">
          {/* Draggable image container, open file picker on click */}
          <Draggable>
            <div className="t6image-container" onClick={() => document.getElementById('photoInput').click()}>
              <img src={photo} alt="Business" />
            </div>
          </Draggable>
          <input 
            type="file" 
            id="photoInput" 
            style={{ display: 'none' }} 
            onChange={handlePhotoChange} 
            accept="image/*"
          />
          <Draggable>
            <p 
              contentEditable="true" 
              onClick={() => openFontModal('businessQuote')}
              style={{ fontSize: textStyles.businessQuote.fontSize, fontStyle: textStyles.businessQuote.fontStyle, color: textStyles.businessQuote.fontColor }}
            >
              “Your quote goes here.”
            </p>
          </Draggable>
          <Draggable>
            <p 
              contentEditable="true" 
              onClick={() => openFontModal('website')}
              style={{ fontSize: textStyles.website.fontSize, fontStyle: textStyles.website.fontStyle, color: textStyles.website.fontColor }}
            >
              www.yourbusiness.com
            </p>
          </Draggable>
        </div>
      </div>

      {/* Font Settings Modal */}
      <FontModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onChange={applyFontSettings} 
        fontProps={fontProps} 
        setFontProps={setFontProps} 
      />
    </div>
  );
};

export default Template6;
