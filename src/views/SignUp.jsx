import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { postNewUserToAPI } from '../modules/api-service';
import SnackBar from '../components/SnackBar/SnackBar';

const SignUp = () => {
  const { oktaAuth } = useOktaAuth();
  const [userFirstName, setFirstName] = useState('');
  const [userLastName, setLastName] = useState('');
  const [userDisplayName, setDisplayName] = useState('');
  const [userTelephone, setTelephone] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = e => setFirstName(e.target.value);
  const handleLastNameChange = e => setLastName(e.target.value);
  const handleDisplayNameChange = e => setDisplayName(e.target.value);
  const handleTelephoneChange = e => setTelephone(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);

  const handleFormSubmit = async event => {
    window.scrollTo(0, 0);
    event.preventDefault();
    if (userPassword !== confirmPassword) {
      setError(true);
      setErrorMessage('Please ensure that your passwords match!');
    } else {
      const newUser = {
        user: {
          userFirstName,
          userLastName,
          userDisplayName,
          userTelephone,
          userEmail,
          userPassword,
        },
      };
      const response = await postNewUserToAPI(newUser);
      if (!response.ok) {
        setError(true);
        const err = await response.json();
        setErrorMessage(err.message);
      } else {
        try {
          const transaction = await oktaAuth.signIn({
            username: newUser.user.userEmail,
            password: newUser.user.userPassword,
          });
          if (transaction.status === 'SUCCESS') {
            oktaAuth.signInWithRedirect({
              originalUri: '/',
              sessionToken: transaction.sessionToken,
            });
            setError(false);
          } else {
            setError(true);
            setErrorMessage('Login failed');
          }
        } catch (err) {
          setError(true);
          setErrorMessage('Login failed');
        }
      }
    }
  };

  return (
    <section className="content__container padding">
      <h1 className="form__title">Sign up</h1>
      <p className="form__subtitle">Enter your details to start swapping</p>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form__label" htmlFor="first-name">
          First name
          <input
            className="form__input"
            id="first-name"
            type="text"
            value={userFirstName}
            onChange={handleFirstNameChange}
            placeholder="Enter first name"
            maxLength="20"
            required />
        </label>
        <label className="form__label" htmlFor="last-name">
          Last name
          <input
            className="form__input"
            id="last-name"
            type="text"
            value={userLastName}
            onChange={handleLastNameChange}
            placeholder="Enter last name"
            maxLength="20"
            required />
        </label>
        <label className="form__label" htmlFor="display-name">
          Display name
          <input
            className="form__input"
            id="display-name"
            type="text"
            value={userDisplayName}
            onChange={handleDisplayNameChange}
            placeholder="Enter display name"
            maxLength="20"
            required />
        </label>
        <label className="form__label" htmlFor="telephone">
          Telephone
          <input
            className="form__input"
            id="telephone"
            type="number"
            value={userTelephone}
            onChange={handleTelephoneChange}
            placeholder="Enter phone number (optional)" />
        </label>
        <label className="form__label" htmlFor="email">
          Email
          <input
            className="form__input"
            id="email"
            type="email"
            value={userEmail}
            onChange={handleEmailChange}
            placeholder="Enter email"
            required />
        </label>
        <label className="form__label" htmlFor="password">
          Password
          <input
            className="form__input"
            id="password"
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
            placeholder="Enter passsword"
            required />
        </label>
        <label className="form__label" htmlFor="password">
          Confirm password
          <input
            className="form__input"
            id="password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm password"
            required />
        </label>
        <button className="primary__btn" type="submit">Sign up</button>
        <p className="form__signup--text">
          You already have an account?
          <Link className="form__signup--link" to="/login"> Login</Link>
        </p>
      </form>
      {error && <SnackBar state={error} setState={setError} type="error" message={errorMessage} />}
    </section>
  );
};

export default SignUp;
