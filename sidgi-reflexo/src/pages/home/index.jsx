import { useState, useEffect } from "react";

import Hero from "../../components/hero";
import About from "../../components/about";
import Prestation from "../../components/prestation";
import Seocontent from "../../components/seocontent";
import Localisation from "../../components/localisation";
import Modal from "../../components/modal";
import Carte from "../../components/offres_popup/carte";

import AboutData from "../../data/about/dehanjenny.json";
import PrestationData from "../../data/offres/offres.json";
import SeoContentData from "../../data/seocontent/content.json";

import "../../styles/scss/home/style.scss";

function Home({ isMenuOpen, setIsMenuOpen }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("offer-popup-shown")) {
      const timer = setTimeout(() => {
        setPopupOpen(true);
        sessionStorage.setItem("offer-popup-shown", "true");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="home">
      {isMenuOpen && (
        <div className="home__overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      <Hero />
      <About data={AboutData} />
      <Prestation data={PrestationData} />
      <Seocontent data={SeoContentData} />
      <Localisation />

      <Modal
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        title="🎁 Les cartes cadeaux sont arrivées ! 🎁"
      >
        <Carte />
      </Modal>
    </main>
  );
}

export default Home;
