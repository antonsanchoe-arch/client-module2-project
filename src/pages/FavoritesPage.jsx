import { useEffect, useState } from 'react'
import axios from 'axios'
import CharacterCard from '../components/CharacterCard.jsx'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const API_URL = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/favorites`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error('Error fetching favorites:', err))
  }, [])

  const handleRemove = async (id) => {
    try {
        await axios.delete(`${API_URL}/favorites/${id}`)
        setFavorites((prev) =>prev.filter((char) => char.id !==id))
    } catch (err) {
        console.error("ca not remove from favorites", err)
    }
  }

    return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((char) => (
            <div key={char.id} className="favorite-item">
              <CharacterCard character={char} />
              <button onClick={() => handleRemove(char.id)} className="remove-btn">
                 Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
