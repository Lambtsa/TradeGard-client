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

import './ItemDetails.scss';
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

  console.log(objectDetails);

  return (
    <>
      {isLoading && <p>Loading details...</p>}
      {!isLoading && (
        <article>
          <img src={objectDetails.itemImages[0]} alt={objectDetails.itemTitle} />
          <div>
            <h2>{objectDetails.itemTitle}</h2>
            <FontAwesomeIcon icon={outlineHeart} className="icon__heart--outline" />
          </div>
          <div>
            <FontAwesomeIcon icon={mapMarker} className="" />
            <p>Stockholm</p>
          </div>
          <div>
            <FontAwesomeIcon icon={clock} className="" />
            <p>{new Date(objectDetails.itemCreationDateUTC).toLocaleString()}</p>
          </div>
          <p>{objectDetails.itemDescription}</p>
          <div>
            <FontAwesomeIcon icon={userIcon} className="" />
            <p>
              Posted by:
              {objectDetails.itemOwnerName}
            </p>
          </div>
          <button onClick={handleButtonClick} type="button">Contact</button>
        </article>
      )}
      {showModal && <ContactModal ownerId={objectDetails.itemOwner} setShowModal={setShowModal} />}
    </>
  );
};

export default ItemDetails;
