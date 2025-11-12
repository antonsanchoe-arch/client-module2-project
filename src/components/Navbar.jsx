import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/about">About Us</Link>
      <Link to="/create"> add character</Link>
    </nav>
  )
}

