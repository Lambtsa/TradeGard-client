import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope as envelopeIcon,
  faAngleDown as angleIconDown,
  faAngleUp as angleIconUp,
} from '@fortawesome/free-solid-svg-icons';
import ContactModal from '../ContactModal/ContactModal';

const MatchCard = ({ matchDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <li className="MatchCard">
        <div className="MatchCard__top">
          <div className="MatchCard__userCircle">{matchDetails.userDisplayName[0].toUpperCase()}</div>
          <div className="MatchCard__user">
            <Link to={`/users/${matchDetails.userId}`} className="MatchCard__header">{matchDetails.userDisplayName}</Link>
            <p className="MatchCard__text">They have liked</p>
            <button type="button" onClick={() => setIsVisible(!isVisible)} className="MatchCard__text count">
              <>
                {`${matchDetails.userLikeCount} of your items`}
                <FontAwesomeIcon className="caret" icon={isVisible ? angleIconDown : angleIconUp} />
              </>
            </button>
          </div>
          <button type="button" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={envelopeIcon} className="MatchCard__envelopeIcon" />
          </button>
        </div>
        {isVisible && (
          <div className="MatchCard__bottom">
            <div className="MatchCard__list">
              <h4>Their likes</h4>
              {matchDetails.theirLikes.map(like => <Link className="MatchCard__link" key={like.id} to={`/items/${like.id}`}>{like.itemTitle}</Link>)}
            </div>
            <div className="MatchCard__list">
              <h4>Your likes</h4>
              {matchDetails.yourLikes.map(like => <Link className="MatchCard__link" key={like.id} to={`/items/${like.id}`}>{like.itemTitle}</Link>)}
            </div>
          </div>
        )}
      </li>
      {showModal && <ContactModal setShowModal={setShowModal} ownerDetails={matchDetails} />}
    </>
  );
};

export default MatchCard;
