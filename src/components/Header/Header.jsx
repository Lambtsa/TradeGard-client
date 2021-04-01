import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link, useHistory } from 'react-router-dom';

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
          <Link className="header__link" to="/">Browse</Link>
          <Link className="header__link" to="/new-item">New Item</Link>
          <Link className="header__link" to="/trading">Trading</Link>
          <Link className="header__link" to="/likes">Likes</Link>
          {authState.isAuthenticated && <Link className="header__link" to="/my-account">{displayName}</Link>}
          {!authState.isAuthenticated && <Link className="header__link" to="/signup">SignUp</Link>}
          {button}
        </nav>
      </div>
    </header>
  );
};

export default Header;
