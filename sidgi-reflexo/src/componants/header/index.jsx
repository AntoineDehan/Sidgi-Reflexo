import { Link } from "react-router-dom";

import "../../styles/scss/header/style.scss";

function Header() {
  return (
    <header>
      <img
        className="logo"
        src="/src/assets/logo_header.webp"
        alt="Logo sobre de l'entreprise Digi-Réflexo"
      />
      <nav>
        <a href="#accueil">Accueil</a>
        <a href="#offres">Offres</a>
        <a href="#reflexologie">La Rélexologie</a>
      </nav>
    </header>
  );
}

export default Header;
