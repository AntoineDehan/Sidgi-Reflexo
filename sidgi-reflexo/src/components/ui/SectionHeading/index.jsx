import Eyebrow from "../Eyebrow";
import "./style.scss";

function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <div className={`section-heading ${center ? "section-heading--center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h3 className="section-heading__title">{title}</h3>
    </div>
  );
}

export default SectionHeading;
