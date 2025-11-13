import { useEffect, useState } from "react"
import axios from "axios"
import CharacterCard from "../components/CharacterCard.jsx"
import { Link } from "react-router-dom"

export default function CharactersPage() {
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const API_URL = import.meta.env.VITE_SERVER_URL

  //  Cargar personajes 
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        console.log("Fetching from:", `${API_URL}/characters`)
        const res = await axios.get(`${API_URL}/characters`)

        // json-server devuelve directamente un array
        if (Array.isArray(res.data)) {
          setCharacters(res.data)
        } else if (Array.isArray(res.data.characters)) {
          setCharacters(res.data.characters)
        } else {
          console.warn("Unexpected data format:", res.data)
        }
      } catch (err) {
        console.error("Error loading characters:", err)
      } finally {
        setIsLoading(false)
      }
      
    }

    fetchCharacters()
  }, [API_URL])

  //  Eliminar personaje 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/characters/${id}`)
      // Actualizar lista de characters
      setCharacters((prev) => prev.filter((char) => char.id !== id))
    } catch (err) {
      console.error("Error deleting character:", err)
    }
  }

  if (isLoading) return <p className="loading-text">Loading characters...</p>

  if (characters.length === 0)
    return <p className="error-text">There are no characters.</p>

  return (
    <div className="characters-page">
      <h1>Characters</h1>

      <div className="characters-grid">
        {characters.map((char) => (
          <div key={char.id} className="character-card-container">
            {/* Tarjeta del personaje */}
            <CharacterCard character={char} />

            {/* Botones de acción */}
            <div className="card-actions">
              <Link to={`/edit/${char.id}`} className="edit-btn">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(char.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}




