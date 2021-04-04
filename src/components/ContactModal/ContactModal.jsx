import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';

const ContactModal = ({ ownerDetails, setShowModal }) => {
  const {
    userDisplayName,
    userEmail,
    userTelephone,
  } = ownerDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="modal">
      <div className="modal__inner">
        <h3 className="modal__subtitle">Contact person</h3>
        <p className="modal__info">{userDisplayName}</p>
        <h3 className="modal__subtitle">Email</h3>
        <a className="modal__info--link" href={`mailto:${userEmail}`}>{userEmail}</a>
        {userTelephone !== '' && (
          <>
            <h3 className="modal__subtitle">Phone</h3>
            <a className="modal__info--link" href={`tel:${userTelephone}`}>{userTelephone}</a>
          </>
        )}
        <button type="button" className="btn__close" onClick={() => setShowModal(false)}>
          <FontAwesomeIcon icon={deleteIcon} className="icon__delete" />
        </button>
      </div>
    </section>
  );
};

export default ContactModal;
