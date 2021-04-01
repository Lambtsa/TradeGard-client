import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchProductById } from '../modules/api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faMapMarkerAlt as mapMarker,
  faClock as clock,
  faUserCircle as userIcon
} from '@fortawesome/free-solid-svg-icons';

import './ItemDetails.scss';

const ItemDetails = () => {
  const { id } = useParams();
  const [objectDetails, setObjectDetails] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect( async () => {
    const response = await fetchProductById(id);
    if (!response.ok) {
      setIsLoading(false);
      return setError(true);
    }
    setIsLoading(false);
    const details = await response.json();
    setObjectDetails(details);
  });

  if (error) {
    return <Redirect to="/not-found" />
  }

  return (
    <>
      {isLoading && <p>Loading details...</p>}
      {!isLoading && <article>
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
          <p>{new Date(objectDetails.itemCreationDateUTC).toLocaleTimeString()}</p>
        </div>
        <p>{objectDetails.itemDescription}</p>
        <div>
          <FontAwesomeIcon icon={userIcon} className="" />
          <p>Posted by: {objectDetails.itemOwnerName}</p>
        </div>
        <button type="button">Contact</button>
      </article>}
    </>
  );
};

export default ItemDetails;
