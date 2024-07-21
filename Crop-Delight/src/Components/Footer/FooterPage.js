import React from 'react';
import '../Footer/FooterPage.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>PAYMENT METHODS</h3>
          <ul>
            <li>Debit/Credit Card</li>
            <li>Google Pay</li>
            <li>Phone Pe</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>ABOUT US</h3>
          <ul>
            <li>Services</li>
            <li>Products</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>SOCIAL MEDIA</h3>
          <ul>
            <li>GitHub</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>CONTACT</h3>
          <ul>
            <li>+1 343-558-1915</li>
            <li>cropdelight@gmail.com</li>
            <li>Conestoga College, Milton</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Crop Delight | Email: cropdelight@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
