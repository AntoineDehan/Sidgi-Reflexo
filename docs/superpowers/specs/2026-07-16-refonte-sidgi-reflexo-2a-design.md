# Refonte Sidgi Réflexo — Piste 2a (Éditorial doux, photo ronde)

## Contexte

Site vitrine one-page d'une réflexologue (Jenny Dehan) à Val de Virvée / Saint-André-de-Cubzac.
Stack existante : Vite + React 19, SCSS par composant, `react-router-dom`, `lucide-react`.
Objectif : refondre le design pour coller à la piste **2a** du document Claude Design
« Refonte Sidgi Reflexo.dc.html », en composants React réutilisables, sans changer le contrat
de données ni casser les liens (réservation Calendly, contact, réseaux, carte).

La piste 2a a été retenue parmi 5 (1a, 1b, 1c, 1d, 2a). C'est la version « éditoriale douce »
avec portrait rond dans la section « À propos », mise en avant en tête du canvas.

## Décisions d'interview

- **Piste** : 2a.
- **Popup carte cadeaux** au chargement : **conservé** (restylé), une fois par session.
- **Routing** : **react-router-dom conservé** (pas de simplification).
- **CTA Palmaire** (« Bientôt ») : bouton « Être averti·e » → **mailto** vers l'email de contact.
- **CSS** : **SCSS par composant + fichier de tokens partagé** pour le design system.

## Design system (tokens)

Nouveau fichier `src/styles/scss/_tokens.scss` (variables SCSS + `:root` custom properties)
capturant l'identité 2a :

| Rôle | Valeur |
|------|--------|
| Vert sauge (accent principal / bandeaux) | `#9fb088` |
| Vert profond (texte fort / titres) | `#45562f` |
| Vert moyen (texte courant) | `#5a684a` |
| Vert clair accent (eyebrow, hover, secondaire) | `#869a6d` |
| Crème (surfaces claires sur fond vert) | `#f6f5ef` |
| Crème carte / cadre | `#f3f2ec` |
| Fond page | `#e6e5dd` |
| Fond section réflexo | `#e7ecdd` |
| Sable / terracotta (badge « Bientôt ») | `#d8caa6` · texte `#4a3f28` |

Polices (Google Fonts, déjà chargées côté design — à ajouter dans `index.html`) :
- **Cormorant Garamond** (serif) : titres `h1`–`h4`.
- **Archivo** (sans, uppercase, letter-spacing) : eyebrows / labels / nav secondaire.
- **Mulish** (sans) : corps de texte, boutons.

Autres tokens : rayons (`999px` pills, `18–22px` cartes), ombres douces
(`0 40px 90px rgba(50,60,35,.22)` cadre, `0 16px 42px rgba(50,60,35,.1)` cartes).

Les polices actuelles (Dancing Script, Nunito, EB Garamond) seront remplacées par les
nouvelles dans `index.html`.

## Architecture composants (réutilisables)

On garde l'organisation `src/components/<nom>/index.jsx` + SCSS associé. Composants :

**Nouveaux composants réutilisables du design system :**
- `Button` — bouton/lien pill réutilisable. Props : `variant` (`primary` crème, `secondary`
  outline, `sage` vert, `ghost`), `href`, `children`. Utilisé par hero, cartes, nav.
- `Eyebrow` — petit label Archivo uppercase espacé. Prop : `children`.
- `SectionHeading` — bloc `Eyebrow` + titre serif, avec option `center`. Props :
  `eyebrow`, `title`, `center`.

**Composants de section (restylés, mêmes props qu'aujourd'hui) :**
- `Header` — bandeau sauge : logo « SIDGI / Réflexo » empilé, nav (Accueil, Offres,
  La Réflexologie) + `Button` « Réserver ». Menu burger mobile conservé.
- `Hero` — **nouveau** : bandeau sauge, `Eyebrow`, grand titre serif « Prenez soin de vous,
  du bout des doigts. », sous-titre, 2 CTA (Réserver / Découvrir les offres), image d'ambiance.
- `About` — grille portrait rond + texte. Reçoit `data` (dehanjenny.json). Le texte est
  splitté par `\n` en paragraphes (comportement actuel conservé).
