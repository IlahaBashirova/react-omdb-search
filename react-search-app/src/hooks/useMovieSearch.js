import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useMovieSearch(debouncedQuery, currentPage) {
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            setTotalPages(1);
            setTotalResults(0);
            setError(null);
        return;
        }

        const controller = new AbortController();
        let ignore = false;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedQuery}&page=${currentPage}`,
                    { signal: controller.signal }
                );
                const data = await response.json();

                if (ignore) return;

                if (!response.ok) {
                    if (data.Error && data.Error.toLowerCase().includes('limit')) {
                        setError('Günlük sorğu limiti bitib. Sabah yenidən cəhd edin.');
                    } else {
                        setError('API açarı ilə bağlı problem var. Açarı yoxlayın.');
                    }
                    setResults([]);
                    setTotalPages(1);
                    setTotalResults(0);
                    return;
                }

                if (data.Response === 'True') {
                    setResults(data.Search);
                    setTotalResults(Number(data.totalResults));
                    setTotalPages(Math.ceil(Number(data.totalResults) / 10));
                } else {
                    setResults([]);
                    setTotalPages(1);
                    setTotalResults(0);
                }
            } catch (err) {
                if (err.name === 'AbortError') return;
                if (!ignore) {
                    setError('Şəbəkə xətası baş verdi. İnternet bağlantınızı yoxlayın.');
                    setResults([]);
                }
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, [debouncedQuery, currentPage]);

    return { results, totalPages, totalResults, isLoading, error };
}