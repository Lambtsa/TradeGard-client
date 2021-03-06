import React from 'react';
// import { useOktaAuth } from '@okta/okta-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';

const LikeToggle = ({ isLiked, handleLikeToggle }) => (
  <button className="icon__heart--btn" type="button" onClick={handleLikeToggle}>
    <FontAwesomeIcon icon={isLiked ? filledHeart : outlineHeart} className="icon__heart" />
  </button>
);

export default LikeToggle;
