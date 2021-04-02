import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.scss';
import LikeToggle from '../LikeToggle/LikeToggle';

const ItemCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);

  useEffect(() => {
    console.log(isLiked);
  }, [isLiked]);

  const handleLikeToggle = () => {
    // send like to server
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
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
