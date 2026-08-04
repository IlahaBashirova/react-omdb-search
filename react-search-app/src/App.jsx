import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import './App.css';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setTotalPages(1);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedQuery}&page=${currentPage}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setResults(data.Search);
          setTotalPages(Math.ceil(Number(data.totalResults) / 10));
        } else {
          setResults([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Sorğu zamanı xəta:', error);
      }
    };

    fetchData();
  }, [debouncedQuery, currentPage]);

  const handleSearch = (value) => {
    setQuery(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <h1>Axtarış Tətbiqi</h1>
      <SearchBar onSearch={handleSearch} />
      <ResultsList items={results} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
