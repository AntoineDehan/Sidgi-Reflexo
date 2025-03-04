function Seocontent({ data }) {
  return (
    <div className="seo-conteneur">
      <h2>{data.titre}</h2>
      <p>{data.content}</p>
    </div>
  );
}

export default Seocontent;
