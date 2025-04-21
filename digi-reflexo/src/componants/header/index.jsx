import { Link } from "react-router-dom";

import "../../styles/css/header/style.css";

function Header() {
  return (
    <header>
      <img
        className="logo"
        src="/src/assets/logo_placeholder.webp"
        alt="Logo sobre de l'entreprise Digi-Réflexo"
      />
      <nav>
        <Link>Accueil</Link>
        <Link>Offres</Link>
        <Link>La Rélexologie</Link>
      </nav>
    </header>
  );
}

export default Header;
