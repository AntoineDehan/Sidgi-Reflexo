import "../../styles/css/content/style.css";

function Seocontent({ data }) {
  return (
    <div className="seo-conteneur">
      <div className="seo-content">
        <h2>{data.titre}</h2>
        <div>
          {data.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="seo-image">
        <img src={data.image} alt="" />
      </div>
    </div>
  );
}

export default Seocontent;
