import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import moustache from '../../assets/moustache.svg';

const Header = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  const button = authState.isAuthenticated
    ? <button type="button" onClick={() => oktaAuth.signOut()}>Logout</button>
    : <button type="button" onClick={() => history.push('/login')}>Login</button>;

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={moustache} alt="Moustache company logo" />
        <nav className="header__nav">
          <Link className="header__link" to="/">Browse</Link>
          <Link className="header__link" to="/new-item">New Item</Link>
          <Link className="header__link" to="/trading">Trading</Link>
          <Link className="header__link" to="/likes">Likes</Link>
          <Link className="header__link" to="/my-account">My account</Link>
          {button}
        </nav>
      </div>
    </header>
  );
};

export default Header;