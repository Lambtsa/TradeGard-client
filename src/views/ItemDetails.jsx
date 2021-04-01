import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faMapMarkerAlt as mapMarker,
  faClock as clock,
  faUserCircle as userIcon,
} from '@fortawesome/free-solid-svg-icons';
import { fetchItemById } from '../modules/api-service';
import ContactModal from '../components/ContactModal/ContactModal';

const ItemDetails = () => {
  const { id } = useParams();
  const [objectDetails, setObjectDetails] = useState({});
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const response = await fetchItemById(id);
    if (!response.ok) {
      setIsLoading(false);
      setError(true);
    } else {
      const details = await response.json();
      setObjectDetails(details);
      setIsLoading(false);
    }
  }, []);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  if (error) {
    return <Redirect to="/not-found" />;
  }

  return (
    <>
      {isLoading && <p>Loading details...</p>}
      {!isLoading && (
        <article className="details">
          <img className="details__img" src={objectDetails.itemImages[0]} alt={objectDetails.itemTitle} />
          <div className="details__title-container">
            <h2 className="details__title">{objectDetails.itemTitle}</h2>
            <FontAwesomeIcon icon={outlineHeart} className="icon__heart--outline" />
          </div>
          <div className="details__caption">
            <FontAwesomeIcon icon={mapMarker} className="details__caption-icon" />
            <p>Stockholm</p>
          </div>
          <div className="details__caption">
            <FontAwesomeIcon icon={clock} className="details__caption-icon" />
            <p>{new Date(objectDetails.itemCreationDateUTC).toLocaleString()}</p>
          </div>
          <p className="details__description">{objectDetails.itemDescription}</p>
          <div className="details__caption">
            <FontAwesomeIcon icon={userIcon} className="details__caption-icon" />
            <p>
              {`Posted by: ${objectDetails.itemOwner.userDisplayName}`}
            </p>
          </div>
          <button className="primary__btn" onClick={handleButtonClick} type="button">Contact</button>
        </article>
      )}
      {showModal && (
        <ContactModal ownerDetails={objectDetails.itemOwner} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default ItemDetails;
