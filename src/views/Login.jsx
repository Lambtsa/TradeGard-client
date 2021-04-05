import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import SnackBar from '../components/SnackBar/SnackBar';

const SignInForm = () => {
  const [error, setError] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const transaction = await oktaAuth.signInWithCredentials({
        username,
        password,
      });
      if (transaction.status === 'SUCCESS') {
        setSessionToken(transaction.sessionToken);
        oktaAuth.signInWithRedirect({
          sessionToken: transaction.sessionToken,
        });
        setError(false);
      } else {
        window.scrollTo(0, 0);
        setError(true);
      }
    } catch (err) {
      window.scrollTo(0, 0);
      setError(true);
    }
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    return null;
  }

  return (
    <section className="form__container">
      <h1 className="form__title">Login</h1>
      <p className="form__subtitle">Enter your email address and password</p>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form__label" htmlFor="username">
          Username
          <input
            className="form__input"
            placeholder="Enter your username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange} />
        </label>
        <label className="form__label" htmlFor="password">
          Password
          <input
            className="form__input"
            placeholder="Enter your password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange} />
        </label>
        <button className="primary__btn" type="submit">Login</button>
        <p className="form__signup--text">
          Don&apos;t have an account?
          <Link className="form__signup--link" to="/signup"> Signup</Link>
        </p>
      </form>
      {error && (
        <SnackBar
          state={error}
          setState={setError}
          type="error"
          message="Oops! Something went wrong!" />
      )}
    </section>
  );
};

export default SignInForm;
