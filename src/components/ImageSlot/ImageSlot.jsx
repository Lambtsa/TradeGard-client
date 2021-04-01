import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';
import './ImageSlot.scss';

const ImageSlot = ({ itemTitle = '', setItemImages }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);

  const handleFileChange = e => {
    const url = 'https://api.cloudinary.com/v1_1/dk9je5ll6/upload';
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'trading-app');
    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.secure_url);
        setItemImages(prevState => [...prevState, data.secure_url]);
      })
      .catch(() => setError(true));
  };

  const handleDeleteClick = () => {
    setImageUrl('');
  };

  return (
    <>
      {imageUrl !== '' && (
        <div className="ImageSlot__container">
          <button className="btn__close" type="button" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={deleteIcon} className="icon__delete" />
          </button>
          <img className="ImageSlot__img" src={imageUrl} alt={itemTitle} />
        </div>
      )}
      {imageUrl === '' && (
        <div className="form__img--wrapper">
          <input className="form__img" type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
        </div>
      )}
      {error && <p className="error-message">There was an error in uploading your image</p>}
    </>
  );
};

export default ImageSlot;
