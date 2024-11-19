import React, { useState } from 'react';
import Logo from '../Assets/Quantum_Logo.webp';
import '../CssFolder/template.css';
import EditContainer from './EditContainer';

const Template2 = () => {
  const defaultContent = 'Engage with your audience, grow your brand, and analyze performance with our comprehensive social media tools.';

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [titleColor, setTitleColor] = useState('');
  const [content, setContent] = useState('');
  const [contentColor, setContentColor] = useState('');
  const [footer, setFooter] = useState('');
  const [footerColor, setFooterColor] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [logoColor, setLogoColor] = useState('');
  const [logoSize, setLogoSize] = useState();
  const [bgColor, setBgColor] = useState();
  const [backgroundimage, setBackgroundImage] = useState('');

  return (
    <div className="popup-container" style={{
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '20px',
      backgroundColor: 'lightgray',
    }}>
      <div className="home-container" style={{display:'flex'}}>
        <div className="template-section" style={{ 
          padding: '5px',
          width: '35%',  
          marginRight: '10px', 
          backgroundImage: `url(${backgroundimage})`
        }}>
          <div id="custom-template-wrapper" style={{ background: bgColor || '' }}>
            <div className="logo-container" style={{ width: `${logoSize}px`, height: `${logoSize}px` }}>
              <img src={logoUrl || Logo} alt="logo" className="logo-image" />
            </div>
            <div className="title-section">
              <h1 className="title" style={{ color: titleColor || '#E94560' }}>{title || 'Welcome to nam Company'}</h1>
            </div>
            <div className="content-section">
              <p className="content-text" style={{ color: contentColor || '#E5E5E5' }}>{content || defaultContent}</p>
            </div>
            <div className="footer-section">
              <p className="footer-text" style={{ color: footerColor || '#E94560' }}>{footer || '© 2026 Your Company Name. All rights reserved.'}</p>
            </div>
          </div>
        </div>

        <div className="editing-section" style={{ padding: '5px', width: '35%', marginLeft: '55%' }}>
          <EditContainer
            imageUrl={imageUrl}
            updateImageUrl={setImageUrl}
            updateTitle={setTitle}
            updateTitleColor={setTitleColor}
            updateContent={setContent}
            updateContentColor={setContentColor}
            updateFooter={setFooter}
            updateFooterColor={setFooterColor}
            logoUrl={logoUrl}
            updateLogoUrl={setLogoUrl}
            updateLogo={setLogo}
            updateLogoColor={setLogoColor}
            updateLogoSize={setLogoSize}
            bgColor={bgColor}
            updateBgColor={setBgColor}
            updateBackgroundImage={setBackgroundImage}  
          />
        </div>
      </div>
    </div>
  );
};

export default Template2;
