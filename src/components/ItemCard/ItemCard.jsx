import React from 'react';
import './ItemCard.scss';

const ItemCard = ({ item }) => (
  <li key={item._id} className="ItemCard">
    <img src={item.itemImages[0]} alt={item.itemTitle} className="ItemCard__image" />
    <div className="ItemCard__details">
      <h3 className="ItemCard__title">{item.itemTitle}</h3>
      <p className="ItemCard__description">{item.itemDescription}</p>
    </div>
  </li>
);

export default ItemCard;
