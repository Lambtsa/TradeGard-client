import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavLink = ({ icon, link, linkText }) => (
  <Link className="header__link" to={link}>
    <FontAwesomeIcon icon={icon} className="header__icon" />
    <p>{linkText}</p>
  </Link>
);

export default NavLink;
