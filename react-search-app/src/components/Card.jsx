function Card({ item }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.year}</p>
    </div>
  );
}

export default Card;
