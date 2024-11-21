import React, { useState } from "react";
import Draggable from "react-draggable";
import '../CssFolder/Template.css';
import t8bimg from '../Assets/T5p.jpg'; 

// Font and Style Modal component
const StyleModal = ({ isOpen, onClose, applyStyles }) => {
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState("normal");

  const handleStyleChange = (styleType, value) => {
    const updatedStyles = {
      fontSize: styleType === "fontSize" ? value : fontSize,
      color: styleType === "color" ? value : color,
      fontWeight: styleType === "fontWeight" ? value : fontWeight,
    };
    applyStyles(updatedStyles);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="f6modal-content">
        <h3>Edit Text Style</h3>
        <label>
          Font Size:
          <input
            type="number"
            value={fontSize.replace("px", "")}
            onChange={(e) => {
              const newSize = `${e.target.value}px`;
              setFontSize(newSize);
              handleStyleChange("fontSize", newSize);
            }}
          />
        </label><br />
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              handleStyleChange("color", e.target.value);
            }}
          />
        </label><br />
        <label>
          Font Weight:
          <select
            value={fontWeight}
            onChange={(e) => {
              setFontWeight(e.target.value);
              handleStyleChange("fontWeight", e.target.value);
            }}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
          </select>
        </label>
        <div className="f6button">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const Template9 = () => {
  const [headerText, setHeaderText] = useState("Digital Marketing");
  const [subHeaderText, setSubHeaderText] = useState("Agency");
  const [descriptionText, setDescriptionText] = useState(
    "We make informed decisions based on data analytics to optimize your digital marketing campaigns."
  );
  const [servicesText, setServicesText] = useState("Our Services");
  const [servicesList, setServicesList] = useState([
    "* Tech Sales",
    "* Data Analytics",
    "* Market Research",
    "* Digital Marketing",
  ]);
  const [contactDetails, setContactDetails] = useState({
    phone: "123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
  });
  
  const [imageSrc, setImageSrc] = useState(t8bimg); // State for image source

  // Handler for service list changes
  const handleServiceChange = (index, newValue) => {
    const updatedServices = [...servicesList];
    updatedServices[index] = newValue;
    setServicesList(updatedServices);
  };

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [styles, setStyles] = useState({});

  const openModal = (target) => {
    setCurrentTarget(target);
    setIsModalOpen(true);
  };

  const applyStyles = (newStyles) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [currentTarget]: newStyles,
    }));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result); // Update image with uploaded file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="f6-template-container">
      <StyleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applyStyles={applyStyles}
      />
      <div className="f6-header">
        <Draggable>
          <h1
            style={styles.header}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setHeaderText(e.target.innerText)}
            onClick={() => openModal("header")}
          >
            {headerText}
          </h1>
        </Draggable>
        <Draggable>
          <h2
            style={styles.subHeader}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setSubHeaderText(e.target.innerText)}
            onClick={() => openModal("subHeader")}
          >
            {subHeaderText}
          </h2>
        </Draggable>
        <Draggable>
          <p
            style={styles.description}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setDescriptionText(e.target.innerText)}
            onClick={() => openModal("description")}
          >
            {descriptionText}
          </p>
        </Draggable>
      </div>
      <div className="f6-content">
        <div className="f6-services">
          <Draggable>
            <h2
              style={styles.services}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setServicesText(e.target.innerText)}
              onClick={() => openModal("services")}
            >
              {servicesText}
            </h2>
          </Draggable>
          <Draggable>
            <ul>
              {servicesList.map((service, index) => (
                <li
                  key={index}
                  style={styles[`service-${index}`]}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleServiceChange(index, e.target.innerText)}
                  onClick={() => openModal(`service-${index}`)}
                >
                  {service}
                </li>
              ))}
            </ul>
          </Draggable>
          <Draggable>
            <div className="button">
              <button className="f6-join-button">Join Now</button>
            </div>
          </Draggable>
          <Draggable>
            <div className="f6-contact-details">
              <p
                style={styles.phone}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    phone: e.target.innerText,
                  })
                }
                onClick={() => openModal("phone")}
              >
                {contactDetails.phone}
              </p>
              <p
                style={styles.email}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    email: e.target.innerText,
                  })
                }
                onClick={() => openModal("email")}
              >
                {contactDetails.email}
              </p>
              <p
                style={styles.address}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    address: e.target.innerText,
                  })
                }
                onClick={() => openModal("address")}
              >
                {contactDetails.address}
              </p>
            </div>
          </Draggable>
        </div>
        <div className="f6-line-container">
          <div className="f6-vertical-line"></div>
          <div className="f6-vertical-line1"></div>
          <div className="f6-vertical-line2"></div>

          <Draggable>
            <div className="f6-image-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} // Hide the input
                id="image-upload"
              />
              <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                <img src={imageSrc} alt="f6-Profile" />
              </label>
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default Template9;
