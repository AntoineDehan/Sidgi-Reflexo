import "../../styles/scss/cta/style.scss";

function Cta({ Titre = "Réservation", url }) {
  return (
    <div className="cta-conteneur">
      <button onClick={() => (window.location.href = url)}>{Titre}</button>
    </div>
  );
}

export default Cta;
