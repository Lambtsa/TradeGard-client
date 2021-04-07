import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { postItemToAPI } from '../modules/api-service';
import ImageSlot from '../components/ImageSlot/ImageSlot';
import SnackBar from '../components/SnackBar/SnackBar';
import Input from '../components/Input/Input';

const NewItem = () => {
  const { authState } = useOktaAuth();
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImages, setItemImages] = useState([]);
  const [itemCategory, setItemCategory] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  const onTitleChange = e => setItemTitle(e.target.value);
  const onDescriptionChange = e => setItemDescription(e.target.value);
  const onCategoryChange = e => setItemCategory(e.target.value);
  const onLocationChange = e => setItemLocation(e.target.value);

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
        itemLocation,
      },
    };
    try {
      const response = await postItemToAPI(newItem, accessToken);
      await response.json();
      window.scrollTo(0, 0);
      setIsValid(true);
      setItemTitle('');
      setItemDescription('');
      setItemImages([]);
      setItemCategory('');
      setItemLocation('');
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <section className="content__container padding">
      <h1 className="form__title">Post a new item</h1>
      <p className="form__subtitle">A few seconds away from sharing</p>
      <form className="form" onSubmit={handleFormSubmit}>
        <Input
          label="Item title"
          type="text"
          state={itemTitle}
          onChange={onTitleChange}
          placeholder="Enter title"
          required />
        <label className="form__label" htmlFor="description">
          Item Description
          <textarea className="form__input textarea" id="description" type="text" value={itemDescription} onChange={onDescriptionChange} placeholder="Enter description" required />
        </label>
        <div className="form__image--container">
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={itemTitle} slot="1" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={itemTitle} slot="2" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={itemTitle} slot="3" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={itemTitle} slot="4" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={itemTitle} slot="5" />
          <ImageSlot state={{ itemImages, setItemImages }} itemTitle={itemTitle} slot="6" />
        </div>
        <label className="form__label select" htmlFor="location">
          Item Location
          <select className="form__input select" id="location" value={itemLocation} onChange={onLocationChange} required>
            <option value="">Please select location</option>
            <option value="stockholm">Stockholm</option>
            <option value="göteborg">Göteborg</option>
            <option value="malmö">Malmö</option>
            <option value="uppsala">Uppsala</option>
            <option value="sollentuna">Sollentuna</option>
            <option value="västerås">Västerås</option>
            <option value="örebro">Örebro</option>
            <option value="linköping">Linköping</option>
            <option value="helsingborg">Helsingborg</option>
            <option value="jönköping">Jönköping</option>
            <option value="norrköping">Norrköping</option>
            <option value="lund">Lund</option>
          </select>
        </label>
        <label className="form__label select" htmlFor="category">
          Item Category
          <select className="form__input select" id="category" value={itemCategory} onChange={onCategoryChange} required>
            <option value="">Please select category</option>
            <option value="bicycles">Bicycles</option>
            <option value="books">Books</option>
            <option value="clothes">Clothes</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="garden">Garden</option>
            <option value="hobbies">Hobbies</option>
            <option value="music">Music</option>
            <option value="phones">Phones</option>
            <option value="services">Services</option>
            <option value="tools">Tools</option>
            <option value="vehicles">Vehicles</option>
          </select>
        </label>
        <button className="primary__btn" type="submit">Add item</button>
        {isValid && (
          <SnackBar
            state={isValid}
            setState={setIsValid}
            type="success"
            message="Congratulations! Your item has been posted." />
        )}
        {error && <SnackBar state={error} setState={setError} type="error" message="There was an issue, please try again." />}
      </form>
    </section>
  );
};

export default NewItem;
