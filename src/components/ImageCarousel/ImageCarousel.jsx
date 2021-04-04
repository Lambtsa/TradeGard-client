import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight as rightArrow,
  faArrowCircleLeft as leftArrow,
} from '@fortawesome/free-solid-svg-icons';

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleNextClick = () => {
    console.log(index);
    if (index < images.length - 1) {
      setIndex(index + 1);
      setCurrentImage(images[index + 1]);
    } else {
      setIndex(0);
      setCurrentImage(images[0]);
    }
  };
  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1);
      setCurrentImage(images[index - 1]);
    } else {
      setIndex(images.length - 1);
      setCurrentImage(images[images.length - 1]);
    }
  };

  return (
    <div className="carousel__container">
      {images.length > 1 && (
        <>
          <button type="button" onClick={handlePrevClick} className="carousel__btn--prev">
            <FontAwesomeIcon className="carousel__btn--icon" icon={leftArrow} />
          </button>
          <button type="button" onClick={handleNextClick} className="carousel__btn--next">
            <FontAwesomeIcon className="carousel__btn--icon" icon={rightArrow} />
          </button>
        </>
      )}
      <img src={currentImage} alt="Item" className="carousel__img" />
      <p className="carousel__number">{`${index + 1} / ${images.length}`}</p>
    </div>
  );
};

export default ImageCarousel;
