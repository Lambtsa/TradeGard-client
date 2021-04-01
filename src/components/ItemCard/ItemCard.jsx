import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons';

const ItemCard = ({ item }) => (
  <li key={item._id} className="ItemCard">
    <Link to={`/items/${item._id}`}>
      <img src={item.itemImages[0]} alt={item.itemTitle} className="ItemCard__image" />
      <div className="ItemCard__details">
        <h3 className="ItemCard__title">{item.itemTitle}</h3>
        <p className="ItemCard__category">{item.itemCategory}</p>
        <p className="ItemCard__description">{item.itemDescription}</p>
      </div>
    </Link>
    <FontAwesomeIcon icon={outlineHeart} className="icon__heart--outline" />
  </li>
);

export default ItemCard;
