import React from 'react';
import '../styles/main.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
        <h2 id="Logo-Footer">NovaNeactars</h2>
        </div>
        
        <div className="footer-social">
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.novanectar.co.in/" target="_blank" rel="noopener noreferrer">our website</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NovaNeactars. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
