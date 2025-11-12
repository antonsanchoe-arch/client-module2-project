import { useState } from "react"
import axios from "axios"

export default function CreateCharacter() {
  const API_URL = import.meta.env.VITE_SERVER_URL

  const [form, setForm] = useState({
    name: "",
    universe: "",
    species: "",
    threatLevel: "",
    powerLevel: "",
    alignment: "Hero",
    isHero: true,
    description: "",
    image: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/characters`, form)
      alert("Character created successfully!")
      setForm({
        name: "",
        universe: "",
        species: "",
        threatLevel: "",
        powerLevel: "",
        alignment: "Hero",
        isHero: true,
        description: "",
        image: ""
      })
    } catch (err) {
      console.error("Error creating character:", err)
    }
  }

  return (
    <div className="create-page">
      <h1>Create a New Character</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="universe" placeholder="Universe" value={form.universe} onChange={handleChange} required />
        <input name="species" placeholder="Species" value={form.species} onChange={handleChange} required />
        <input name="threatLevel" placeholder="Threat Level" value={form.threatLevel} onChange={handleChange} required />
        <input name="powerLevel" type="number" placeholder="Power Level (0-100)" value={form.powerLevel} onChange={handleChange} required />
        <select name="alignment" value={form.alignment} onChange={handleChange}>
          <option value="Hero">Hero</option>
          <option value="Villain">Villain</option>
        </select>
        <textarea name="description" placeholder="Description / Story" value={form.description} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button type="submit">Create Character</button>
      </form>
    </div>
  )
}



