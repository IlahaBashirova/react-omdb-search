import Card from './Card';

function ResultsList({ items }) {
  if (!items || items.length === 0) {
    return <p className="empty">Nəticə tapılmadı.</p>;
  }

  return (
    <div className="results-list">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ResultsList;
