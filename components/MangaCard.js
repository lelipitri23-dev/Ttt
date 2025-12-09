// src/components/MangaCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function MangaCard({ manga }) {
  // Gunakan metadata jika tersedia, fallback ke properti root
  const rating = manga.rating || (manga.metadata && manga.metadata.rating) || 'N/A';
  const status = manga.status || (manga.metadata && manga.metadata.status) || 'N/A';
  const type = manga.type || (manga.metadata && manga.metadata.type) || 'Manga';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link to={`/manga/${manga.slug}`}>
        <img 
          src={manga.thumb} 
          alt={manga.title} 
          className="w-full h-48 object-cover object-center"
          onError={(e) => { e.target.onerror = null; e.target.src = "placeholder.jpg"; }} // Fallback image handling
        />
        <div className="p-3">
          <h3 className="text-md font-semibold text-gray-900 truncate" title={manga.title}>
            {manga.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            ⭐️ {rating} | Status: {status}
          </p>
          <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mt-2">
            {type}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default MangaCard;
