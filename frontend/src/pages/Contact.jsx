import React from 'react';
import '../styles/main.css';

const Contact = () => {
  return (
    <div className="page-container contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions or wish to get in touch, please find our contact details below:</p>
      <p>
        <strong>Website:</strong>{' '}
        <a href="https://www.novanectar.co.in" target="_blank" rel="noopener noreferrer">
          www.novanectar.co.in
        </a>
      </p>
      <p>
        <strong>Phone:</strong> +91 000000000
      </p>
    </div>
  );
};

export default Contact;
