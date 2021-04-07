import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight as rightArrow,
  faAngleDown as downArrow,
} from '@fortawesome/free-solid-svg-icons';

const Expandable = ({
  children,
  title,
  subtitle,
  icon,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="expandable__container">
      <button className={`expandable__top ${isExpanded ? 'expanded' : ''}`} type="button" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="expandable__icon--container">
          {icon && <div className="expandable__circle">{icon}</div>}
          <div className="expandable__details">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
        <FontAwesomeIcon icon={isExpanded ? downArrow : rightArrow} className="icon__right-arrow" />
      </button>
      {isExpanded && (
        <div className={`expandable__bottom ${isExpanded ? 'expanded' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Expandable;

Expandable.propTypes = {
  // children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};
