import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import './ItemCard.scss';
import LikeToggle from '../LikeToggle/LikeToggle';
import { updateItemLike } from '../../modules/api-service';

const ItemCard = ({ item, likedOnRender }) => {
  const { authState } = useOktaAuth();
  const [isLiked, setIsLiked] = useState(likedOnRender);

  const handleLikeToggle = () => {
    const { accessToken } = authState.accessToken;

    // send like to server
    if (isLiked) {
      updateItemLike(item._id, false, accessToken)
        .then(() => setIsLiked(false));
    } else {
      updateItemLike(item._id, true, accessToken)
        .then(() => setIsLiked(true));
    }
  };

  return (
    <li key={item._id} className="ItemCard">
      <Link className="ItemCard__container" to={`/items/${item._id}`}>
        <img src={item.itemImages[0]} alt={item.itemTitle} className="ItemCard__image" />
        <div className="ItemCard__details">
          <h3 className="ItemCard__title">{item.itemTitle}</h3>
          <p className="ItemCard__category">{item.itemCategory}</p>
        </div>
      </Link>
      <LikeToggle isLiked={isLiked} handleLikeToggle={handleLikeToggle} />
    </li>
  );
};

export default ItemCard;
