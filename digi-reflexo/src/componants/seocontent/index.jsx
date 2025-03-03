function Seocontent({ data }) {
  return (
    <div className="seo-conteneur">
      <h3>{data.titre}</h3>
      <p>{data.content}</p>
    </div>
  );
}

export default Seocontent;
