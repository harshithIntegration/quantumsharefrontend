import React, { useState, useRef } from 'react';
import '../CssFolder/template.css';
import Draggable from 'react-draggable';
import { FaPlusCircle, FaDownload, FaTimes, FaPhoneAlt, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import t4limg from '../Assets/T4l.png';
import t4img from '../Assets/T4p.jpg'; 
Modal.setAppElement('#root');


const Template4 = () => {
  const [companyName, setCompanyName] = useState("Quantum Paradigm");
  const [tagline, setTagline] = useState("Delivering cutting-edge solutions for a smarter, more connected world.");
  const [footerText, setFooterText] = useState("");

  const [logo, setLogo] = useState(t4limg);
  const [teamPhoto, setTeamPhoto] = useState(t4img);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEditingElement, setCurrentEditingElement] = useState(null);

  const [companyNameFontSize, setCompanyNameFontSize] = useState("30px");
  const [companyNameFontStyle, setCompanyNameFontStyle] = useState("italic");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [taglineFontSize, setTaglineFontSize] = useState("18px");
  const [taglineFontStyle, setTaglineFontStyle] = useState("normal");
  const [taglineColor, setTaglineColor] = useState("#B80000");

  const [footerFontSize, setFooterFontSize] = useState("20px");
  const [footerFontStyle, setFooterFontStyle] = useState("normal");
  const [footerColor, setFooterColor] = useState("#000000");

  const [phoneNumber, setPhoneNumber] = useState("+123456789");
  const [email, setEmail] = useState("contact@quantumparadigm.com");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [logoDimensions, setLogoDimensions] = useState({ width: 235, height: 98});
  const [teamPhotoDimensions, setTeamPhotoDimensions] = useState({ width: 294, height: 300 });

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
  
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const renderPopupContent = () => {
    switch (currentEditingElement) {
      case 'companyName':
        return (
          <div>
            <h3>Edit Company Name Styles</h3>
            <div className="control-group">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(companyNameFontSize)}
                onChange={(e) => setCompanyNameFontSize(`${e.target.value}px`)}
              />
            </div>
            <div className="control-group">
              <label>Font Style:</label>
              <select value={companyNameFontStyle} onChange={(e) => setCompanyNameFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            <div className="control-group">
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
          <div className='t4tag'>
            <h3>Edit Tagline Styles</h3>
            <div className="control-group">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(taglineFontSize)}
                onChange={(e) => setTaglineFontSize(`${e.target.value}px`)}
              />
            </div>
            <div className="control-group">
              <label>Font Style:</label>
              <select value={taglineFontStyle} onChange={(e) => setTaglineFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            <div className="control-group">
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
            <div className="control-group">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(footerFontSize)}
                onChange={(e) => setFooterFontSize(`${e.target.value}px`)}
              />
            </div>
            <div className="control-group">
              <label>Font Style:</label>
              <select value={footerFontStyle} onChange={(e) => setFooterFontStyle(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            <div className="control-group">
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
            <div className="control-group">
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
                <div className="resize-controls">
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
            <div className="control-group">
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
                <div className="resize-controls">
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
    <div className="t4app-container">
      <div className="t4template">
        <Draggable>
          <div className="t4draggable-element">
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className="company-logo"
                onClick={() => openPopup('logo')}
                style={{ cursor: 'pointer', width: `${logoDimensions.width}px`, height: `${logoDimensions.height}px` }}
              />
            ) : (
              <div className="add-logo">
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
        <Draggable>
          <div className="t4draggable-element">
            <h1
              className="company-name"
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
        <Draggable>
          <div className="t4draggable-element">
            <p
              className="tagline"
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
        <Draggable>
          <div className="t4draggable-element">
            {teamPhoto ? (
              <img
                src={teamPhoto}
                alt="Team"
                className="t4team-photo"
                onClick={() => openPopup('teamPhoto')}
                style={{ cursor: 'pointer', width: `${teamPhotoDimensions.width}px`, height: `${teamPhotoDimensions.height}px` }}
              />
            ) : (
              <div className="add-team-photo">
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
         <Draggable>
          <div
            className="t4draggable-footer"
            style={{ fontSize: footerFontSize, fontStyle: footerFontStyle, color: footerColor }}
          >
            <p>
              {footerText}
              {isEditingPhone ? (
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => setIsEditingPhone(false)}
                />
              ) : (
                <span onClick={() => setIsEditingPhone(true)}>
                  <FaPhoneAlt /> {phoneNumber}
                </span>
              )}
              <br></br>
              <br></br>
              {isEditingEmail ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setIsEditingEmail(false)}
                />
              ) : (
                <span onClick={() => setIsEditingEmail(true)}>
                  <FaEnvelope /> {email}
                </span>
              )}
            </p>
            <button className="t4join-us-button">
              <FaUserPlus /> Join Us
            </button>
          </div>
        </Draggable>
        
        </div>
      <button className="t4download-btn" onClick={handleDownload}>
        <FaDownload /> Download Template
      </button>
      {isPopupOpen && (
        <div className="t4popup">
          <div className="t4popup-content">
            <button className="t4close-btn" onClick={closePopup}>
              <FaTimes />
            </button>
            {renderPopupContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template4;




