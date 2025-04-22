import "../../styles/css/content/style.css";

function Seocontent({ data }) {
  return (
    <div className="seo-conteneur">
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
  );
}

export default Seocontent;
