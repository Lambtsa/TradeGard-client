import React, { useState } from 'react';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = e => setFirstName(e.target.value);
  const handleLastNameChange = e => setLastName(e.target.value);
  const handleDisplayNameChange = e => setDisplayName(e.target.value);
  const handleTelephoneChange = e => setTelephone(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  return (
    <form className="form">
      <label className="form__label" htmlFor="first-name">
        First name
        <input className="form__input" id="first-name" type="text" value={firstName} onChange={handleFirstNameChange} placeholder="Enter first name" required />
      </label>
      <label className="form__label" htmlFor="last-name">
        Last name
        <input className="form__input" id="last-name" type="text" value={lastName} onChange={handleLastNameChange} placeholder="Enter last name" required />
      </label>
      <label className="form__label" htmlFor="display-name">
        Display name
        <input className="form__input" id="display-name" type="text" value={displayName} onChange={handleDisplayNameChange} placeholder="Enter display name" required />
      </label>
      <label className="form__label" htmlFor="telephone">
        Telephone
        <input className="form__input" id="telephone" type="tel" value={telephone} onChange={handleTelephoneChange} placeholder="Enter phone number (optional)" />
      </label>
      <label className="form__label" htmlFor="email">
        Email
        <input className="form__input" id="email" type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" required />
      </label>
      <label className="form__label" htmlFor="password">
        Password
        <input className="form__input" id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Enter passsword" required />
      </label>
      <button className="form__btn" type="submit">Sign up</button>
    </form>
  );
};

export default SignUp;
