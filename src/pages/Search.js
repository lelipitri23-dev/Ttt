// src/pages/Search.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import MangaCard from '../components/MangaCard';

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/search?q=${keyword}`);
        if (response.data.success) {
          setResults(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Gagal melakukan pencarian.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [keyword]);

  return (
    <div className="search-page">
      <h1 className="text-3xl font-bold mb-6">
        Hasil Pencarian untuk: <span className="text-red-500">"{keyword}"</span>
      </h1>
      
      {loading && <div className="text-center py-10">Mencari...</div>}
      {error && <div className="text-center py-10 text-red-500">Error: {error}</div>}
      
      {!loading && !error && results.length === 0 && (
        <div className="text-center py-10 text-gray-600">
          Tidak ditemukan hasil untuk kata kunci "{keyword}".
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {results.map(manga => (
          <MangaCard key={manga.slug} manga={manga} />
        ))}
      </div>
    </div>
  );
}

export default Search;
