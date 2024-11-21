import React, { useState } from 'react';
import Logo from '../Assets/Quantum_Logo.webp';
import '../CssFolder/template.css';
import EditContainer from './EditContainer';

const Template = ({ data, setData, editable }) => {
  const {
    imageUrl,
    title,
    titleColor,
    content,
    contentColor,
    footer,
    footerColor,
    logoUrl,
    logoSize,
    bgColor,
    backgroundImage,
  } = data;

  return (
    <div className="home-container" style={{ display: 'flex' }}>
      <div
        className="template-section"
        style={{
          padding: '5px',
          width: '40%',
          marginRight: '10px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div id="custom-template-wrapper" style={{ backgroundColor: bgColor || '' }}>
          <div className="logo-container" style={{ width: `${logoSize}px`, height: `${logoSize}px` }}>
            <img src={logoUrl || Logo} alt="logo" className="logo-image" />
          </div>
          <div className="title-section">
            <h1 className="title" style={{ color: titleColor || '#E94560' }}>
              {title || 'Welcome to Our Platform'}
            </h1>
          </div>
          <div className="content-section">
            <p className="content-text" style={{ color: contentColor || '#E5E5E5' }}>
              {content || 'Engage with your audience, grow your brand, and analyze performance with our comprehensive social media tools.'}
            </p>
          </div>
          <div className="footer-section">
            <p className="footer-text" style={{ color: footerColor || '#E94560' }}>
              {footer || '© 2024 Your Company Name. All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
      {/* Conditional rendering based on `editable` prop */}
      {editable && (
        <div className="editing-section" style={{ padding: '5px', width: '35%', marginLeft: '55%' }}>
          <EditContainer
            imageUrl={imageUrl}
            updateImageUrl={url => setData(prev => ({ ...prev, imageUrl: url }))}
            updateTitle={title => setData(prev => ({ ...prev, title }))}
            updateTitleColor={color => setData(prev => ({ ...prev, titleColor: color }))}
            updateContent={content => setData(prev => ({ ...prev, content }))}
            updateContentColor={color => setData(prev => ({ ...prev, contentColor: color }))}
            updateFooter={footer => setData(prev => ({ ...prev, footer }))}
            updateFooterColor={color => setData(prev => ({ ...prev, footerColor: color }))}
            logoUrl={logoUrl}
            updateLogoUrl={url => setData(prev => ({ ...prev, logoUrl: url }))}
            logoSize={logoSize}
            updateLogoSize={size => setData(prev => ({ ...prev, logoSize: size }))}
            bgColor={bgColor}
            updateBgColor={color => setData(prev => ({ ...prev, bgColor: color }))}
            updateBackgroundImage={url => setData(prev => ({ ...prev, backgroundImage: url }))}
          />
        </div>
      )}
    </div>
  );
};

export default Template;
