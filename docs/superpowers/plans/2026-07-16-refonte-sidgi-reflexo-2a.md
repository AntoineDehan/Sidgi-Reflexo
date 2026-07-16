# Refonte Sidgi Réflexo (piste 2a) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre le site one-page Sidgi Réflexo selon la piste 2a du document Claude Design, en composants React réutilisables, sans changer le contrat de données ni casser les liens.

**Architecture:** Un fichier de tokens SCSS (`_tokens.scss`) + un stylesheet global capturent l'identité 2a. Trois primitives de design system (`Button`, `Eyebrow`, `SectionHeading`) sont réutilisées par des composants de section restylés (`Header`, `Hero`, `About`, `Prestation`/`PrestaCard`, `Seocontent`, `Localisation`, `Footer`, `Modal`, `Carte`). `Home` recompose les sections dans l'ordre du design ; `App` (main.jsx) garde `Header`/`Footer` globaux et `react-router-dom`.

**Tech Stack:** Vite, React 19, SCSS (sass ^1.89, syntaxe `@use`), lucide-react, react-router-dom.

## Global Constraints

- Toutes les commandes npm s'exécutent depuis `sidgi-reflexo/` (le projet est dans ce sous-dossier ; la racine git est un niveau au-dessus).
- Pas de framework de test dans le projet — la vérification par tâche est `npm run build` + `npm run lint` (aucun test unitaire à inventer). Vérification visuelle réelle sur les tâches finales.
- Contrat de données inchangé : mêmes fichiers JSON, mêmes clés (`titre`, `content`, `image`, `prix`, `url`, `id`).
- Liens à préserver, valeurs exactes :
  - Réservation plantaire : `https://calendly.com/sidgi-reflexologie/plantaire`
  - Email : `sidgi.reflexologie@outlook.fr`
  - Facebook : `https://www.facebook.com/people/Sidgi-R%C3%A9flexo/61574991002487/`
  - Instagram : `http://www.instagram.com/sidgi.reflexo`
  - Téléphone : `07 85 84 11 51` · Adresse : `17 Bis Rue d'Artiguelongue, 33240 Val de Virvée` · Horaires : `Lundi – Vendredi · 10h – 19h`
- Palette (tokens) : sauge `#9fb088`, vert profond `#45562f`, vert moyen `#5a684a`, vert accent `#869a6d`, crème `#f6f5ef`, crème carte `#f3f2ec`, fond page `#e6e5dd`, fond réflexo `#e7ecdd`, sable `#d8caa6` (texte `#4a3f28`), crème claire `#eef0e5`.
- Polices : Cormorant Garamond (titres), Archivo (labels/eyebrow), Mulish (corps).
- Import SCSS des tokens dans chaque composant : `@use "../_tokens" as *;` (depuis `src/styles/scss/<comp>/style.scss`).
- Chaque tâche se termine par un commit. Branche de travail : `refonte`.

---

### Task 1: Fondations — polices, tokens, styles globaux

**Files:**
- Modify: `sidgi-reflexo/index.html` (balises `<link>` Google Fonts + preload)
- Create: `sidgi-reflexo/src/styles/scss/_tokens.scss`
- Create: `sidgi-reflexo/src/styles/scss/global.scss`
- Modify: `sidgi-reflexo/src/main.jsx` (import du global)

**Interfaces:**
- Produces: variables SCSS `$sage, $green-deep, $green-mid, $green-accent, $cream, $cream-card, $bg-page, $bg-reflexo, $sand, $sand-text, $cream-light`, `$font-serif, $font-label, $font-body`, `$radius-pill, $radius-card, $radius-lg`, `$shadow-frame, $shadow-card, $shadow-img`, `$bp-tablet: 900px`, `$bp-mobile: 768px`. Mixin `@mixin eyebrow`.

- [ ] **Step 1: Remplacer les polices dans `index.html`**

Remplacer les deux blocs `<link href="https://fonts.googleapis.com/css2?family=Dancing+Script...">` et `...EB+Garamond...` par un seul :

```html
<link
  href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Mulish:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Et changer la ligne de preload pour l'image LCP (hero) :

```html
<link rel="preload" as="image" href="/images/about.webp" />
```

- [ ] **Step 2: Créer `src/styles/scss/_tokens.scss`**

```scss
// Design system tokens — Sidgi Réflexo (piste 2a)
$sage: #9fb088;
$green-deep: #45562f;
$green-mid: #5a684a;
$green-accent: #869a6d;
$cream: #f6f5ef;
$cream-card: #f3f2ec;
$cream-light: #eef0e5;
$bg-page: #e6e5dd;
$bg-reflexo: #e7ecdd;
$sand: #d8caa6;
$sand-text: #4a3f28;

$font-serif: "Cormorant Garamond", serif;
$font-label: "Archivo", sans-serif;
$font-body: "Mulish", sans-serif;

$radius-pill: 999px;
$radius-card: 18px;
$radius-lg: 22px;

$shadow-frame: 0 40px 90px rgba(50, 60, 35, 0.22);
$shadow-card: 0 16px 42px rgba(50, 60, 35, 0.1);
$shadow-img: 0 26px 54px rgba(40, 50, 30, 0.32);
$shadow-portrait: 0 16px 40px rgba(50, 60, 35, 0.18);

$bp-tablet: 900px;
$bp-mobile: 768px;

