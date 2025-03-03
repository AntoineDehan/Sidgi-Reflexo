function Localisation() {
  return (
    <div className="localisation-conteneur">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478.0728637901503!2d-0.42309958415500243!3d45.01648000627674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4800279793234df9%3A0xf69f463373eb0a1f!2s17%20Bis%20Rue%20d&#39;Artiguelongue%2C%2033240%20Val-de-Virv%C3%A9e!5e1!3m2!1sfr!2sfr!4v1740734619084!5m2!1sfr!2sfr"
        width="400"
        height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="localisation-content"></div>
    </div>
  );
}

export default Localisation;
