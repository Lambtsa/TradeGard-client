import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link, useHistory } from 'react-router-dom';
import LikeToggle from '../LikeToggle/LikeToggle';
import { updateItemLike } from '../../modules/api-service';

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

  useEffect(() => {
    if (userLikes.includes(item._id)) {
      setIsLiked(true);
    }
  }, [userLikes]);

  const handleLikeToggle = () => {
    console.log('clicked');
    if (authState.isAuthenticated) {
      console.log('auth');
      const { accessToken } = authState.accessToken;
      if (isLiked) {
        updateItemLike(item._id, false, accessToken)
          .then(() => setIsLiked(false));
      } else {
        updateItemLike(item._id, true, accessToken)
          .then(() => setIsLiked(true));
      }
    } else {
      console.log('not auth');
      history.push('/login');
    }
  };

  return (
    <li key={item._id} className="itemCard">
      <Link className="itemCard__container" to={`/items/${item._id}`}>
        <img src={item.itemImages[0]} alt={item.itemTitle} className="itemCard__image" />
        <div className="itemCard__details">
          <div className="itemCard__primary">
            <h3 className="itemCard__title">{item.itemTitle}</h3>
            <p className="itemCard__subtitle category">{item.itemCategory}</p>
            <p className="itemCard__subtitle description">{item.itemDescription}</p>
          </div>
          <div className="itemCard__secondary">
            <p className="itemCard__subtitle date">
              {`${item.itemCategory} - ${formattedDate}`}
            </p>
            <LikeToggle isLiked={isLiked} handleLikeToggle={handleLikeToggle} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ItemCard;