@mixin eyebrow {
  font-family: $font-label;
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: $green-accent;
}
```

- [ ] **Step 3: Créer `src/styles/scss/global.scss`**

```scss
@use "./tokens" as *;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: $bg-page;
  font-family: $font-body;
  color: $green-deep;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: $green-deep;
  text-decoration: none;
  transition: color 0.2s ease, opacity 0.2s ease;
}
```

- [ ] **Step 4: Importer le global dans `main.jsx`**

Ajouter en haut de `src/main.jsx`, après les imports de composants :

```jsx
import "./styles/scss/global.scss";
```

- [ ] **Step 5: Vérifier le build**

Run (depuis `sidgi-reflexo/`): `npm run build`
Expected: build réussi, aucune erreur SCSS.

- [ ] **Step 6: Commit**

```bash
git add sidgi-reflexo/index.html sidgi-reflexo/src/styles/scss/_tokens.scss sidgi-reflexo/src/styles/scss/global.scss sidgi-reflexo/src/main.jsx
git commit -m "feat(refonte): fondations polices, tokens et styles globaux"
```

---

### Task 2: Primitives design system — Button, Eyebrow, SectionHeading

**Files:**
- Create: `sidgi-reflexo/src/components/ui/Button/index.jsx`
- Create: `sidgi-reflexo/src/components/ui/Button/style.scss`
- Create: `sidgi-reflexo/src/components/ui/Eyebrow/index.jsx`
- Create: `sidgi-reflexo/src/components/ui/SectionHeading/index.jsx`
- Create: `sidgi-reflexo/src/components/ui/SectionHeading/style.scss`

**Interfaces:**
- Produces:
  - `<Button variant href children />` — `variant` ∈ `primary | secondary | sage | outline`, rend un `<a>` pill.
  - `<Eyebrow children />` — rend un `<span class="eyebrow">`.
  - `<SectionHeading eyebrow title center />` — rend `Eyebrow` + `<h3>` serif ; `center` (bool) centre le bloc.
- Note chemins SCSS : ces composants sont sous `src/components/ui/<Comp>/`, donc le token import devient `@use "../../../styles/scss/tokens" as *;`.

- [ ] **Step 1: Créer `Button/index.jsx`**

```jsx
import "./style.scss";

function Button({ variant = "primary", href = "#", children, className = "", ...rest }) {
  return (
    <a href={href} className={`ui-btn ui-btn--${variant} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export default Button;
```

- [ ] **Step 2: Créer `Button/style.scss`**

```scss
@use "../../../styles/scss/tokens" as *;

.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-body;
  font-weight: 600;
  font-size: 15px;
  padding: 15px 30px;
  border-radius: $radius-pill;
  cursor: pointer;
  line-height: 1;
  white-space: nowrap;

  &--primary {
    background: $cream;
    color: $green-deep;
    &:hover { opacity: 0.9; color: $green-deep; }
  }
  &--secondary {
    border: 1.5px solid $cream;
    color: $cream;
    &:hover { background: rgba(246, 245, 239, 0.12); color: $cream; }
  }
  &--sage {
    background: $sage;
    color: $cream;
    padding: 11px 22px;
    font-size: 14px;
    &:hover { background: $green-accent; color: $cream; }
  }
  &--outline {
    border: 1.5px solid $sage;
    color: $green-deep;
    padding: 10px 20px;
    font-size: 14px;
    &:hover { background: $bg-reflexo; color: $green-deep; }
  }
}
```

- [ ] **Step 3: Créer `Eyebrow/index.jsx`** (SCSS partagé via classe globale `eyebrow` définie ici)

```jsx
import "./style.scss";

function Eyebrow({ children, className = "" }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export default Eyebrow;
```

Créer aussi `sidgi-reflexo/src/components/ui/Eyebrow/style.scss` :

```scss
@use "../../../styles/scss/tokens" as *;

.eyebrow {
  @include eyebrow;
  display: block;
}
```

- [ ] **Step 4: Créer `SectionHeading/index.jsx`**

```jsx
import Eyebrow from "../Eyebrow";
import "./style.scss";

function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <div className={`section-heading ${center ? "section-heading--center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h3 className="section-heading__title">{title}</h3>
    </div>
  );
}

export default SectionHeading;
```

- [ ] **Step 5: Créer `SectionHeading/style.scss`**

```scss
@use "../../../styles/scss/tokens" as *;

.section-heading {
  &--center { text-align: center; }

  .eyebrow { margin-bottom: 12px; }

  &__title {
    font-family: $font-serif;
    font-weight: 600;
    font-size: 44px;
    line-height: 1.04;
    margin: 0;
    color: $green-deep;
  }
}
```

- [ ] **Step 6: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 7: Commit**

```bash
git add sidgi-reflexo/src/components/ui
git commit -m "feat(refonte): primitives design system (Button, Eyebrow, SectionHeading)"
```

---

### Task 3: Header restylé

**Files:**
- Modify: `sidgi-reflexo/src/components/header/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/header/style.scss`

**Interfaces:**
- Consumes: `Button` (Task 2). Props inchangées : `{ isMenuOpen, setIsMenuOpen }`.
- Constante partagée à définir : `BOOKING_URL = "https://calendly.com/sidgi-reflexologie/plantaire"`.

- [ ] **Step 1: Réécrire `header/index.jsx`**

```jsx
import { useState } from "react";
import Button from "../ui/Button";
import "../../styles/scss/header/style.scss";

const BOOKING_URL = "https://calendly.com/sidgi-reflexologie/plantaire";

const LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#offres", label: "Offres" },
  { href: "#reflexologie", label: "La Réflexologie" },
];

function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {isOpen && (
        <div className="navbar__mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={toggleMenu}>
              {l.label}
            </a>
          ))}
          <Button variant="sage" href={BOOKING_URL} onClick={toggleMenu}>
            Réserver
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
```

- [ ] **Step 2: Réécrire `styles/scss/header/style.scss`**

```scss
@use "../_tokens" as *;

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: $sage;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 46px;
  max-width: 1280px;
  margin: 0 auto;

  &__logo {
    display: flex;
    flex-direction: column;
    line-height: 0.86;

    &-main {
      font-family: $font-label;
      font-weight: 600;
      letter-spacing: 0.16em;
      font-size: 23px;
      color: $cream;
    }
    &-sub {
      font-family: $font-serif;
      font-style: italic;
      font-size: 20px;
      color: $cream-light;
      margin-top: 3px;
    }
  }

  &__desktop {
    display: flex;
    align-items: center;
    gap: 30px;
    font-size: 15px;
    font-weight: 600;

    a { color: $cream; }
    a:hover { color: $cream-light; }
    .navbar__cta { color: $green-deep; }
  }

  &__burger {
    display: none;
    background: none;
    border: none;
    color: $cream;
    font-size: 26px;
    cursor: pointer;
  }

  &__mobile {
    display: none;
  }
}

