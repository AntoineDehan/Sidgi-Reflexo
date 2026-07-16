import Button from "../ui/Button";
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
        <a href="#accueil" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-main">SIDGI</span>
          <span className="navbar__logo-sub">Réflexo</span>
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
