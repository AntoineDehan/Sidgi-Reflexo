import "../../styles/scss/localisation/style.scss";

function Localisation() {
  return (
    <div className="localisation-conteneur">
      <div className="localisation-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478.0728637901503!2d-0.42309958415500243!3d45.01648000627674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4800279793234df9%3A0xf69f463373eb0a1f!2s17%20Bis%20Rue%20d&#39;Artiguelongue%2C%2033240%20Val-de-Virv%C3%A9e!5e1!3m2!1sfr!2sfr!4v1740734619084!5m2!1sfr!2sfr"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="localisation-content">
        <div className="content-info" itemProp="name">
          <h2>Sidgi Réflexo - Réflexologue Saint-André-de-Cubzac</h2>
          <p
            itemProp="address"
            itemscope
            itemtype="https://schema.org/PostalAddress"
          >
            <span className="bold-text">Adresse: </span>
            <span itemProp="streetAddress">17 Bis Rue d'Artiguelongue</span>
            <span itemProp="postalCode"> 33240</span>
            <span itemProp="addressLocality"> Val de Virvée</span>
          </p>
          <p>
            <span className="bold-text">Numéro de téléphone: </span>
            <span itemProp="telephone">07 85 84 11 51</span>
          </p>
          <p>
            <span class="bold-text">Horaires: </span>
            <span itemProp="openingHours" content="Mo-Fr 10:00-19:00"></span>
            lundi - vendredi 10h - 19h
          </p>
        </div>
        <div className="content-description" itemProp="description">
          <p>
            Pour accèder a votre futur séance de réflexologie à Val de Virvée
            vous pouvez vous garer facilement sur le parking de l'église.
            Rentrez dans la cours gravillonnée et je me situe au bout du chemin,
            au niveau du portail en bois.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Localisation;