@media (max-width: $bp-mobile) {
  .navbar {
    padding: 16px 24px;

    &__desktop { display: none; }
    &__burger { display: block; }
    &__mobile {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 20px 24px 26px;
      background: $sage;

      a { color: $cream; font-weight: 600; font-size: 17px; }
    }
  }
}
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add sidgi-reflexo/src/components/header sidgi-reflexo/src/styles/scss/header/style.scss
git commit -m "feat(refonte): header sauge restylé avec nav et CTA"
```

---

### Task 4: Hero (nouveau composant)

**Files:**
- Create: `sidgi-reflexo/src/components/hero/index.jsx`
- Create: `sidgi-reflexo/src/styles/scss/hero/style.scss`

**Interfaces:**
- Consumes: `Button`, `Eyebrow` (Task 2).
- Produces: `<Hero />` — aucun prop (contenu statique du design). Rend une `<section className="hero" id="accueil">`.

- [ ] **Step 1: Créer `hero/index.jsx`**

```jsx
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import HeroImg from "/images/about.webp";
import "../../styles/scss/hero/style.scss";

const BOOKING_URL = "https://calendly.com/sidgi-reflexologie/plantaire";

function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero__inner">
        <div className="hero__content">
          <Eyebrow className="hero__eyebrow">
            Réflexologie plantaire &amp; palmaire · Saint-André-de-Cubzac
          </Eyebrow>
          <h1 className="hero__title">
            Prenez soin de vous,
            <br />
            du bout des doigts.
          </h1>
          <p className="hero__subtitle">
            Un cocon dédié au bien-être, où chaque séance invite au lâcher-prise
            et rééquilibre le corps en douceur.
          </p>
          <div className="hero__actions">
            <Button variant="primary" href={BOOKING_URL}>
              Réserver une séance
            </Button>
            <Button variant="secondary" href="#offres">
              Découvrir les offres
            </Button>
          </div>
        </div>
        <div className="hero__image">
          <img src={HeroImg} alt="Séance de réflexologie plantaire dans un cadre apaisant" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
```

Note : l'import `import HeroImg from "/images/about.webp"` cible le dossier `public`. Vérifier que l'asset existe bien dans `public/images/`. En cas d'échec de résolution avec Vite, remplacer par `const HeroImg = "/images/about.webp";` (URL publique directe). **Préférer la seconde forme** (URL publique) car les images sont dans `public/` : utiliser `const HeroImg = "/images/about.webp";` et `<img src={HeroImg} ... />`.

- [ ] **Step 2: Corriger l'import image en URL publique**

Remplacer la ligne d'import par une constante (les images vivent dans `public/`) :

```jsx
// en tête, retirer `import HeroImg from ...`
const HERO_IMG = "/images/about.webp";
```

et dans le JSX : `<img src={HERO_IMG} ... />`.

- [ ] **Step 3: Créer `styles/scss/hero/style.scss`**

```scss
@use "../_tokens" as *;

.hero {
  background: $sage;

  &__inner {
    max-width: 1120px;
    margin: 0 auto;
    padding: 40px 46px 78px;
    display: grid;
    grid-template-columns: 1.04fr 0.96fr;
    gap: 52px;
    align-items: center;
  }

  &__eyebrow {
    color: $cream-light;
    margin-bottom: 22px;
  }

  &__title {
    font-family: $font-serif;
    font-weight: 600;
    font-size: 62px;
    line-height: 1.01;
    margin: 0 0 22px;
    color: $cream;
  }

  &__subtitle {
    font-size: 17px;
    line-height: 1.7;
    max-width: 440px;
    color: $cream-light;
    margin: 0 0 32px;
  }

  &__actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__image {
    height: 420px;
    border-radius: $radius-lg;
    overflow: hidden;
    box-shadow: $shadow-img;

    img { width: 100%; height: 100%; object-fit: cover; }
  }
}

