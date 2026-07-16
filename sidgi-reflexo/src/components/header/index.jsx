import Button from "../ui/Button";
import LogoImg from "../../assets/logo_header.webp";
import "../../styles/scss/header/style.scss";

const BOOKING_URL = "https://calendly.com/sidgi-reflexologie/plantaire";

const LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#offres", label: "Offres" },
  { href: "#reflexologie", label: "La Réflexologie" },
];

function Header({ isMenuOpen, setIsMenuOpen }) {
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <a href="#accueil" className="navbar__logo" onClick={closeMenu} aria-label="Sidgi Réflexo — accueil">
          <img
            src={LogoImg}
            alt="Logo Sidgi Réflexo"
            className="navbar__logo-img"
            width="295"
            height="178"
          />
        </a>

        <div className="navbar__desktop">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <Button variant="primary" href={BOOKING_URL} className="navbar__cta">
            Réserver
          </Button>
        </div>

        <button className="navbar__burger" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="navbar__mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={toggleMenu}>
              {l.label}
            </a>
          ))}
          <Button variant="primary" href={BOOKING_URL} onClick={toggleMenu}>
            Réserver
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
