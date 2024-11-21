import React, { useState, useRef } from 'react';
import '../CssFolder/Template.css';
import Draggable from 'react-draggable';
import { FaPlusCircle, FaDownload, FaTimes } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import t3limg from '../Assets/T7l.jpg';
import t3img from '../Assets/T7b.jpg'; 

const Template3 = () => {
  const [companyName, setCompanyName] = useState("Quantum Paradigm");
  const [tagline, setTagline] = useState("Delivering cutting-edge solutions for a smarter, more connected world.");
  const [footerText, setFooterText] = useState("© Quantum Paradigm | Empowering Innovation");

  const [logo, setLogo] = useState(t3limg);
  const [teamPhoto, setTeamPhoto] = useState(t3img);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEditingElement, setCurrentEditingElement] = useState(null);

  const [companyNameFontSize, setCompanyNameFontSize] = useState("24px");
  const [companyNameFontStyle, setCompanyNameFontStyle] = useState("normal");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");

  const [taglineFontSize, setTaglineFontSize] = useState("16px");
  const [taglineFontStyle, setTaglineFontStyle] = useState("normal");
  const [taglineColor, setTaglineColor] = useState("#000000");

  const [footerFontSize, setFooterFontSize] = useState("14px");
  const [footerFontStyle, setFooterFontStyle] = useState("normal");
  const [footerColor, setFooterColor] = useState("#000000");

  const [logoDimensions, setLogoDimensions] = useState({ width: 150, height: 150 });
  const [teamPhotoDimensions, setTeamPhotoDimensions] = useState({ width: 400, height: 300 });

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
          <div>
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
    <div className="t3app-container">
      {/* Draggable template section */}
      <div className="template">
        {/* Draggable Logo */}
        <Draggable>
          <div className="draggable-element">
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

        {/* Draggable Company Name (Editable Text) */}
        <Draggable>
          <div className="draggable-element">
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

        {/* Draggable Tagline (Editable Text) */}
        <Draggable>
          <div className="draggable-element">
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

        {/* Draggable Team Photo */}
        <Draggable>
          <div className="draggable-element">
            {teamPhoto ? (
              <img
                src={teamPhoto}
                alt="Team"
                className="team-photo"
                onClick={() => openPopup('teamPhoto')}
                style={{ cursor: 'pointer', width: `${teamPhotoDimensions.width}px`, height: `${teamPhotoDimensions.height}px` }}
              />
            ) : (
              <div className="t3add-team-photo">
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

        {/* Draggable Footer (Editable Text) */}
        <Draggable>
          <div className="draggable-element">
            <footer
              className="footer"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => setFooterText(e.target.innerText)}
              onClick={() => openPopup('footer')}
              style={{
                cursor: 'pointer',
                fontSize: footerFontSize,
                fontStyle: footerFontStyle,
                color: footerColor,
              }}
            >
              {footerText}
            </footer>
          </div>
        </Draggable>
      </div>

      {/* Download Button */}
      <button className="t3download-btn" onClick={handleDownload}>
        <FaDownload /> Download Template
      </button>

      {/* Popup for Editing */}
      {isPopupOpen && (
        <div className="t3popup">
          <div className="t3popup-content">
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

export default Template3;
