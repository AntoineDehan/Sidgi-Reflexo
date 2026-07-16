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
