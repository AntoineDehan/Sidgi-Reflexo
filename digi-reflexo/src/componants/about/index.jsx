function About({ data }) {
  console.log(data);
  console.log(data.titre);
  return (
    <div className="about-conteneur">
      <img src={data.image} alt={data.titre} className="about-image" />
      <div className="seprator-right"></div>
      <div className="seperator-left"></div>
      <div className="about-content">
        <h2>{data.titre}</h2>
        <p>{data.content}</p>
      </div>
    </div>
  );
}

export default About;
