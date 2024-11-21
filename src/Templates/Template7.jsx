import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable'; // npm install react-draggable
import html2canvas from 'html2canvas'; // Import html2canvas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import '../CssFolder/Template.css';
import b7img from '../Assets/T7p.jpg';
import b7lgo from '../Assets/T7l.png'; 

const Template7 = () => {
  const [logoSrc, setLogoSrc] = useState(b7lgo);
  const [headerText, setHeaderText] = useState('CREATIVE BUSINESS AGENCY');
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.');

  const [agencyImageSrc, setAgencyImageSrc] = useState(b7img);
  const [headerColor, setHeaderColor] = useState('#000000');
  const [descriptionColor, setDescriptionColor] = useState('#000000');
  const [imageColor, setImageColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#00FFFF');

  const [headerFontSize, setHeaderFontSize] = useState('39px');
  const [descriptionFontSize, setDescriptionFontSize] = useState('18px');
  const [headerFontFamily, setHeaderFontFamily] = useState('Arial');
  const [descriptionFontFamily, setDescriptionFontFamily] = useState('Arial');

  const fileInputRef = useRef(null);
  const agencyImageInputRef = useRef(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [activeEditable, setActiveEditable] = useState('');
  const templateRef = useRef(); // Ref for the template container

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAgencyImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAgencyImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderClick = () => {
    setActiveEditable('header');
    setColorPickerVisible(true);
  };

  const handleDescriptionClick = () => {
    setActiveEditable('description');
    setColorPickerVisible(true);
  };

  const handleImageColorClick = () => {
    setActiveEditable('image');
    setColorPickerVisible(true);
  };

  const handleBackgroundColorClick = () => {
    setActiveEditable('background');
    setColorPickerVisible(true);
  };

  const handleHeaderBlur = (e) => {
    setHeaderText(e.target.innerText);
  };

  const handleDescriptionBlur = (e) => {
    setDescription(e.target.innerText);
  };

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  const handleAgencyImageClick = () => {
    agencyImageInputRef.current.click();
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    if (activeEditable === 'header') {
      setHeaderColor(color);
    } else if (activeEditable === 'description') {
      setDescriptionColor(color);
    } else if (activeEditable === 'image') {
      setImageColor(color);
    } else if (activeEditable === 'background') {
      setBackgroundColor(color);
    }
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value + 'px';
    if (activeEditable === 'header') {
      setHeaderFontSize(size);
    } else if (activeEditable === 'description') {
      setDescriptionFontSize(size);
    }
  };

  const handleFontFamilyChange = (e) => {
    const fontFamily = e.target.value;
    if (activeEditable === 'header') {
      setHeaderFontFamily(fontFamily);
    } else if (activeEditable === 'description') {
      setDescriptionFontFamily(fontFamily);
    }
  };

  const handleCloseColorPicker = () => {
    setColorPickerVisible(false);
    setActiveEditable('');
  };

  // Function to handle template download
  const handleDownload = () => {
    html2canvas(templateRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'template7.png'; // Filename for the download
      link.click();
    });
  };

  return (
    <div className="T7-container" ref={templateRef}>
      {/* Logo */}
      <Draggable>
        <div className="T7-logo" style={{ position: 'absolute' }}>
          <img
            src={logoSrc}
            alt="Logo"
            className="T7-logo-image"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>
      </Draggable>

      {/* Header */}
      <Draggable>
        <h1
          className="T7-header"
          contentEditable
          suppressContentEditableWarning={true}
          onClick={handleHeaderClick}
          onBlur={handleHeaderBlur}
          style={{ position: 'absolute', cursor: 'text', color: headerColor, fontSize: headerFontSize, fontFamily: headerFontFamily }}
        >
          {headerText}
        </h1>
      </Draggable>

      {/* Dotted Design */}
      <Draggable>
        <div className="T7-dots" style={{ position: 'absolute' }}>
          <span>••••••••••</span>
        </div>
      </Draggable>

      {/* Description */}
      <Draggable>
        <p
          className="T7-description"
          contentEditable
          suppressContentEditableWarning={true}
          onClick={handleDescriptionClick}
          onBlur={handleDescriptionBlur}
          style={{ position: 'absolute', cursor: 'text', color: descriptionColor, fontSize: descriptionFontSize, fontFamily: descriptionFontFamily }}
        >
          {description}
        </p>
      </Draggable>

      {/* Button */}
      <Draggable>
        <div className="T7-cta-button-container" style={{ position: 'absolute' }}>
          <a href="#" className="T7-cta-button">VISIT NOW</a>
        </div>
      </Draggable>

      {/* Right Section */}
      <Draggable>
        <div className="T7-right-section" style={{ position: 'absolute', backgroundColor: backgroundColor }}>
          <img
            src={agencyImageSrc}
            alt="Agency"
            className="T7-agency-image"
            onClick={handleAgencyImageClick}
            style={{ cursor: 'pointer', border: `5px solid ${imageColor}` }}
          />
          <input
            type="file"
            ref={agencyImageInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleAgencyImageChange}
          />
        </div>
      </Draggable>

      <div className="T7-buttons">
        <button onClick={handleImageColorClick} style={{ cursor: 'pointer', marginTop: '10px' }}>
          <p>Change Image Border Color</p>
        </button>
        <button onClick={handleBackgroundColorClick} style={{ cursor: 'pointer', marginTop: '10px' }}>
          <p>Change Background Color</p>
        </button>
        {/* Download Icon */}
        <button onClick={handleDownload} style={{ cursor: 'pointer', marginTop: '10px' }}>
          <FontAwesomeIcon icon={faDownload} style={{ fontSize: '24px' }} />
        </button>
      </div>

      {/* Color Picker & Font Options Popup */}
      {colorPickerVisible && (
        <div className="T7-color-picker-pop" style={{ position: 'absolute', zIndex: 10, background: '#00FFFF', border: '1px solid #ccc', padding: '10px' }}>
          {activeEditable === 'image' || activeEditable === 'background' ? (
            <>
              <label>Select Color:</label>
              <input type="color" onChange={handleColorChange} />
            </>
          ) : (
            <>
              <label>Select Color:</label>
              <input type="color" onChange={handleColorChange} /><br />
              <label>Font Size:</label>
              <input type="number" min="10" max="72" onChange={handleFontSizeChange} />
              <br />
              <label>Font Family:</label>
              <select onChange={handleFontFamilyChange}>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier New">Courier New</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
              </select>
            </>
          )}
          <button onClick={handleCloseColorPicker} style={{ cursor: 'pointer', marginTop: '10px' }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Template7;
