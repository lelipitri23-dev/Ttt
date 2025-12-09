// src/pages/MangaList.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import MangaCard from '../components/MangaCard';
import Pagination from '../components/Pagination';

function MangaList() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const limit = 20;

  const fetchData = useCallback(async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/manga-list?page=${pageNumber}&limit=${limit}`);
      if (response.data.success) {
        setMangas(response.data.data);
        setPagination(response.data.pagination);
        setPage(pageNumber);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Gagal memuat daftar manga.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]); // Hanya jalankan saat 'page' berubah

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  if (loading && mangas.length === 0) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="manga-list-page">
      <h1 className="text-3xl font-bold mb-6">Daftar Manga A-Z ({pagination.totalItems} Judul)</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {mangas.map(manga => (
          <MangaCard key={manga.slug} manga={manga} />
        ))}
      </div>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default MangaList;
