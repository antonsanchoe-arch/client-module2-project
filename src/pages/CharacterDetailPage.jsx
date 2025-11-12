import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const API_URL = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/characters/${id}`)
      .then((res) => setCharacter(res.data))
      .catch((err) => console.error("Error loading character:", err))
  }, [id])

  if (!character) return <p>Loading character details...</p>

  return (
    <div className="character-details">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="character-info">
        <img src={character.image} alt={character.name} className="character-detail-img" />
        <div className="character-data">
          <h2>{character.name}</h2>
          <p><strong>Universe:</strong> {character.universe}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Threat Level:</strong> {character.threatLevel}</p>
          <p><strong>Power Rating:</strong> {character.powerLevel}/100</p>
          <p><strong>Alignment:</strong> {character.alignment}</p>
          <h3>Story</h3>
          <p>{character.description}</p>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetailPage






