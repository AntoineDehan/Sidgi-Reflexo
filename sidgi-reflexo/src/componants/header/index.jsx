import { Link } from "react-router-dom";

import "../../styles/scss/header/style.scss";
import LogoImg from "../../assets/logo_header.webp";

function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar__logo">
          <img
            className="logo"
            src={LogoImg}
            alt="Logo sobre de l'entreprise Sidgi-Réflexo"
          />
        </div>
        <div className="navbar__nav">
          <button className="burger">XX</button>
          <div className="desktop">
            <a href="#accueil">Accueil</a>
            <a href="#offres">Offres</a>
            <a href="#reflexologie">La Rélexologie</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
