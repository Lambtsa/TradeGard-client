import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationLink = ({ icon, link, linkText }) => (
  <NavLink activeClassName="active" className="header__link" exact to={link}>
    <FontAwesomeIcon icon={icon} className="header__icon" />
    <p>{linkText}</p>
  </NavLink>
);

export default NavigationLink;
