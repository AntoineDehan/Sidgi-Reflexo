import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../../styles/scss/header/style.scss";
import LogoImg from "../../assets/logo_header.webp";

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsMenuOpen((prev) => !prev);
  };
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
          <button className="burger" onClick={toggleMenu} aria-label="Menu">
            {isOpen ? "✕" : "☰"}
          </button>

          <div className="desktop">
            <a href="#accueil">Accueil</a>
            <a href="#offres">Offres</a>
            <a href="#reflexologie">La Réflexologie</a>
          </div>

          {isOpen && (
            <div className="mobile-menu">
              <a href="#accueil" onClick={toggleMenu}>
                Accueil
              </a>
              <a href="#offres" onClick={toggleMenu}>
                Offres
              </a>
              <a href="#reflexologie" onClick={toggleMenu}>
                La Réflexologie
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
