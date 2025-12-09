// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider hover:text-red-400 transition-colors">
          MANGA APP
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-red-400 hidden sm:block">Home</Link>
          <Link to="/list" className="hover:text-red-400 hidden sm:block">List A-Z</Link>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Cari Manga..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-1 px-3 rounded-full text-sm text-gray-900 focus:ring-red-500 focus:border-red-500 transition-all"
            />
            <button type="submit" className="absolute right-0 top-0 mt-1 mr-2 text-gray-500 hover:text-red-500">
              🔍
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}

export default Header;
