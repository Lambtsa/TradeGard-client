import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt as mapMarker,
  faClock as clock,
  faUserCircle as userIcon,
} from '@fortawesome/free-solid-svg-icons';
import { fetchItemById } from '../modules/api-service';
import ContactModal from '../components/ContactModal/ContactModal';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import LikeToggle from '../components/LikeToggle/LikeToggle';
import Loader from '../components/Loader/Loader';

const ItemDetails = () => {
  const { authState } = useOktaAuth();
  const { id } = useParams();
  const [objectDetails, setObjectDetails] = useState({});
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (authState.accessToken) {
      const { accessToken } = authState.accessToken;
      const response = await fetchItemById(id, accessToken);
      if (!response.ok) {
        setIsLoading(false);
        setError(true);
      } else {
        const details = await response.json();
        setObjectDetails(details);
        setIsLoading(false);
      }
    } else {
      const response = await fetchItemById(id);
      if (!response.ok) {
        setIsLoading(false);
        setError(true);
      } else {
        const details = await response.json();
        setObjectDetails(details);
        setIsLoading(false);
      }
    }
  }, [authState.isAuthenticated]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  if (error) {
    return <Redirect to="/not-found" />;
  }

  return (
    <section className="items__container padding">
      {isLoading && <Loader />}
      {!isLoading && (
        <article className="details">
          <ImageCarousel images={objectDetails.itemImages} />
          <div>
            <div className="details__title-container">
              <h2 className="details__title">{objectDetails.itemTitle}</h2>
              <LikeToggle />
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
            <div className="details__caption--posted">
              <FontAwesomeIcon icon={userIcon} className="details__caption-icon" />
              <Link to={`/users/${objectDetails.itemOwner.userId}`}>
                {`Posted by: ${objectDetails.itemOwner.userDisplayName}`}
              </Link>
            </div>
            <button className="primary__btn" onClick={handleButtonClick} type="button">Contact</button>
          </div>
        </article>
      )}
      {showModal && (
        <ContactModal ownerDetails={objectDetails.itemOwner} setShowModal={setShowModal} />
      )}
    </section>
  );
};

export default ItemDetails;
