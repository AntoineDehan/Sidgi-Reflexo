import { Link } from "react-router-dom";

import "../../styles/scss/header/style.scss";
import LogoImg from "../../assets/logo_header.webp";

function Header() {
  return (
    <header>
      <img
        className="logo"
        src={LogoImg}
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
