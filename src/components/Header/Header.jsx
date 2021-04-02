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

/* eslint-disable */
const Header = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [displayName, setDisplayName] = useState('My account');
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
        <nav className="header__nav">
          <NavLink link="/" linkText="Browse" icon={searchIcon} />
          <NavLink link="/new-item" linkText="New item" icon={addIcon} />
          <NavLink link="/trading" linkText="Trading" icon={swapIcon} />
          <NavLink link="/likes" linkText="Likes" icon={heartIcon} />
          <NavLink link="/my-account" linkText={authState.isAuthenticated ? 'My account' : 'Login'} icon={accountIcon} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
