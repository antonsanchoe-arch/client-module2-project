import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export default function EditCharacter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_SERVER_URL

  const [character, setCharacter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  //  Cargar personaje por ID
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(`${API_URL}/characters/${id}`)
        setCharacter(res.data)
      } catch (err) {
        console.error("Error loading character:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCharacter()
  }, [API_URL, id])

  //  Cambiar valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setCharacter((prev) => ({ ...prev, [name]: value }))
  }

  //  Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/characters/${id}`, character)
      navigate("/characters") 
    } catch (err) {
      console.error("Error updating character:", err)
    }
  }

  if (isLoading) return <p>Loading character...</p>
  if (!character) return <p>Character not found.</p>

  return (
    <div className="edit-page">
      <h1>Edit Character</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={character.name || ""}
          onChange={handleChange}
        />

        <label>Universe</label>
        <input
          type="text"
          name="universe"
          value={character.universe || ""}
          onChange={handleChange}
        />

        <label>Species</label>
        <input
          type="text"
          name="species"
          value={character.species || ""}
          onChange={handleChange}
        />

        <label>Alignment</label>
        <select
          name="alignment"
          value={character.alignment || ""}
          onChange={handleChange}
        >
          <option value="Hero">Hero</option>
          <option value="Villain">Villain</option>
        </select>

        <label>Power Level</label>
        <input
          type="number"
          name="powerLevel"
          value={character.powerLevel || ""}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={character.description || ""}
          onChange={handleChange}
        />

        <button type="submit">Save Changes </button>
      </form>
    </div>
  )
}
