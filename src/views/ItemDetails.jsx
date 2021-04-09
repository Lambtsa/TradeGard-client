import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {
  useParams,
  Redirect,
  Link,
  useHistory,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt as mapMarker,
  faClock as clock,
  faUserCircle as userIcon,
} from '@fortawesome/free-solid-svg-icons';
import { fetchItemById, updateItemLike } from '../modules/api-service';
import ContactModal from '../components/ContactModal/ContactModal';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import LikeToggle from '../components/LikeToggle/LikeToggle';
import Loader from '../components/Loader/Loader';
import SnackBar from '../components/SnackBar/SnackBar';

const ItemDetails = () => {
  const history = useHistory();
  const { authState } = useOktaAuth();
  const { id } = useParams();
  const [objectDetails, setObjectDetails] = useState({});
  const [owner, setOwner] = useState({});
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLikes, setUserLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userLikes.includes(id)) {
      setIsLiked(true);
    }
  }, [userLikes]);

  useEffect(async () => {
    if (authState.accessToken) {
      const { accessToken } = authState.accessToken;
      const response = await fetchItemById(id, accessToken);
      if (!response.ok) {
        setIsLoading(false);
        setError(true);
      } else {
        const data = await response.json();
        setObjectDetails(data.item);
        setOwner(data.itemOwner);
        setUserLikes(data.userLikedItems);
        setIsLoading(false);
      }
    } else {
      const response = await fetchItemById(id);
      if (!response.ok) {
        setIsLoading(false);
        setError(true);
      } else {
        const data = await response.json();
        setObjectDetails(data.item);
        setOwner(data.itemOwner);
        setIsLoading(false);
      }
    }
  }, [authState.isAuthenticated]);

  const handleLikeToggle = () => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState.accessToken;
      if (isLiked) {
        updateItemLike(id, false, accessToken)
          .then(() => {
            setIsLiked(false);
            setError(false);
          })
          .catch(() => setError(true));
      } else {
        updateItemLike(id, true, accessToken)
          .then(() => {
            setIsLiked(true);
            setError(false);
          })
          .catch(() => setError(true));
      }
    } else {
      history.push('/login');
    }
  };

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
              <LikeToggle isLiked={isLiked} handleLikeToggle={handleLikeToggle} />
            </div>
            <div className="details__caption">
              <FontAwesomeIcon icon={mapMarker} className="details__caption-icon" />
              <p>{objectDetails.itemLocation}</p>
            </div>
            <div className="details__caption">
              <FontAwesomeIcon icon={clock} className="details__caption-icon" />
              <p>{new Date(objectDetails.itemCreationDateUTC).toLocaleString()}</p>
            </div>
            <p className="details__description">{objectDetails.itemDescription}</p>
            <div className="details__caption--posted">
              <FontAwesomeIcon icon={userIcon} className="details__caption-icon" />
              <Link to={`/users/${owner.userId}`}>
                {`Posted by: ${owner.userDisplayName}`}
              </Link>
            </div>
            <button className="primary__btn" onClick={handleButtonClick} type="button">Contact</button>
          </div>
        </article>
      )}
      {showModal && (
        <ContactModal ownerDetails={owner} setShowModal={setShowModal} />
      )}
      {error && <SnackBar state={error} setState={setError} type="error" message="There was an issue, please try again." />}
    </section>
  );
};

export default ItemDetails;
