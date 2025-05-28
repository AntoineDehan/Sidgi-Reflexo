import { useState, useEffect } from "react";

import Banner from "../../componants/banner";
import About from "../../componants/about";
import Prestation from "../../componants/prestation";
import Seocontent from "../../componants/seocontent";
import Modal from "../../componants/modal";

import AboutData from "../../data/about/dehanjenny.json";
import PrestationData from "../../data/offres/offres.json";
import SeoContentData from "../../data/seocontent/content.json";
import Localisation from "../../componants/localisation";

import "../../styles/scss/home/style.scss";

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="main-conteneur">
      <section className="about-me" id="accueil">
        <About data={AboutData} />
      </section>
      <div className="divider"></div>
      <div className="conteneur" id="offres">
        <section className="prestation">
          <h1>Mes préstations</h1>
          <Prestation data={PrestationData} />
        </section>
      </div>
      <div className="divider"></div>
      <section className="seo-content" id="reflexologie">
        <Seocontent data={SeoContentData} />
      </section>
      <div className="divider"></div>
      <div className="conteneur">
        <section className="local-seo">
          <Localisation />
        </section>
      </div>
      <Modal isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
        <Prestation data={PrestationData}></Prestation>
      </Modal>
    </div>
  );
}

export default Home;
