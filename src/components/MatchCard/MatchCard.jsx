import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope as envelopeIcon } from '@fortawesome/free-solid-svg-icons';
import ContactModal from '../ContactModal/ContactModal';

const MatchCard = ({ matchDetails }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="MatchCard">
        <div className="MatchCard__userCircle">{matchDetails.userDisplayName[0].toUpperCase()}</div>
        <div className="MatchCard__user">
          <h3 className="MatchCard__header">{matchDetails.userDisplayName}</h3>
          <p className="MatchCard__text">They have liked</p>
          <p className="MatchCard__text count">{`${matchDetails.userLikeCount} items`}</p>
        </div>
        <button type="button" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={envelopeIcon} className="MatchCard__envelopeIcon" />
        </button>
      </li>
      {showModal && <ContactModal setShowModal={setShowModal} ownerDetails={matchDetails} />}
    </>
  );
};

export default MatchCard;
