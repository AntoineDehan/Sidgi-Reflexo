import { useState, useEffect } from "react";

import arrowLeft from "../../assets/arrow_left.png";
import arrowRight from "../../assets/arrow_right.png";

import "../../styles/css/slider/style.css";

function Slider({ images, interval = 3000 }) {
  const [slideNumber, setSlideNumber] = useState(0); //Slide actuelle

  const sliderLeft = () => {
    setSlideNumber((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const sliderRight = () => {
    setSlideNumber((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const autoSlide = setInterval(sliderRight, interval);

    return () => clearInterval(autoSlide); // Nettoyage lors du démontage
  }, [slideNumber, interval]);

  return (
    <div className="slideshow">
      <img
        className="slideshow__img"
        src={images[slideNumber].url}
        alt={images[slideNumber].alt}
      />

      {images.length > 1 && (
        <>
          <div className="slideshow__arrow">
            <img
              className="gauche"
              src={arrowLeft}
              alt="Flèche de gauche"
              onClick={sliderLeft}
            />
            <img
              className="droite"
              src={arrowRight}
              alt="Flèche de droite"
              onClick={sliderRight}
            />
          </div>
          <p className="slideshow__counter">
            {slideNumber + 1}/{images.length}
          </p>
        </>
      )}
    </div>
  );
}

export default Slider;
