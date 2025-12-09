// src/pages/ChapterRead.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function ChapterRead() {
  const { slug, chapterSlug } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/read/${slug}/${chapterSlug}`);
        if (response.data.success) {
          setChapterData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Gagal memuat chapter.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug, chapterSlug]);

  if (loading) return <div className="text-center py-10">Loading Chapter...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!chapterData) return <div className="text-center py-10">Data Chapter tidak tersedia.</div>;

  const { chapter, manga, navigation } = chapterData;
  const images = chapter.images || []; // Asumsi chapter.images adalah array URL

  return (
    <div className="chapter-read-page max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{manga.title}</h1>
      <h2 className="text-xl mb-4 text-gray-600">{chapter.title}</h2>

      {/* Navigasi Atas */}
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-4">
        <Link 
          to={navigation.prev ? `/read/${slug}/${navigation.prev}` : '#'}
          className={`px-4 py-2 rounded transition-colors ${navigation.prev ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          &larr; Prev
        </Link>

        <Link 
          to={`/manga/${slug}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Kembali ke Detail Manga
        </Link>
        
        <Link 
          to={navigation.next ? `/read/${slug}/${navigation.next}` : '#'}
          className={`px-4 py-2 rounded transition-colors ${navigation.next ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Next &rarr;
        </Link>
      </div>

      {/* Konten Gambar Chapter */}
      <div className="chapter-images space-y-2">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image.url || image} // Sesuaikan dengan struktur data gambar Anda
            alt={`${chapter.title} page ${index + 1}`}
            className="w-full h-auto object-contain shadow-xl"
            loading="lazy"
          />
        ))}
      </div>

      {/* Navigasi Bawah (Duplikasi) */}
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mt-4">
        <Link 
          to={navigation.prev ? `/read/${slug}/${navigation.prev}` : '#'}
          className={`px-4 py-2 rounded transition-colors ${navigation.prev ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          &larr; Prev
        </Link>
        <Link 
          to={navigation.next ? `/read/${slug}/${navigation.next}` : '#'}
          className={`px-4 py-2 rounded transition-colors ${navigation.next ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Next &rarr;
        </Link>
      </div>
    </div>
  );
}

export default ChapterRead;
