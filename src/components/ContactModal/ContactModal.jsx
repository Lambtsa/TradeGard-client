import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';
import { fetchContactDetailsById } from '../../modules/api-service';

const ContactModal = ({ ownerId, setShowModal }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    const response = await fetchContactDetailsById(ownerId);
    if (!response.ok) {
      setErrorMessage('Could not get user contact details');
    } else {
      const data = await response.json();
      setEmail(data.userEmail);
      setPhone(data.userTelephone);
      setDisplayName(data.userDisplayName);
    }
  }, []);

  return (
    <section>
      <h2>Contact details:</h2>
      {displayName !== '' && (
        <>
          <h3>Contact person</h3>
          <p>{displayName}</p>
        </>
      )}
      {email !== '' && (
        <>
          <h3>Email</h3>
          <a href={`mailto:${email}`}>{email}</a>
        </>
      )}
      {phone !== '' && (
        <>
          <h3>Phone</h3>
          <p>{phone}</p>
        </>
      )}
      {errorMessage !== '' && <p>{errorMessage}</p>}
      <button type="button" className="icon__btn" onClick={() => setShowModal(false)}>
        <FontAwesomeIcon icon={deleteIcon} className="icon__delete" />
      </button>
    </section>
  );
};

export default ContactModal;
