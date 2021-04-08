import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link, useHistory } from 'react-router-dom';
import LikeToggle from '../LikeToggle/LikeToggle';
import { updateItemLike } from '../../modules/api-service';
import SnackBar from '../SnackBar/SnackBar';

const ItemCard = ({ item, userLikes }) => {
  const history = useHistory();
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(item.itemCreationDateUTC).toLocaleDateString('en-uk', dateOptions);
  const { authState } = useOktaAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userLikes.includes(item._id)) {
      setIsLiked(true);
    }
  }, [userLikes]);

  const handleLikeToggle = () => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState.accessToken;
      if (isLiked) {
        updateItemLike(item._id, false, accessToken)
          .then(() => {
            setIsLiked(false);
            setError(false);
          })
          .catch(() => setError(true));
      } else {
        updateItemLike(item._id, true, accessToken)
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

  return (
    <>
      <li key={item._id} className="itemCard">
        <div className="itemCard__container">
          <Link className="itemCard__img" to={`/items/${item._id}`}>
            <img src={item.itemImages[0]} alt={item.itemTitle} className="itemCard__image" />
          </Link>
          <div className="itemCard__details">
            <div className="itemCard__primary">
              <Link to={`/items/${item._id}`}>
                <h3 className="itemCard__title">{item.itemTitle}</h3>
              </Link>
              <p className={`itemCard__subtitle category ${item.itemCategory}`}>{item.itemCategory}</p>
              <p className="itemCard__subtitle description">{item.itemDescription}</p>
            </div>
            <div className="itemCard__secondary">
              <p className="itemCard__subtitle date">
                {`${item.itemLocation} - ${formattedDate}`}
              </p>
              <LikeToggle isLiked={isLiked} handleLikeToggle={handleLikeToggle} />
            </div>
          </div>
        </div>
      </li>
      {error && <SnackBar type="error" state={error} setState={setError} message="There was an issue, please try again." />}
    </>
  );
};

export default ItemCard;
