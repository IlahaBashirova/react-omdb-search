function Card({ item }) {
  return (
    <div className="card">
      <img
        src={item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/150'}
        alt={item.Title}
      />
      <h3>{item.Title}</h3>
      <p>{item.Year}</p>
    </div>
  );
}

export default Card;
