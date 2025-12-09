// src/components/Pagination.js
import React from 'react';

function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages } = pagination;

  const renderPageButton = (page, isActive = false) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      disabled={isActive || page < 1 || page > totalPages}
      className={`px-3 py-1 mx-1 rounded-lg text-sm transition-colors 
        ${isActive ? 'bg-red-500 text-white font-bold' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
        ${page < 1 || page > totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {page}
    </button>
  );

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      {renderPageButton(currentPage - 1, false)}
      
      {getPages().map(page => renderPageButton(page, page === currentPage))}
      
      {renderPageButton(currentPage + 1, false)}
    </div>
  );
}

export default Pagination;
