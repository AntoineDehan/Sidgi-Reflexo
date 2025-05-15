import Cta from "../cta";

import "../../styles/css/prestation/style.css";

function Prestation({ data }) {
  return (
    <div className="prestation-conteneur">
      {data?.map((presta) => {
        const { titre, content, prix, id, image, url } = presta;
        return (
          <div className="presta-card" key={id}>
            <img src={image} alt={titre} />
            <div className="presta-card-contenu">
              <h3 className="presta-card-title">{titre}</h3>
              <p className="presta-card-content">{content}</p>
              <div className="presta-card-conteneur">
                <p className="presta-card-prix">{prix}/séance</p>
                <Cta url={url} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Prestation;
