import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    {`© ${new Date().getFullYear()} Moustacheteers. All rights reserved`}
  </footer>
);

export default Footer;
