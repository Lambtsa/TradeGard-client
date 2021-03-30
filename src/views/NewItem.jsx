import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import './NewItem.scss';
import { postItemToAPI } from '../modules/api-service';

const NewItem = () => {
  const { authState } = useOktaAuth();
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImages, setItemImages] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const onTitleChange = e => setItemTitle(e.target.value);
  const onDescriptionChange = e => setItemDescription(e.target.value);
  const onImageChange = e => setItemImages(e.target.value);
  const onCategoryChange = e => setItemCategory(e.target.value);

  const handleFormSubmit = async e => {
    // validate inputs and output potential issues
    e.preventDefault();
    const { accessToken } = authState;
    console.log(accessToken);
    const newItem = {
      item: {
        itemTitle,
        itemDescription,
        itemImages: [itemImages],
        itemCategory,
      },
    };
    try {
      const response = await postItemToAPI(newItem, accessToken);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      /* better error handling */
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">
        Item Title:
        <input id="title" type="text" value={itemTitle} onChange={onTitleChange} placeholder="Enter title" required />
      </label>
      <label htmlFor="description">
        Item Description:
        <input id="description" type="text" value={itemDescription} onChange={onDescriptionChange} placeholder="Enter description" required />
      </label>
      <label htmlFor="images">
        Item Images:
        <input id="images" type="text" value={itemImages} onChange={onImageChange} placeholder="Enter image url" required />
      </label>
      <label htmlFor="category">
        Item Category:
        <select id="category" value={itemCategory} onChange={onCategoryChange} required>
          <option value="">Please select category</option>
          <option value="furniture">Furniture</option>
          <option value="clothes">Clothes</option>
          <option value="books">Books</option>
        </select>
      </label>
      <button type="submit">Add item</button>
    </form>
  );
};

export default NewItem;