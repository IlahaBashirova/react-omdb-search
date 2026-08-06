import { useState, useEffect } from 'react';
import { useMovieSearch } from './hooks/useMovieSearch';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { results, totalPages, totalResults, isLoading, error } =
    useMovieSearch(debouncedQuery, currentPage);

  const handleSearch = (value) => setQuery(value);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <h1>Axtarış Tətbiqi</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <p className="loading">Yüklənir...</p>}
      {error && !isLoading && <p className="error">{error}</p>}
      {!isLoading && !error && totalResults > 0 && (
        <p className="results-count">{totalResults} nəticə tapıldı</p>
      )}
      {!isLoading && !error && <ResultsList items={results} />}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      )}
    </div>
  );
}

export default App;