- `Prestation` + `PrestaCard` — grille 2 colonnes de cartes blanches. Chaque carte : image,
  titre, description, prix + CTA. Gère l'état « Bientôt » (badge sable + bouton mailto).
  Reçoit `data` (offres.json).
- `Seocontent` — section « La réflexologie, c'est quoi ? » sur fond vert clair, texte + image.
  Reçoit `data` (content.json).
- `Localisation` — infos pratiques : carte Google Maps (iframe existant) + adresse / téléphone
  / horaires + note parking.
- `Footer` — bandeau sauge : « Besoin de me contacter ? », email, réseaux (Facebook,
  Instagram en cercles outline), liens Mentions légales / CGV (modales conservées).
- `Modal` — inchangé (overlay + contenu + fermeture), restylé aux tokens.
- `Carte` (offres_popup) — contenu du popup carte cadeaux, restylé.

**Composants supprimés/ignorés :** `Banner`, `Slider`, `Info`, `Cta` (remplacé par `Button`),
non branchés dans la page — on les retire de l'arbre (fichiers `Slider`/`Banner`/`Info`
supprimés ; `Cta` remplacé par `Button`).

## Structure de la page (Home)

Ordre du design 2a, ancres conservées pour la nav :

1. `Header` (global)
2. `Hero` — `#accueil`
3. `About` (portrait rond)
4. `Prestation` — `#offres`
5. `Seocontent` — `#reflexologie` (fond vert clair)
6. `Localisation` (infos pratiques + carte)
7. `Footer` (global) — `#contact`
8. `Modal` + `Carte` (popup au chargement, une fois par session)

## Flux de données (inchangé)

- `data/about/dehanjenny.json` → `About`
- `data/offres/offres.json` → `Prestation`
- `data/seocontent/content.json` → `Seocontent`
- Popup : le composant `Carte` a aujourd'hui un contenu statique (offre carte cadeaux 45 €
  + email + téléphone). On le conserve tel quel, restylé. `offres_popup.json` reste inutilisé
  (non branché aujourd'hui) — hors périmètre.

## Mapping des images (assets existants)

| Emplacement design | Asset |
|--------------------|-------|
| Hero (ambiance/séance) | `/images/about.webp` |
| Portrait rond « À propos » | `/images/about_picture.webp` |
| Carte prestation Plantaire | `/images/reflexo_plantaire.webp` |
| Carte prestation Palmaire | `/images/reflexo_palmaire.webp` |
| Section réflexologie | `/images/placeholder_1.webp` |
| Carte / localisation | iframe Google Maps existant |

## Liens à préserver

- Réserver (hero + carte Plantaire) → `https://calendly.com/sidgi-reflexologie/plantaire`
- CTA « Découvrir les offres » → ancre `#offres`
- Palmaire « Être averti·e » → `mailto:sidgi.reflexologie@outlook.fr`
- Popup carte cadeaux : contenu de contact actuel (email + téléphone), restylé
- Email `mailto:sidgi.reflexologie@outlook.fr` · Tél `07 85 84 11 51`
- Facebook `https://www.facebook.com/people/Sidgi-R%C3%A9flexo/61574991002487/`
- Instagram `http://www.instagram.com/sidgi.reflexo`
- Adresse 17 Bis Rue d'Artiguelongue, 33240 Val de Virvée · Horaires Lun–Ven 10h–19h

## Responsive

Le design canvas est desktop (1120px). Points de rupture à prévoir : les grilles 2 colonnes
(hero, about, prestations, réflexo, localisation) passent en 1 colonne sous ~900px ; nav
desktop → menu burger sous ~768px (comportement actuel conservé). Le portrait rond reste rond.

## Hors périmètre

- Pas de refonte de la donnée / du SEO (meta déjà en place dans `index.html`).
- Pas de nouvelle page (routing conservé mais une seule route `/`).
- Pas de nouvelles photos : on réutilise les assets existants.

## Vérification

- `npm run dev` puis contrôle visuel des 6 sections + header + footer + popup.
- Vérifier chaque lien (Calendly plantaire, mailto, réseaux, ancres nav).
- `npm run build` sans erreur ; `npm run lint` propre.
- Contrôle responsive (mobile ~375px, desktop).
