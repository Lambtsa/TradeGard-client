import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import SnackBar from '../SnackBar/SnackBar';

const SignInForm = () => {
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

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
        setIsValid(true);
      } else {
        setError(true);
        setIsValid(false);
      }
    } catch (err) {
      setError(true);
      setIsValid(false);
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
    <>
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
      {isValid && (
        <SnackBar
          state={isValid}
          setState={setIsValid}
          type="success"
          message="Your login is successful" />
      )}
    </>
  );
};

export default SignInForm;
