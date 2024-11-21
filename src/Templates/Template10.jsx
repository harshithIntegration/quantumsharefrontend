import React, { useState } from "react";
import Draggable from 'react-draggable';
import '../CssFolder/Template.css';
import marketingImage from '../Assets/T5p.jpg';
import logoImage from '../Assets/T5l.jpg';

const Template10 = () => {
  // States to store font size, color, and style for each text section
  const [selectedText, setSelectedText] = useState(null);
  const [styleSettings, setStyleSettings] = useState({
    companyName: { fontSize: '20px', color: '#000', fontStyle: 'normal' },
    mainHeading: { fontSize: '30px', color: '#000', fontStyle: 'normal' },
    description: { fontSize: '16px', color: '#000', fontStyle: 'normal' },
    contactNumber: { fontSize: '16px', color: '#000', fontStyle: 'normal' },
    contactEmail: { fontSize: '16px', color: '#000', fontStyle: 'normal' },
    website: { fontSize: '16px', color: '#000', fontStyle: 'normal' },
  });

  // Function to handle style changes
  const handleStyleChange = (property, value) => {
    if (selectedText) {
      setStyleSettings(prevSettings => ({
        ...prevSettings,
        [selectedText]: {
          ...prevSettings[selectedText],
          [property]: value,
        },
      }));
    }
  };

  // Function to close the style editor
  const closeEditor = () => {
    setSelectedText(null);
  };

  return (
    <div className="t10post-container">
      {/* Draggable Logo */}
      <Draggable>
        <div className="t10logo-section">
          <img src={logoImage} alt="Company Logo" className="t10logo" />
        </div>
      </Draggable>

      {/* Draggable and Editable Company Name */}
      <Draggable>
        <div 
          className="t10company-name" 
          style={styleSettings.companyName} 
          contentEditable={true} 
          onClick={() => setSelectedText('companyName')}>
          Company Name
        </div>
      </Draggable>

      {/* Content Wrapper */}
      <div className="t10content-wrapper">
        {/* Draggable Image */}
        <Draggable>
          <div className="t10image-section">
            <img src={marketingImage} alt="Digital Marketing" className="t10post-image" />
          </div>
        </Draggable>

        {/* Draggable and Editable Main Heading */}
        <Draggable>
          <div className="text-section">
            <h1 
              className="t10main-heading" 
              style={styleSettings.mainHeading} 
              contentEditable={true} 
              onClick={() => setSelectedText('mainHeading')}>
              Get Your Destination
            </h1>
          </div>
        </Draggable>

        {/* Draggable and Editable Description */}
        <Draggable>
          <div className="description-section">
            <p 
              className="t10description" 
              style={styleSettings.description} 
              contentEditable={true} 
              onClick={() => setSelectedText('description')}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
            </p>
          </div>
        </Draggable>

        {/* Draggable and Editable Contact Number */}
        <Draggable>
          <div className="contact-number-section">
            <i className="fas fa-phone contact-icon"></i>
            <span 
              className="t10contact-number" 
              style={styleSettings.contactNumber} 
              contentEditable={true} 
              onClick={() => setSelectedText('contactNumber')}>
              +01 573 902 191
            </span>
          </div>
        </Draggable>

        {/* Draggable and Editable Contact Email */}
        <Draggable>
          <div className="t10contact-email-section">
            <i className="fas fa-envelope contact-icon"></i>
            <span 
              className="t10contact-email" 
              style={styleSettings.contactEmail} 
              contentEditable={true} 
              onClick={() => setSelectedText('contactEmail')}>
              contact@company.com
            </span>
          </div>
        </Draggable>

        {/* Draggable and Editable Website */}
        <Draggable>
          <div className="website-section">
            <i className="fas fa-globe website-icon"></i>
            <span 
              className="website-text" 
              style={styleSettings.website} 
              contentEditable={true} 
              onClick={() => setSelectedText('website')}>
              www.companywebsite.com
            </span>
          </div>
        </Draggable>
      </div>

      {/* Popup Style Editor */}
      {selectedText && (
        <div className="style-editor">
          <h3>Edit Style</h3>
          <div>
            <label>Font Size:</label>
            <input 
              type="number" 
              value={parseInt(styleSettings[selectedText].fontSize)} 
              onChange={(e) => handleStyleChange('fontSize', e.target.value + 'px')} 
            />
          </div>
          <div>
            <label>Font Color:</label>
            <input 
              type="color" 
              value={styleSettings[selectedText].color} 
              onChange={(e) => handleStyleChange('color', e.target.value)} 
            />
          </div>
          <div>
            <label>Font Style:</label>
            <select 
              value={styleSettings[selectedText].fontStyle} 
              onChange={(e) => handleStyleChange('fontStyle', e.target.value)}>
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <button onClick={closeEditor}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Template10;
