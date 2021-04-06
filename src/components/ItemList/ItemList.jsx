import React, { useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';

const ItemList = ({ items, userLikes, caption }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
    setFilteredItems(items.filter(item => {
      const regex = new RegExp(e.target.value, 'mi');
      if (regex.test(item.itemTitle) || regex.test(item.itemDescription)) {
        return true;
      }
      return false;
    }));
  };

  return (
    <>
      <form className="padding__wrapper" onSubmit={e => e.preventDefault()}>
        <label className="form__label" htmlFor="search">
          Search
          <input
            id="search"
            className="form__input search"
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="What are you looking for?" />
        </label>
        <p className="search__caption">
          {`You are viewing ${filteredItems.length} ${filteredItems.length > 1 ? 'items' : 'item'}${searchValue ? ` for ${searchValue}` : ''}
          ${caption ? ' from ' : ''}`}
          <span>{caption}</span>
        </p>
      </form>
      <ul className="items__grid">
        {filteredItems.map(item => (
          <ItemCard
            key={item._id}
            item={item}
            userLikes={userLikes} />
        ))}
      </ul>
    </>
  );
};

export default ItemList;
