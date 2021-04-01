import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { postItemToAPI } from '../modules/api-service';
import ImageSlot from '../components/ImageSlot/ImageSlot';

const NewItem = () => {
  const { authState } = useOktaAuth();
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImages, setItemImages] = useState([]);
  const [itemCategory, setItemCategory] = useState('');
  const [message, setMessage] = useState('');

  const onTitleChange = e => setItemTitle(e.target.value);
  const onDescriptionChange = e => setItemDescription(e.target.value);
  const onCategoryChange = e => setItemCategory(e.target.value);

  const handleFormSubmit = async e => {
    // validate inputs and output potential issues
    e.preventDefault();
    const { accessToken } = authState.accessToken;
    const newItem = {
      item: {
        itemTitle,
        itemDescription,
        itemImages,
        itemCategory,
      },
    };
    try {
      const response = await postItemToAPI(newItem, accessToken);
      const data = await response.json();
      console.log(data);
      setItemTitle('');
      setItemDescription('');
      setItemImages([]);
      setItemCategory('');
      setMessage('Your Item has been added');
    } catch (err) {
      /* better error handling */
      console.log(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form__label" htmlFor="title">
          Item Title:
          <input className="form__input" id="title" type="text" value={itemTitle} onChange={onTitleChange} placeholder="Enter title" required />
        </label>
        <label className="form__label" htmlFor="description">
          Item Description:
          <input className="form__input" id="description" type="text" value={itemDescription} onChange={onDescriptionChange} placeholder="Enter description" required />
        </label>
        <ImageSlot setItemImages={setItemImages} itemTitle={itemTitle} />
        <label className="form__label" htmlFor="category">
          Item Category:
          <select className="form__input" id="category" value={itemCategory} onChange={onCategoryChange} required>
            <option value="">Please select category</option>
            <option value="furniture">Furniture</option>
            <option value="clothes">Clothes</option>
            <option value="books">Books</option>
          </select>
        </label>
        <button className="form__btn" type="submit">Add item</button>
        {message !== '' && <p className="snack-message">{message}</p>}
      </form>
    </>
  );
};

export default NewItem;
