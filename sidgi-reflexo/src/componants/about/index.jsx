import "../../styles/css/about/style.css";

function About({ data }) {
  return (
    <div className="about-conteneur">
      <div className="test">
        <img src={data.image} alt={data.titre} className="about-image" />
        <div className="about-content">
          <h2>{data.titre}</h2>
          <p>
            {data.content.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
