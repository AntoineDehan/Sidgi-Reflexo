import "../../styles/css/cta/style.css";

function Cta({ Titre = "Réservation" }) {
  return (
    <div className="cta-conteneur">
      <button>{Titre}</button>
    </div>
  );
}

export default Cta;
