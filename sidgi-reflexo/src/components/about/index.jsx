import SectionHeading from "../ui/SectionHeading";
import "../../styles/scss/about/style.scss";

const PORTRAIT_IMG = "/images/about_picture.webp";

function About({ data }) {
  const paragraphs = data.content.split("\n").filter((line) => line.trim() !== "");

  return (
    <section className="about" id="apropos">
      <div className="about__inner">
        <div className="about__portrait">
          <img
            src={PORTRAIT_IMG}
            alt="Portrait de Jenny Dehan, réflexologue"
            width="650"
            height="883"
            loading="lazy"
          />
        </div>
        <div className="about__content">
          <SectionHeading eyebrow="À propos" title={data.titre} />
          <div className="about__text">
            {paragraphs.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
