import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AboutUs from './pages/AboutUsPage';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritesPage';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailsPage from './pages/CharacterDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='main-content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="character/details" element={<CharacterDetailsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
