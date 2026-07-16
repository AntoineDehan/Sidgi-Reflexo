import { Mail, Smartphone } from "lucide-react";

import "../../../styles/scss/offres_popup/carte/style.scss";

function Carte() {
  return (
    <div className="carte-offre">
      <div className="main-content">
        <div className="main-content-left">
          <h2 className="main-content-text">
            Offrez un moment de détente et de reconnexion à vos proches.
          </h2>
          <p>
            Une séance de réflexologie plantaire est une belle manière de
            prendre soin de soi, relâcher les tensions et de retrouver équilibre
            et sérénité.
          </p>
          <p className="price">Disponnile au tarif de 45€</p>
        </div>

        <img
          className="main-content-img"
          src="/images/carte_cadeaux.webp"
          alt="Les cartes cadeaux Sidgi Reflexo présentées sur une table en bois dans un cadre de détente"
        />
      </div>

      <div className="modal-contact">
        <h3>Contactez-moi :</h3>
        <div className="item">
          <Mail color="#a8b5a2" size={24} />
          <a href="mailto:sidgi.reflexologie@outlook.fr">
            sidgi.reflexologie@outlook.fr
          </a>
        </div>
        <div className="item">
          <Smartphone color="#a8b5a2" size={24} />
          <p>07 85 84 11 51</p>
        </div>
      </div>
    </div>
  );
}

export default Carte;
