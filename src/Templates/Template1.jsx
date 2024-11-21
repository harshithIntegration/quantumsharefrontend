import React, { useState } from 'react';
import '../CssFolder/Template.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import profileImage from '../Assets/T4p.jpg'; // Replace with the actual image path
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';

const Template1 = () => {
  const [imageSrc, setImageSrc] = useState(profileImage);
  const [bgColor, setBgColor] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontStyle, setFontStyle] = useState('normal');

  // Function to handle the image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger the file input
  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };

  // Function to handle background color change
  const handleBgColorChange = (event) => {
    setBgColor(event.target.value);
  };

  // Function to download the current state of the page as an image
  const handleDownload = () => {
    html2canvas(document.querySelector('.template1-webinar-container')).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'webinar-invite.png';
      link.click();
    });
  };

  // Function to handle the click on the text element and select it
  const handleEditElement = (element) => {
    setSelectedElement(element);
    setFontSize(window.getComputedStyle(element).fontSize);
    setFontColor(window.getComputedStyle(element).color);
    setFontStyle(window.getComputedStyle(element).fontStyle);
  };

  // Update font size live as the input changes
  const handleFontSizeChange = (e) => {
    const newSize = `${e.target.value}px`;
    setFontSize(newSize);
    if (selectedElement) {
      selectedElement.style.fontSize = newSize;
    }
  };

  // Update font color live as the input changes
  const handleFontColorChange = (e) => {
    const newColor = e.target.value;
    setFontColor(newColor);
    if (selectedElement) {
      selectedElement.style.color = newColor;
    }
  };

  // Update font style live as the input changes
  const handleFontStyleChange = (e) => {
    const newStyle = e.target.value;
    setFontStyle(newStyle);
    if (selectedElement) {
      selectedElement.style.fontStyle = newStyle;
    }
  };

  return (
    <div className="template1-webinar-app">
      {/* Background Color Picker */}
      <div className="template1-controls">
        <label>Background Color:</label>
        <input type="color" value={bgColor} onChange={handleBgColorChange} />
      </div>

      {/* Download Button */}
      <div className="template1-controls">
        <button onClick={handleDownload}>Download</button>
      </div>

      {/* Webinar Container with Dynamic Background Color */}
      <div className="template1-webinar-container" style={{ backgroundColor: bgColor }}>
        {/* Header Section */}
        <div className="template1-header-section">
          <Draggable>
            <h1
              className="template1-draggable"
              id="template1-header-title"
              contentEditable="true"
              onClick={(e) => handleEditElement(e.target)}
              style={{ fontSize, color: fontColor, fontStyle }}
            >
              ONLINE WEBINAR
            </h1>
          </Draggable>
          <Draggable>
            <p
              className="template1-draggable"
              id="template1-header-subtitle"
              contentEditable="true"
              onClick={(e) => handleEditElement(e.target)}
              style={{ fontSize, color: fontColor, fontStyle }}
            >
              With Jonathan Patterson
            </p>
          </Draggable>
        </div>

        {/* Content Section */}
        <div className="template1-content-section">
          <Draggable>
            <div className="template1-profile-image template1-draggable" id="template1-profile-image" onClick={handleImageClick}>
              <img src={imageSrc} alt="Host" />
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
          </Draggable>

          <div className="template1-details">
            <Draggable>
              <p
                className="template1-draggable"
                id="template1-event-date"
                contentEditable="true"
                onClick={(e) => handleEditElement(e.target)}
                style={{ fontSize, color: fontColor, fontStyle }}
              >
                Monday, 28 December
              </p>
            </Draggable>
            <Draggable>
              <p
                className="template1-draggable"
                id="template1-event-time"
                contentEditable="true"
                onClick={(e) => handleEditElement(e.target)}
                style={{ fontSize, color: fontColor, fontStyle }}
              >
                <FaCalendarAlt /> At 10.00 PM <FaClock />
              </p>
            </Draggable>
            <Draggable>
              <button className="template1-draggable template1-register-button" id="template1-register-button">
                REGISTER NOW
              </button>
            </Draggable>
          </div>
        </div>

        {/* Footer Section */}
        <div className="template1-footer-section template1-droppable">
          <Draggable>
            <p
              className="template1-draggable"
              id="template1-footer-link"
              contentEditable="true"
              onClick={(e) => handleEditElement(e.target)}
              style={{ fontSize, color: fontColor, fontStyle }}
            >
              www.reallygreatsite.com
            </p>
          </Draggable>
          <Draggable>
            <p
              className="template1-draggable"
              id="template1-footer-address"
              contentEditable="true"
              onClick={(e) => handleEditElement(e.target)}
              style={{ fontSize, color: fontColor, fontStyle }}
            >
              123 Anywhere St., Any City
            </p>
          </Draggable>
        </div>
      </div>

      {/* Font Style Popup */}
      {selectedElement && (
        <div className="template1-font-popup">
          <h3>Edit Font</h3>
          <label>Font Size:</label>
          <input
            type="number"
            value={parseInt(fontSize, 10)}
            onChange={handleFontSizeChange}
          /><br></br>
          <label>Font Color:</label>
          <input type="color" value={fontColor} onChange={handleFontColorChange} />
          <br></br><label>Font Style:</label>
          
          <select value={fontStyle} onChange={handleFontStyleChange}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Template1;
