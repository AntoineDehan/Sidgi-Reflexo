import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import "../../styles/scss/hero/style.scss";

const HERO_IMG = "/images/about.webp";
const BOOKING_URL = "https://calendly.com/sidgi-reflexologie/plantaire";

function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero__inner">
        <div className="hero__content">
          <Eyebrow className="hero__eyebrow">
            Réflexologie plantaire &amp; palmaire · Saint-André-de-Cubzac
          </Eyebrow>
          <h1 className="hero__title">
            Prenez soin de vous,
            <br />
            du bout des doigts.
          </h1>
          <p className="hero__subtitle">
            Un cocon dédié au bien-être, où chaque séance invite au lâcher-prise
            et rééquilibre le corps en douceur.
          </p>
          <div className="hero__actions">
            <Button variant="primary" href={BOOKING_URL}>
              Réserver une séance
            </Button>
            <Button variant="secondary" href="#offres">
              Découvrir les offres
            </Button>
          </div>
        </div>
        <div className="hero__image">
          <img
            src={HERO_IMG}
            alt="Séance de réflexologie plantaire dans un cadre apaisant"
            width="1200"
            height="1200"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
