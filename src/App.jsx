import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutUsPage from './pages/AboutUsPage.jsx'
import CharactersPage from './pages/CharactersPage.jsx'
import CharacterDetails from './pages/CharacterDetailPage.jsx'
import CreateCharacter from './pages/CreateCharacterPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import EditCharacter from './pages/EditCharacter.jsx'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/edit/:id" element={< EditCharacter/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App



