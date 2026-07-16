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

      <Modal
        isOpen={isMentionsOpen}
        onClose={() => setMentionsOpen(false)}
        title="Mentions légales"
      >
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la Loi
          n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie
          Numérique, dite L.C.E.N., il est porté à la connaissance des
          utilisateurs et visiteurs du site les présentes mentions légales.
        </p>
        <p>
          <strong>Éditeur du site :</strong>
          <br />
          Nom : Jenny Dehan
          <br />
          Activité : Réflexologue certifiée
          <br />
          Adresse : 17 Bis Rue d’Artiguelongue 33240 Val de Virvée
          <br />
          SIRET : 87963846800022
          <br />
          Téléphone : 07 85 84 11 51
          <br />
          Email : sidgi.reflexologie@outlook.fr
        </p>
        <p>
          <strong>Hébergement :</strong>
          <br />
          Nom de l’hébergeur : OVH SAS
          <br />
          Adresse : 2 rue Kellermann, 59100 Roubaix, France
          <br />
          Site : https://www.ovhcloud.com
        </p>
        <p>
          <strong>Responsabilité :</strong>
          <br />
          L’éditeur du site met en œuvre tous les moyens pour assurer la
          fiabilité des informations diffusées. Toutefois, il ne saurait être
          tenu responsable des erreurs ou omissions. Les liens hypertextes
          peuvent renvoyer vers d’autres sites, l’éditeur ne peut être tenu
          responsable du contenu de ces sites.
        </p>
        <p>
          <strong>Propriété intellectuelle :</strong>
          <br />
          Le contenu de ce site (textes, images, logos, etc.) est protégé par
          le Code de la propriété intellectuelle. Toute reproduction ou
          représentation totale ou partielle est interdite sans autorisation
          préalable.
        </p>
      </Modal>

      <Modal
        isOpen={isCgvOpen}
        onClose={() => setCgvOpen(false)}
        title="Conditions Générales de Vente"
      >
        <p>
          Les présentes conditions générales de vente régissent les
          prestations proposées sur ce site. En réservant une séance, vous
          acceptez pleinement ces conditions.
        </p>
        <p>
          <strong>Prestations proposées :</strong>
          <br />
          Réflexologie plantaire et palmaire réalisées sur rendez-vous à
          l’adresse indiquée.
        </p>
        <p>
          <strong>Réservation et annulation :</strong>
          <br />
          Toute réservation est effective après confirmation. En cas
          d’annulation, merci de prévenir au moins 24h à l’avance.
        </p>
        <p>
          <strong>Tarifs et paiement :</strong>
          <br />
          Les tarifs sont indiqués en euros TTC. Le paiement se fait à la fin
          de la séance, par espèces ou virement bancaire. Aucune prise en
          charge par la Sécurité Sociale.
        </p>
        <p>
          <strong>Responsabilités :</strong>
          <br />
          Les séances de réflexologie sont des pratiques de bien-être. Elles
          ne remplacent en aucun cas un traitement médical. Aucun diagnostic
          ne sera posé.
        </p>
        <p>
          <strong>Données personnelles :</strong>
          <br />
          Aucune donnée personnelle n’est collectée sans votre consentement.
          Les informations recueillies lors des prises de rendez-vous sont
          strictement confidentielles.
        </p>
      </Modal>
    </footer>
  );
}

export default Footer;
