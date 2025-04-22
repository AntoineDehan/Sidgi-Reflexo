import Cta from "../cta";
import Slider from "../slider";
import SliderImages from "../../data/slider/images.json";

import "../../styles/css/banner/style.css";

function Banner() {
  return (
    <div className="banner-conteneur">
      <Slider images={SliderImages.sliderImages} />
      <div className="banner-content">
        <h1>Sidgi Réflexo</h1>
        <h2>Réflexologie Plantaire-Faciale-Palmaire</h2>
        <div className="overlay"></div>
        <Cta />
      </div>
    </div>
  );
}

export default Banner;
