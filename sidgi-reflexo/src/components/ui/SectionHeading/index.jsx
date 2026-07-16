import Eyebrow from "../Eyebrow";
import "./style.scss";

function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <div className={`section-heading ${center ? "section-heading--center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="section-heading__title">{title}</h2>
    </div>
  );
}

export default SectionHeading;
