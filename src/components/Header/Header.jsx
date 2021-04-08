import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory, Link } from 'react-router-dom';
import {
  faSearch as searchIcon,
  faPlusCircle as addIcon,
  faExchangeAlt as swapIcon,
  faHeart as heartIcon,
  faUserCircle as accountIcon,
} from '@fortawesome/free-solid-svg-icons';
import NavigationLink from '../NavigationLink/NavigationLink';
import moustache from '../../assets/moustacheIcon.svg';

/* eslint-disable */
const Header = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [displayName, setDisplayName] = useState('Profile');
  const history = useHistory();

  const button = authState.isAuthenticated
    ? <button type="button" onClick={() => oktaAuth.signOut()}>Logout</button>
    : <button type="button" onClick={() => history.push('/login')}>Login</button>;

  useEffect(() => {
    if (authState.isAuthenticated) {
      oktaAuth.token.getUserInfo().then(info => {
        setDisplayName(info.nickname);
      });
    } 
  }, [authState, oktaAuth]);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__img" src={moustache} alt="Moustache black" />
        </Link>
        <nav className="header__nav">
          <NavigationLink link="/" linkText="Browse" icon={searchIcon} />
          <NavigationLink link="/new-item" linkText="New item" icon={addIcon} />
          <NavigationLink link="/trades" linkText="Trading" icon={swapIcon} />
          <NavigationLink link="/likes" linkText="Likes" icon={heartIcon} />
          <NavigationLink link="/my-account" linkText={authState.isAuthenticated ? displayName : 'Login'} icon={accountIcon} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
