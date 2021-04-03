import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';
import './ImageSlot.scss';

const ImageSlot = props => {
  const {
    itemTitle = '',
    state,
    slot,
  } = props;
  const { itemImages, setItemImages } = state;
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(slot - 1);
    console.log(itemImages[slot - 1]);
  }, [imageUrl]);

  const addImageUrl = (array, url, imageNumber) => {
    if (array.length >= 6) {
      setItemImages(array.splice((imageNumber - 1), 1, url));
    } else {
      setItemImages(array.push(url));
    }
  };

  const handleFileChange = e => {
    const url = 'https://api.cloudinary.com/v1_1/dnxtp3xmi/upload';
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
        addImageUrl(itemImages, data.secure_url, slot - 1);
        setImageUrl(data.secure_url);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
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
