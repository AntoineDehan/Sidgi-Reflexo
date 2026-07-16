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
