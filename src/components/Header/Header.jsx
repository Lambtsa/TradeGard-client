import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import {
  faSearch as searchIcon,
  faPlusCircle as addIcon,
  faExchangeAlt as swapIcon,
  faHeart as heartIcon,
  faUserCircle as accountIcon,
} from '@fortawesome/free-solid-svg-icons';
import NavLink from '../NavLink/NavLink';
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
        <img className="header__img" src={moustache} alt="Moustache black" />
        <nav className="header__nav">
          <NavLink link="/" linkText="Browse" icon={searchIcon} />
          <NavLink link="/new-item" linkText="New item" icon={addIcon} />
          <NavLink link="/trades" linkText="Trading" icon={swapIcon} />
          <NavLink link="/likes" linkText="Likes" icon={heartIcon} />
          <NavLink link="/my-account" linkText={authState.isAuthenticated ? displayName : 'Login'} icon={accountIcon} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
