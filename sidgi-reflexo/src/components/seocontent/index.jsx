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
          <img
            src={data.image}
            alt="Séance de réflexologie en cours"
            width="952"
            height="859"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Seocontent;
