import "../../styles/scss/about/style.scss";

function About({ data }) {
  return (
    <div className="about-conteneur">
      <div className="about-image">
        <img
          src={data.image}
          alt="Photo personnelle présentant Jenny Dehan"
          className="about-image"
        />
      </div>
      <div className="about-content">
        <h2>{data.titre}</h2>
        <div>
          {data.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
