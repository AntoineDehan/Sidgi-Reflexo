import Cta from "../cta";

import "../../styles/css/prestation/style.css";

function Prestation({ data }) {
  return (
    <div className="prestation-conteneur">
      {data?.map((presta) => {
        const { titre, content, prix, id, image } = presta;
        return (
          <div className="presta-card" key={id}>
            <img src={image} alt={titre} />
            <div className="presta-card-contenu">
              <h3 className="presta-card-title">{titre}</h3>
              <p className="cv-card-content">{content}</p>
              <p className="presta-card-prix">{prix}</p>
              <Cta />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Prestation;
