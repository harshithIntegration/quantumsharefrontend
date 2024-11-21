import React, { useState, useRef } from 'react';
import '../CssFolder/template.css';
import Draggable from 'react-draggable';
import { FaPlusCircle, FaDownload, FaTimes, FaPhoneAlt, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import t5limg from '../Assets/T6l.jpg';
import t5img from '../Assets/T6t.jpg'; 

const Template5 = () => {
  const [companyName, setCompanyName] = useState("Quantum Paradigm");
  const [tagline, setTagline] = useState("Delivering cutting-edge solutions for a smarter, more connected world.");
  const [footerText, setFooterText] = useState("");

  const [logo, setLogo] = useState(t5limg);
  const [teamPhoto, setTeamPhoto] = useState(t5img);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEditingElement, setCurrentEditingElement] = useState(null);

  const [companyNameFontSize, setCompanyNameFontSize] = useState("34px");
  const [companyNameFontStyle, setCompanyNameFontStyle] = useState("italic");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");

  const [taglineFontSize, setTaglineFontSize] = useState("27px");
  const [taglineFontStyle, setTaglineFontStyle] = useState("normal");
  const [taglineColor, setTaglineColor] = useState("#F7F9F2");

  const [footerFontSize, setFooterFontSize] = useState("25px");
  const [footerFontStyle, setFooterFontStyle] = useState("normal");
  const [footerColor, setFooterColor] = useState("#000000");

  const [phoneNumber, setPhoneNumber] = useState("+123456789");
  const [email, setEmail] = useState("contact@quantumparadigm.com");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [logoDimensions, setLogoDimensions] = useState({ width: 170, height: 79});
  const [teamPhotoDimensions, setTeamPhotoDimensions] = useState({ width:450 , height: 600 });

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTeamPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setTeamPhoto(event.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    html2canvas(document.querySelector(".template")).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = 'template.png';
      link.click();
    });
  };

  const openPopup = (element) => {
    setIsPopupOpen(true);
    setCurrentEditingElement(element);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentEditingElement(null);
  };

  const handleResize = (e, dimension, setter) => {
    const newValue = parseInt(e.target.value);
    setter(prev => ({ ...prev, [dimension]: newValue }));
  };

  const renderPopupContent = () => {
    switch (currentEditingElement) {
      case 'companyName':
        return (
          <div>
            <h3>Edit Company Name Styles</h3>
            <div className="t5control-group">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(companyNameFontSize)}
                onChange={(e) => setCompanyNameFontSize(`${e.target.value}px`)}
              />
            </div>
            <div className="t5control-group">
              <label>Font Style:</label>
              <select value={companyNameFontStyle} onChange={(e) => setCompanyNameFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            <div className="t5control-group">
              <label>Color:</label>
              <input
                type="color"
                value={companyNameColor}
                onChange={(e) => setCompanyNameColor(e.target.value)}
              />
            </div>
          </div>
        );
      case 'tagline':
        return (
          <div>
            <h3>Edit Tagline Styles</h3>
            <div className="t5control-group">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(taglineFontSize)}
                onChange={(e) => setTaglineFontSize(`${e.target.value}px`)}
              />
            </div>
            <div className="t5control-group">
              <label>Font Style:</label>
              <select value={taglineFontStyle} onChange={(e) => setTaglineFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            <div className="t5control-group">
              <label>Color:</label>
              <input
                type="color"
                value={taglineColor}
                onChange={(e) => setTaglineColor(e.target.value)}
              />
            </div>
          </div>
        );
      case 'footer':
        return (
          <div>
            <h3>Edit Footer Styles</h3>
            <div className="t5control-group">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(footerFontSize)}
                onChange={(e) => setFooterFontSize(`${e.target.value}px`)}
              />
            </div>
            <div className="t5control-group">
              <label>Font Style:</label>
              <select value={footerFontStyle} onChange={(e) => setFooterFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            <div className="t5control-group">
              <label>Color:</label>
              <input
                type="color"
                value={footerColor}
                onChange={(e) => setFooterColor(e.target.value)}
              />
              
            </div>
          </div>
        );
      case 'logo':
        return (
          <div>
            <h3>Replace Logo</h3>
            <div className="t5control-group">
              <label>Upload New Logo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
            {logo && (
              <div>
                <h4>Resize Logo</h4>
                <div className="t5resize-controls">
                  <label>Width:</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={logoDimensions.width}
                    onChange={(e) => handleResize(e, 'width', setLogoDimensions)}
                  />
                  <label>Height:</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={logoDimensions.height}
                    onChange={(e) => handleResize(e, 'height', setLogoDimensions)}
                  />
                </div>
                <img
                  src={logo}
                  alt="Logo Preview"
                  style={{ width: `${logoDimensions.width}px`, height: `${logoDimensions.height}px`, marginTop: '10px' }}
                />
              </div>
            )}
          </div>
        );
      case 'teamPhoto':
        return (
          <div>
            <h3>Replace Team Photo</h3>
            <div className="t5control-group">
              <label>Upload New Team Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleTeamPhotoChange}
              />
            </div>
            {teamPhoto && (
              <div>
                <h4>Resize Team Photo</h4>
                <div className="t5resize-controls">
                  <label>Width:</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={teamPhotoDimensions.width}
                    onChange={(e) => handleResize(e, 'width', setTeamPhotoDimensions)}
                  />
                  <label>Height:</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={teamPhotoDimensions.height}
                    onChange={(e) => handleResize(e, 'height', setTeamPhotoDimensions)}
                  />
                </div>
                <img
                  src={teamPhoto}
                  alt="Team Photo Preview"
                  style={{ width: `${teamPhotoDimensions.width}px`, height: `${teamPhotoDimensions.height}px`, marginTop: '10px' }}
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="t5app-container">
      {/* Draggable template section */}
      <div className="t5template">
        {/* Draggable Logo */}
        <Draggable>
          <div className="t5draggable-element">
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className="company-logo"
                onClick={() => openPopup('logo')}
                style={{ cursor: 'pointer', width: `${logoDimensions.width}px`, height: `${logoDimensions.height}px` }}
              />
            ) : (
              <div className="t5add-logo">
                <label htmlFor="logoUpload" style={{ cursor: 'pointer' }}>
                  <FaPlusCircle className="plus-icon" />
                  <p>Add Logo</p>
                </label>
                <input
                  type="file"
                  id="logoUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleLogoChange}
                />
              </div>
            )}
          </div>
        </Draggable>

        {/* Draggable Company Name (Editable Text) */}
        <Draggable>
          <div className="t5draggable-element">
            <h1
              className="t5company-name"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => setCompanyName(e.target.innerText)}
              onClick={() => openPopup('companyName')}
              style={{
                cursor: 'pointer',
                fontSize: companyNameFontSize,
                fontStyle: companyNameFontStyle,
                color: companyNameColor,
              }}
            >
              {companyName}
            </h1>
          </div>
        </Draggable>

        

        {/* Draggable Team Photo */}
        <Draggable>
          <div className="t5draggable-element">
            {teamPhoto ? (
              <img
                src={teamPhoto}
                alt="Team"
                className="t5team-photo"
                onClick={() => openPopup('teamPhoto')}
                style={{ cursor: 'pointer', width: `${teamPhotoDimensions.width}px`, height: `${teamPhotoDimensions.height}px` }}
              />
            ) : (
              <div className="t5add-team-photo">
                <label htmlFor="teamPhotoUpload" style={{ cursor: 'pointer' }}>
                  <FaPlusCircle className="plus-icon" />
                  <p>Add Team Photo</p>
                </label>
                <input
                  type="file"
                  id="teamPhotoUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleTeamPhotoChange}
                />
              </div>
            )}
          </div>
        </Draggable>

         {/* Draggable Tagline (Editable Text) */}
         <Draggable>
          <div className="t5draggable-element">
            <p
              className="t5tagline"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => setTagline(e.target.innerText)}
              onClick={() => openPopup('tagline')}
              style={{
                cursor: 'pointer',
                fontSize: taglineFontSize,
                fontStyle: taglineFontStyle,
                color: taglineColor,
              }}
            >
              {tagline}
            </p>
          </div>
        </Draggable>

        {/* Draggable Footer Elements */}
        <Draggable>
          <div
            className="t5draggable-element"
            style={{ fontSize: footerFontSize, fontStyle: footerFontStyle, color: footerColor }}
          >
            {isEditingPhone ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={() => setIsEditingPhone(false)}
              />
            ) : (
              <span onClick={() => setIsEditingPhone(true)} style={{ cursor: 'pointer' }}>
                <FaPhoneAlt /> {phoneNumber}
              </span>
            )}
          </div>
        </Draggable>

        <Draggable>
          <div
            className="t5draggable-element"
            style={{ fontSize: footerFontSize, fontStyle: footerFontStyle, color: footerColor }}
          >
            {isEditingEmail ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setIsEditingEmail(false)}
              />
            ) : (
              <span onClick={() => setIsEditingEmail(true)} style={{ cursor: 'pointer' }}>
                <FaEnvelope /> {email}
              </span>
            )}
          </div>
        </Draggable>

        <Draggable>
          <div className="t5draggable-element">
            <button className="t5join-us-button">
              <FaUserPlus /> Join Us
            </button>
          </div>
        </Draggable>
      </div>

      {/* Download Button */}
      <button className="t5download-btn" onClick={handleDownload}>
        <FaDownload /> Download Template
      </button>

      {/* Popup for Editing */}
      {isPopupOpen && (
        <div className="t5popup">
          <div className="t5popup-content">
            <button className="close-btn" onClick={closePopup}>
              <FaTimes />
            </button>
            {renderPopupContent()}
          </div>
        </div>
      )}
    </div>
    
  );
};

export default Template5;



