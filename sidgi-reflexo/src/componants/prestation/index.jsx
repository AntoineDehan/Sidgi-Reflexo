import Cta from "../cta";

import "../../styles/scss/prestation/style.scss";

function Prestation({ data }) {
  return (
    <div className="prestation-conteneur">
      {data?.map((presta) => {
        const { titre, content, prix, id, image, url } = presta;
        return (
          <div className="presta-card" key={id}>
            <img
              src={image}
              alt={`Image d'illustration libre de droit de ${titre}`}
            />
            <div className="presta-card-contenu">
              <h2 className="presta-card-title">{titre}</h2>
              <p className="presta-card-content">{content}</p>
              <div className="presta-card-conteneur">
                <h3 className="presta-card-prix">{prix}/séance</h3>
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
