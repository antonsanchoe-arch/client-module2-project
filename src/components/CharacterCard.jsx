import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

export default function CharacterCard({ character }) {
  const API_URL = import.meta.env.VITE_SERVER_URL
  const [isFavorite, setIsFavorite] = useState(false)

  //  comprobar si ya está en favoritos
  useState(() => {
    const checkFavorite = async () => {
      try {
        const res = await axios.get(`${API_URL}/favorites?id=${character.id}`)
        if (res.data.length > 0) setIsFavorite(true)
      } catch (err) {
        console.error("Error checking favorites:", err)
      }
    }
    checkFavorite()
  }, [])

  //  Añadir o eliminar de favoritos
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Si ya está en favoritos
        const res = await axios.get(`${API_URL}/favorites?id=${character.id}`)
        if (res.data.length > 0) {
          const favoriteId = res.data[0].id
          await axios.delete(`${API_URL}/favorites/${favoriteId}`)
          setIsFavorite(false)
          alert(`${character.name} eliminado de favoritos `)
        }
      } else {
        // Si no está en favoritos 
        await axios.post(`${API_URL}/favorites`, character)
        setIsFavorite(true)
        alert(`${character.name} añadido a favoritos `)
      }
    } catch (err) {
      console.error("Error manejando favoritos:", err)
    }
  }

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} className="character-img" />

      <h3>{character.name}</h3>
      <p><strong>Universe:</strong> {character.universe}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Threat:</strong> {character.threatLevel}</p>
      <p><strong>Power:</strong> {character.powerLevel}/100</p>
      <p><strong>Alignment:</strong> {character.alignment}</p>

      <div className="card-actions">
        <Link to={`/characters/${character.id}`} className="details-link">
          Ver Detalles →
        </Link>

        <button
          onClick={handleToggleFavorite}
          className={`fav-btn ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? " Remove Favorite" : " Add to Favorites"}
        </button>
      </div>
    </div>
  )
}
