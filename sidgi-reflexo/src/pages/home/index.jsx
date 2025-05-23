import Banner from "../../componants/banner";
import About from "../../componants/about";
import Prestation from "../../componants/prestation";
import Seocontent from "../../componants/seocontent";

import AboutData from "../../data/about/dehanjenny.json";
import PrestationData from "../../data/offres/offres.json";
import SeoContentData from "../../data/seocontent/content.json";
import Localisation from "../../componants/localisation";

import "../../styles/css/home/style.css";

function Home() {
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
      <section className="local-seo">
        <Localisation />
      </section>
    </div>
  );
}

export default Home;
