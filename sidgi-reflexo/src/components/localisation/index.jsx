import SectionHeading from "../ui/SectionHeading";
import "../../styles/scss/localisation/style.scss";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478.0728637901503!2d-0.42309958415500243!3d45.01648000627674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4800279793234df9%3A0xf69f463373eb0a1f!2s17%20Bis%20Rue%20d'Artiguelongue%2C%2033240%20Val-de-Virv%C3%A9e!5e1!3m2!1sfr!2sfr!4v1740734619084!5m2!1sfr!2sfr";

function Localisation() {
  return (
    <section className="local" id="contact-infos">
      <div className="local__inner">
        <SectionHeading
          eyebrow="Infos pratiques"
          title="Sidgi Réflexo · Saint-André-de-Cubzac"
          center
        />
        <div className="local__grid">
          <div className="local__map">
            <iframe
              src={MAP_SRC}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation Google Maps de Sidgi Réflexo"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div
            className="local__info"
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <div className="local__row">
              <span className="local__label">Adresse</span>
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">17 Bis Rue d'Artiguelongue</span>,{" "}
                <span itemProp="postalCode">33240</span>{" "}
                <span itemProp="addressLocality">Val de Virvée</span>
              </span>
            </div>
            <div className="local__row">
              <span className="local__label">Téléphone</span>
              <span itemProp="telephone">07 85 84 11 51</span>
            </div>
            <div className="local__row">
              <span className="local__label">Horaires</span>
              <span itemProp="openingHours" content="Mo-Fr 10:00-19:00">
                Lundi – Vendredi · 10h – 19h
              </span>
            </div>
            <p className="local__note">
              Parking facile sur la place de l'église. Entrez dans la cour
              gravillonnée : je me situe au bout du chemin, au niveau du portail
              en bois.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Localisation;
