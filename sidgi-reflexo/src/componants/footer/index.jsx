import "../../styles/css/footer/style.css";

function Footer() {
  return (
    <footer className="footer-conteneur">
      <div className="form-contact-conteneur">
        <h2 id="contact" className="footer-title">
          Besoin de me contacter ?
        </h2>
        <form method="POST" className="contact-form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="email-input input"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className="message-input input"
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            Envoyer
          </button>
        </form>
      </div>
      <p>
        Crée avec React via Vite.js, code source disponnible sur {""}
        <a href="https://github.com/AntoineDehan/portfolio">Github</a>.
      </p>
    </footer>
  );
}

export default Footer;
