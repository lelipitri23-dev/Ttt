// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MangaList from './pages/MangaList';
import MangaDetail from './pages/MangaDetail';
import ChapterRead from './pages/ChapterRead';
import Search from './pages/Search';
// Import Halaman Filter jika Anda membuatnya
// import FilterList from './pages/FilterList'; 

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4 min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<MangaList />} />
          <Route path="/manga/:slug" element={<MangaDetail />} />
          <Route path="/read/:slug/:chapterSlug" element={<ChapterRead />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/filter/:type/:value" element={<FilterList />} /> */}
          <Route path="*" element={<h1 className="text-center text-4xl mt-20">404 Not Found</h1>} />
        </Routes>
      </main>
      {/* Tambahkan Footer jika diperlukan */}
    </Router>
  );
}

export default App;