@media (max-width: $bp-tablet) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 32px 24px 56px;
  }
  .hero__title { font-size: 44px; }
  .hero__image { height: 300px; }
}
```

- [ ] **Step 4: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 5: Commit**

```bash
git add sidgi-reflexo/src/components/hero sidgi-reflexo/src/styles/scss/hero/style.scss
git commit -m "feat(refonte): section hero avec titre serif et double CTA"
```

---

### Task 5: About (portrait rond)

**Files:**
- Modify: `sidgi-reflexo/src/components/about/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/about/style.scss`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2). Prop inchangée : `{ data }` (dehanjenny.json : `{ titre, image, content }`).
- Le portrait utilise l'asset `about_picture.webp` (portrait réel de Jenny), pas `data.image`.

- [ ] **Step 1: Réécrire `about/index.jsx`**

```jsx
import SectionHeading from "../ui/SectionHeading";
import "../../styles/scss/about/style.scss";

const PORTRAIT_IMG = "/images/about_picture.webp";

function About({ data }) {
  const paragraphs = data.content.split("\n").filter((line) => line.trim() !== "");

  return (
    <section className="about" id="apropos">
      <div className="about__inner">
        <div className="about__portrait">
          <img src={PORTRAIT_IMG} alt="Portrait de Jenny Dehan, réflexologue" />
        </div>
        <div className="about__content">
          <SectionHeading eyebrow="À propos" title={data.titre} />
          <div className="about__text">
            {paragraphs.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
```

- [ ] **Step 2: Réécrire `styles/scss/about/style.scss`**

```scss
@use "../_tokens" as *;

.about {
  padding: 82px 46px 20px;

  &__inner {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 56px;
    align-items: center;
    max-width: 980px;
    margin: 0 auto;
  }

  &__portrait {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: $shadow-portrait;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__content .section-heading__title {
    font-size: 46px;
    margin-top: 6px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 14px;
    color: $green-mid;
    font-size: 15.5px;
    line-height: 1.72;
    margin-top: 24px;

    p { margin: 0; }
  }
}

@media (max-width: $bp-tablet) {
  .about {
    padding: 56px 24px 12px;

    &__inner { grid-template-columns: 1fr; gap: 32px; }
    &__portrait { max-width: 320px; margin: 0 auto; }
    &__content .section-heading__title { font-size: 36px; }
  }
}
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add sidgi-reflexo/src/components/about sidgi-reflexo/src/styles/scss/about/style.scss
git commit -m "feat(refonte): section about avec portrait rond"
```

---

### Task 6: Prestation + PrestaCard

**Files:**
- Modify: `sidgi-reflexo/src/components/prestation/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/prestation/style.scss`
- Create: `sidgi-reflexo/src/components/prestation/PrestaCard.jsx`

**Interfaces:**
- Consumes: `SectionHeading`, `Button` (Task 2). Prop inchangée : `{ data }` (offres.json : tableau `{ id, titre, content, prix, image, url }`).
- Détection « bientôt » : `const soon = presta.soon ?? /bient/i.test(presta.prix);` (pas de modif JSON requise ; le champ `soon` reste optionnel).
- CTA « Être averti·e » → `mailto:sidgi.reflexologie@outlook.fr`.

- [ ] **Step 1: Créer `prestation/PrestaCard.jsx`**

```jsx
import Button from "../ui/Button";

const CONTACT_MAIL = "mailto:sidgi.reflexologie@outlook.fr";

function PrestaCard({ presta }) {
  const { titre, content, prix, image, url } = presta;
  const soon = presta.soon ?? /bient/i.test(prix);

  return (
    <article className="presta-card">
      <div className="presta-card__media">
        <img src={image} alt={`Illustration de ${titre}`} />
        {soon && <span className="presta-card__badge">Bientôt</span>}
      </div>
      <div className="presta-card__body">
        <h4 className="presta-card__title">{titre}</h4>
        <p className="presta-card__desc">{content}</p>
        <div className="presta-card__footer">
          {soon ? (
            <>
              <span className="presta-card__price presta-card__price--soon">Prochainement</span>
              <Button variant="outline" href={CONTACT_MAIL}>
                Être averti·e
              </Button>
            </>
          ) : (
            <>
              <span className="presta-card__price">
                {prix} <span className="presta-card__unit">/ séance</span>
              </span>
              <Button variant="sage" href={url}>
                Réserver
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default PrestaCard;
```

- [ ] **Step 2: Réécrire `prestation/index.jsx`**

```jsx
import SectionHeading from "../ui/SectionHeading";
import PrestaCard from "./PrestaCard";
import "../../styles/scss/prestation/style.scss";

function Prestation({ data }) {
  return (
    <section className="prestation" id="offres">
      <div className="prestation__inner">
        <SectionHeading eyebrow="Offres" title="Mes prestations" center />
        <div className="prestation__grid">
          {data?.map((presta) => (
            <PrestaCard key={presta.id} presta={presta} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Prestation;
```

- [ ] **Step 3: Réécrire `styles/scss/prestation/style.scss`**

```scss
@use "../_tokens" as *;

.prestation {
  padding: 78px 46px 20px;

  &__inner {
    max-width: 980px;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    margin-top: 40px;
  }
}

.presta-card {
  background: #fff;
  border-radius: $radius-card;
  overflow: hidden;
  box-shadow: $shadow-card;
  display: flex;
  flex-direction: column;

  &__media {
    height: 190px;
    position: relative;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: $sand;
    color: $sand-text;
    font-family: $font-label;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: $radius-pill;
  }

  &__body {
    padding: 26px 28px 28px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: $font-serif;
    font-weight: 600;
    font-size: 27px;
    margin: 0 0 10px;
    color: $green-deep;
  }

  &__desc {
    margin: 0 0 22px;
    color: $green-mid;
    font-size: 15px;
    line-height: 1.6;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__price {
    font-family: $font-serif;
    font-weight: 600;
    font-size: 26px;
    color: $green-deep;

    &--soon { font-size: 22px; color: $green-accent; }
  }

  &__unit {
    font-size: 14px;
    font-family: $font-body;
    color: $green-accent;
  }
}

@media (max-width: $bp-tablet) {
  .prestation { padding: 56px 24px 12px; }
  .prestation__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 5: Commit**

```bash
git add sidgi-reflexo/src/components/prestation sidgi-reflexo/src/styles/scss/prestation/style.scss
git commit -m "feat(refonte): prestations en cartes avec état bientôt et CTA mailto"
```

---

### Task 7: Seocontent (La réflexologie, c'est quoi ?)

**Files:**
- Modify: `sidgi-reflexo/src/components/seocontent/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/content/style.scss`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2). Prop inchangée : `{ data }` (content.json : `{ titre, image, content }`).
- Image de section : `placeholder_1.webp` (via `data.image` qui vaut déjà `/images/placeholder_1.webp`).

- [ ] **Step 1: Réécrire `seocontent/index.jsx`**

```jsx
import SectionHeading from "../ui/SectionHeading";
import "../../styles/scss/content/style.scss";

function Seocontent({ data }) {
  const paragraphs = data.content.split("\n").filter((line) => line.trim() !== "");

  return (
    <section className="seo" id="reflexologie">
      <div className="seo__inner">
        <div className="seo__content">
          <SectionHeading eyebrow="Comprendre" title={data.titre} />
          <div className="seo__text">
            {paragraphs.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="seo__image">
          <img src={data.image} alt="Séance de réflexologie en cours" />
        </div>
      </div>
    </section>
  );
}

export default Seocontent;
```

- [ ] **Step 2: Réécrire `styles/scss/content/style.scss`**

```scss
@use "../_tokens" as *;

.seo {
  background: $bg-reflexo;
  padding: 82px 46px;
  margin-top: 60px;

  &__inner {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 52px;
    align-items: center;
    max-width: 980px;
    margin: 0 auto;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 13px;
    color: $green-mid;
    font-size: 15px;
    line-height: 1.72;
    margin-top: 24px;

    p { margin: 0; }
  }

  &__image {
    height: 480px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 50px rgba(40, 50, 30, 0.2);

    img { width: 100%; height: 100%; object-fit: cover; }
  }
}

@media (max-width: $bp-tablet) {
  .seo {
    padding: 56px 24px;
    margin-top: 32px;

    &__inner { grid-template-columns: 1fr; gap: 32px; }
    &__image { height: 320px; order: -1; }
  }
}
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add sidgi-reflexo/src/components/seocontent sidgi-reflexo/src/styles/scss/content/style.scss
git commit -m "feat(refonte): section réflexologie sur fond vert clair"
```

---

### Task 8: Localisation (infos pratiques)

**Files:**
- Modify: `sidgi-reflexo/src/components/localisation/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/localisation/style.scss`

**Interfaces:**
- Consumes: `SectionHeading` (Task 2). Aucun prop.
- Conserve l'iframe Google Maps existant (même `src`) et les micro-données schema.org.

- [ ] **Step 1: Réécrire `localisation/index.jsx`**

```jsx
import SectionHeading from "../ui/SectionHeading";
import "../../styles/scss/localisation/style.scss";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478.0728637901503!2d-0.42309958415500243!3d45.01648000627674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4800279793234df9%3A0xf69f463373eb0a1f!2s17%20Bis%20Rue%20d&#39;Artiguelongue%2C%2033240%20Val-de-Virv%C3%A9e!5e1!3m2!1sfr!2sfr!4v1740734619084!5m2!1sfr!2sfr";

function Localisation() {
  return (
    <section className="local" id="contact-infos">
      <div className="local__inner">
        <SectionHeading
          eyebrow="Infos pratiques"
          title="Sidgi Réflexo · Saint-André-de-Cubzac"
          center
        />
        <div className="local__grid">
          <div className="local__map">
            <iframe
              src={MAP_SRC}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation Google Maps de Sidgi Réflexo"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div
            className="local__info"
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <div className="local__row">
              <span className="local__label">Adresse</span>
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">17 Bis Rue d'Artiguelongue</span>,{" "}
                <span itemProp="postalCode">33240</span>{" "}
                <span itemProp="addressLocality">Val de Virvée</span>
              </span>
            </div>
            <div className="local__row">
              <span className="local__label">Téléphone</span>
              <span itemProp="telephone">07 85 84 11 51</span>
            </div>
            <div className="local__row">
              <span className="local__label">Horaires</span>
              <span itemProp="openingHours" content="Mo-Fr 10:00-19:00">
                Lundi – Vendredi · 10h – 19h
              </span>
            </div>
            <p className="local__note">
              Parking facile sur la place de l'église. Entrez dans la cour
              gravillonnée : je me situe au bout du chemin, au niveau du portail
              en bois.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Localisation;
```

- [ ] **Step 2: Réécrire `styles/scss/localisation/style.scss`**

```scss
@use "../_tokens" as *;

.local {
  padding: 82px 46px 20px;

  &__inner { max-width: 980px; margin: 0 auto; }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 44px;
    align-items: center;
    margin-top: 40px;
  }

  &__map {
    height: 340px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(50, 60, 35, 0.14);

    iframe { width: 100%; height: 100%; }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 15.5px;
    color: $green-mid;
    line-height: 1.6;
  }

  &__label {
    display: block;
    font-weight: 700;
    color: $green-deep;
  }

  &__note { margin: 0; font-size: 14px; }
}

@media (max-width: $bp-tablet) {
  .local {
    padding: 56px 24px 12px;

    &__grid { grid-template-columns: 1fr; gap: 28px; }
    &__map { height: 280px; }
  }
}
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add sidgi-reflexo/src/components/localisation sidgi-reflexo/src/styles/scss/localisation/style.scss
git commit -m "feat(refonte): infos pratiques avec carte et coordonnées"
```

---

### Task 9: Footer restylé

**Files:**
- Modify: `sidgi-reflexo/src/components/footer/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/footer/style.scss`

**Interfaces:**
- Consumes: `Modal` (inchangé). Conserve les deux modales (Mentions légales, CGV) avec leur contenu actuel intégral.
- Icônes réseaux : `lucide-react` (`Facebook`, `Instagram`) dans des cercles outline.

- [ ] **Step 1: Réécrire le haut de `footer/index.jsx`** (garder le contenu des deux `<Modal>` exactement comme aujourd'hui)

```jsx
import { useState } from "react";
import { Facebook, Instagram } from "lucide-react";

import Modal from "../modal";
import "../../styles/scss/footer/style.scss";

function Footer() {
  const [isMentionsOpen, setMentionsOpen] = useState(false);
  const [isCgvOpen, setCgvOpen] = useState(false);

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <h3 className="footer__title">Besoin de me contacter ?</h3>
        <a className="footer__mail" href="mailto:sidgi.reflexologie@outlook.fr">
          sidgi.reflexologie@outlook.fr
        </a>
        <div className="footer__social">
          <a
            href="https://www.facebook.com/people/Sidgi-R%C3%A9flexo/61574991002487/"
            aria-label="Facebook"
            className="footer__social-btn"
          >
            <Facebook size={20} />
          </a>
          <a
            href="http://www.instagram.com/sidgi.reflexo"
            aria-label="Instagram"
            className="footer__social-btn"
          >
            <Instagram size={20} />
          </a>
        </div>
        <div className="footer__legal">
          <button onClick={() => setMentionsOpen(true)}>Mentions légales</button>
          <span aria-hidden="true">·</span>
          <button onClick={() => setCgvOpen(true)}>Conditions générales</button>
        </div>
      </div>

      {/* Conserver les deux <Modal> Mentions légales et CGV avec leur contenu actuel intégral */}
    </footer>
  );
}

export default Footer;
```

**Important :** recopier les deux blocs `<Modal isOpen={isMentionsOpen} ...>...</Modal>` et `<Modal isOpen={isCgvOpen} ...>...</Modal>` depuis la version actuelle du fichier (contenu juridique inchangé) à l'emplacement du commentaire, avant `</footer>`.

- [ ] **Step 2: Réécrire `styles/scss/footer/style.scss`**

```scss
@use "../_tokens" as *;

.footer {
  background: $sage;
  color: $cream;
  padding: 58px 46px;
  text-align: center;
  margin-top: 72px;

  &__inner { max-width: 720px; margin: 0 auto; }

  &__title {
    font-family: $font-serif;
    font-weight: 600;
    font-size: 34px;
    margin: 0 0 18px;
    color: $cream;
  }

  &__mail {
    color: $cream;
    font-size: 17px;
    border-bottom: 1px solid rgba(246, 245, 239, 0.5);
    padding-bottom: 2px;
    &:hover { color: $cream; opacity: 0.85; }
  }

  &__social {
    display: flex;
    gap: 14px;
    justify-content: center;
    margin: 26px 0 22px;
  }

  &__social-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1.5px solid $cream;
    color: $cream;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { background: rgba(246, 245, 239, 0.14); color: $cream; }
  }

  &__legal {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: $cream-light;

    button {
      background: none;
      border: none;
      color: $cream-light;
      font-family: $font-body;
      font-size: 13px;
      cursor: pointer;
      padding: 0;
      &:hover { color: $cream; }
    }
  }
}
```

- [ ] **Step 3: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add sidgi-reflexo/src/components/footer sidgi-reflexo/src/styles/scss/footer/style.scss
git commit -m "feat(refonte): footer sauge avec contact, réseaux et mentions légales"
```

---

### Task 10: Modal + Carte (popup carte cadeaux) restylés

**Files:**
- Modify: `sidgi-reflexo/src/styles/scss/modal/style.scss`
- Modify: `sidgi-reflexo/src/styles/scss/offres_popup/carte/style.scss`
- (Vérifier `modal/index.jsx` et `offres_popup/carte/index.jsx` — logique inchangée, JSX conservé)

**Interfaces:**
- `Modal` et `Carte` gardent leur JSX/props actuels ; seul le style change (tokens).

- [ ] **Step 1: Réécrire `styles/scss/modal/style.scss`**

```scss
@use "../_tokens" as *;

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(40, 50, 30, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-content {
  position: relative;
  background: $cream;
  color: $green-mid;
  border-radius: $radius-lg;
  box-shadow: $shadow-frame;
  max-width: 640px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  padding: 40px 38px 34px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 18px;
  background: none;
  border: none;
  font-size: 22px;
  color: $green-deep;
  cursor: pointer;
  line-height: 1;
}

.modal-title {
  font-family: $font-serif;
  font-weight: 600;
  font-size: 30px;
  margin: 0 0 20px;
  color: $green-deep;
}

.modal-body {
  font-size: 15px;
  line-height: 1.7;

  p { margin: 0 0 14px; }
  strong { color: $green-deep; }
}
```

- [ ] **Step 2: Réécrire `styles/scss/offres_popup/carte/style.scss`** (chemin token : `../../_tokens`)

```scss
@use "../../_tokens" as *;

.carte-offre {
  .main-content {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 26px;
    align-items: center;

    &-text {
      font-family: $font-serif;
      font-weight: 600;
      font-size: 24px;
      line-height: 1.15;
      margin: 0 0 14px;
      color: $green-deep;
    }

    &-left p { margin: 0 0 12px; font-size: 15px; line-height: 1.6; }

    &-img {
      width: 100%;
      border-radius: $radius-card;
      object-fit: cover;
    }

    .price {
      font-weight: 700;
      color: $green-accent;
    }
  }

  .modal-contact {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid rgba(69, 86, 47, 0.15);

    h3 {
      font-family: $font-serif;
      font-size: 20px;
      margin: 0 0 12px;
      color: $green-deep;
    }

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      font-size: 15px;
    }
  }
}

@media (max-width: $bp-mobile) {
  .carte-offre .main-content {
    grid-template-columns: 1fr;

    &-img { max-height: 220px; }
  }
}
```

- [ ] **Step 3: Vérifier `Carte` — l'icône `Mail`/`Smartphone` de lucide** garde `color="#a8b5a2"` ; le remplacer par le vert accent pour cohérence : dans `offres_popup/carte/index.jsx`, changer les deux `color="#a8b5a2"` en `color="#869a6d"`. Reste du JSX inchangé.

- [ ] **Step 4: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 5: Commit**

```bash
git add sidgi-reflexo/src/styles/scss/modal sidgi-reflexo/src/styles/scss/offres_popup sidgi-reflexo/src/components/offres_popup
git commit -m "feat(refonte): modales et popup carte cadeaux restylés"
```

---

### Task 11: Recomposition de Home + nettoyage des composants morts

**Files:**
- Modify: `sidgi-reflexo/src/pages/home/index.jsx`
- Modify: `sidgi-reflexo/src/styles/scss/home/style.scss`
- Delete: `sidgi-reflexo/src/components/banner/`, `sidgi-reflexo/src/components/slider/`, `sidgi-reflexo/src/components/info/`, `sidgi-reflexo/src/components/cta/`
- Delete: `sidgi-reflexo/src/styles/scss/banner/`, `sidgi-reflexo/src/styles/scss/slider/`, `sidgi-reflexo/src/styles/scss/cta/`
- Delete (données mortes): `sidgi-reflexo/src/data/slider/`

**Interfaces:**
- Consumes: `Hero` (Task 4), `About`, `Prestation`, `Seocontent`, `Localisation`, `Modal`, `Carte`.
- Ordre des sections : `Hero (#accueil)` → `About` → `Prestation (#offres)` → `Seocontent (#reflexologie)` → `Localisation` → popup.
- `Header`/`Footer` restent dans `main.jsx` (inchangé).

- [ ] **Step 1: Réécrire `pages/home/index.jsx`**

```jsx
import { useState, useEffect } from "react";

import Hero from "../../components/hero";
import About from "../../components/about";
import Prestation from "../../components/prestation";
import Seocontent from "../../components/seocontent";
import Localisation from "../../components/localisation";
import Modal from "../../components/modal";
import Carte from "../../components/offres_popup/carte";

import AboutData from "../../data/about/dehanjenny.json";
import PrestationData from "../../data/offres/offres.json";
import SeoContentData from "../../data/seocontent/content.json";

import "../../styles/scss/home/style.scss";

function Home({ isMenuOpen, setIsMenuOpen }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("offer-popup-shown")) {
      const timer = setTimeout(() => {
        setPopupOpen(true);
        sessionStorage.setItem("offer-popup-shown", "true");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="home">
      {isMenuOpen && (
        <div className="home__overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      <Hero />
      <About data={AboutData} />
      <Prestation data={PrestationData} />
      <Seocontent data={SeoContentData} />
      <Localisation />

      <Modal
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        title="🎁 Les cartes cadeaux sont arrivées ! 🎁"
      >
        <Carte />
      </Modal>
    </main>
  );
}

export default Home;
```

- [ ] **Step 2: Réécrire `styles/scss/home/style.scss`**

```scss
@use "../_tokens" as *;

.home {
  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(40, 50, 30, 0.35);
    z-index: 30;
  }
}
```

- [ ] **Step 3: Supprimer les composants morts**

Run (depuis `sidgi-reflexo/`):

```bash
git rm -r src/components/banner src/components/slider src/components/info src/components/cta
git rm -r src/styles/scss/banner src/styles/scss/slider src/styles/scss/cta
git rm -r src/data/slider
```

- [ ] **Step 4: Vérifier qu'aucun import mort ne subsiste**

Run: `grep -rn "components/cta\|components/slider\|components/banner\|components/info\|data/slider" src`
Expected: aucun résultat.

- [ ] **Step 5: Vérifier le build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 6: Commit**

```bash
git add sidgi-reflexo/src/pages/home sidgi-reflexo/src/styles/scss/home
git commit -m "feat(refonte): recomposition home et suppression des composants morts"
```

---

### Task 12: Passe finale — nettoyage CSS compilé, vérification visuelle et liens

**Files:**
- Delete: `sidgi-reflexo/src/styles/css/` (dossiers CSS compilés obsolètes, non importés)
- Modify: `sidgi-reflexo/package.json` (retirer `react-intersection-observer` et FontAwesome si non utilisés — voir Step 2)

**Interfaces:**
- Aucune nouvelle interface ; vérification bout en bout.

- [ ] **Step 1: Supprimer les CSS compilés obsolètes**

Les composants importent les `.scss` de `styles/scss/`. Le dossier `styles/css/` (et les `banner`/`slider`/`cta` associés) n'est plus référencé.

Run: `grep -rn "styles/css" src` → si aucun résultat, supprimer :

```bash
git rm -r src/styles/css
```

Si `grep` remonte des imports (ex. un composant important encore `styles/css/...`), corriger ces imports vers `styles/scss/...` avant de supprimer.

- [ ] **Step 2: Élaguer les dépendances inutilisées**

Run: `grep -rn "fortawesome\|intersection-observer" src`
Expected: aucun résultat (FontAwesome et react-intersection-observer ne sont pas utilisés).
Si confirmé, retirer de `package.json` les 5 paquets `@fortawesome/*` et `react-intersection-observer`, puis :

```bash
npm install
```

(Si un import existe, ne pas retirer le paquet correspondant.)

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: aucune erreur. Corriger les warnings éventuels (imports inutilisés, variables non utilisées) dans les fichiers touchés.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build réussi.

- [ ] **Step 5: Vérification visuelle réelle**

Run: `npm run dev` puis ouvrir l'URL locale. Contrôler :
- Header sauge collant, logo « SIDGI / Réflexo », nav + bouton Réserver.
- Hero : titre serif « Prenez soin de vous… », 2 CTA, image d'ambiance.
- About : portrait rond + texte de Jenny (6 paragraphes).
- Prestations : 2 cartes (Plantaire 45 €/séance + Réserver ; Palmaire badge « Bientôt » + « Être averti·e »).
- Réflexologie : fond vert clair, texte + image.
- Infos pratiques : carte Google Maps + coordonnées.
- Footer : email, réseaux, mentions légales / CGV (ouvrent les modales).
- Popup carte cadeaux au chargement (1ʳᵉ visite de session), fermable.

- [ ] **Step 6: Vérification des liens**

Contrôler que :
- « Réserver » (header, hero, carte plantaire) → `https://calendly.com/sidgi-reflexologie/plantaire`.
- « Découvrir les offres » → ancre `#offres` (scroll).
- « Être averti·e » → `mailto:sidgi.reflexologie@outlook.fr`.
- Nav Accueil/Offres/La Réflexologie → ancres `#accueil` / `#offres` / `#reflexologie`.
- Email footer → mailto ; Facebook / Instagram → bonnes URL.

- [ ] **Step 7: Vérification responsive**

Réduire à ~375px : header en burger, grilles en 1 colonne, portrait rond conservé, aucun débordement horizontal.

- [ ] **Step 8: Commit final**

```bash
git add -A
git commit -m "chore(refonte): nettoyage CSS compilé et dépendances inutilisées"
```

---

## Self-Review

**1. Couverture du spec :**
- Tokens/design system → Task 1, 2. ✅
- Header, Hero, About (portrait rond), Prestation/PrestaCard (état Bientôt + mailto), Seocontent, Localisation, Footer (modales conservées), Modal, Carte → Tasks 3–10. ✅
- Suppression Banner/Slider/Info/Cta → Task 11. ✅
- Popup conservé (sessionStorage) → Task 11. ✅
- react-router-dom conservé → `main.jsx` non modifié structurellement (Task 1 ajoute seulement l'import global). ✅
- Liens préservés → Global Constraints + Tasks 3/4/6/9 + vérif Task 12. ✅
- Mapping images → Tasks 4/5/6/7/8. ✅
- Responsive → media queries par composant + Task 12 Step 7. ✅

**2. Placeholders :** aucun « TBD/TODO » ; le contenu juridique des modales du footer est explicitement « recopier depuis la version actuelle » (Task 9 Step 1) — contenu réel existant, pas un placeholder à inventer.

**3. Cohérence des types :** `BOOKING_URL` (calendly plantaire) réutilisé identique dans Header (Task 3) et Hero (Task 4). `Button` variants (`primary/secondary/sage/outline`) définis en Task 2 et utilisés tels quels ensuite. `SectionHeading` props (`eyebrow/title/center`) cohérentes partout. Détection `soon` définie une seule fois dans `PrestaCard`.
