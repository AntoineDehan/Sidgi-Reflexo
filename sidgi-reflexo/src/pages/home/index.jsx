import Banner from "../../componants/banner";
import About from "../../componants/about";
import Prestation from "../../componants/prestation";
import Seocontent from "../../componants/seocontent";

import AboutData from "../../data/about/dehanjenny.json";
import PrestationData from "../../data/offres/offres.json";
import SeoContentData from "../../data/seocontent/content.json";

import "../../styles/css/home/style.css";

function Home() {
  return (
    <div className="main-conteneur">
      <Banner />
      <section className="about-me">
        <About data={AboutData} />
      </section>
      <div className="test">
        <section className="prestation">
          <h1>Mes préstations</h1>
          <Prestation data={PrestationData} />
        </section>
      </div>
      <section className="seo-content">
        <Seocontent data={SeoContentData} />
      </section>
    </div>
  );
}

export default Home;
