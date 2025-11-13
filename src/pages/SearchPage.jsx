import { useState, useEffect } from "react"
import axios from "axios"
import CharacterCard from "../components/CharacterCard.jsx"

export default function SearchPage() {
  const [query, setQuery] = useState("") // texto de búsqueda
  const [results, setResults] = useState([]) // resultados de personajes
  const [filters, setFilters] = useState({
    universe: "", 
    species: "", 
    alignment: "", //  héroe o villano
  })

  const [universes, setUniverses] = useState([]) // lista de universos
  const [speciesList, setSpeciesList] = useState([]) // lista de especies
  const API_URL = import.meta.env.VITE_SERVER_URL

  //pedimos los personajes para poblar los selectores
  useEffect(() => {
    axios
      .get(`${API_URL}/characters`)
      .then((res) => {
        const chars = res.data

        //Creamos listas únicas para los filtros
        const uniqueUniverses = [...new Set(chars.map((c) => c.universe))].sort()
        const uniqueSpecies = [...new Set(chars.map((c) => c.species))].sort()

        setUniverses(uniqueUniverses)
        setSpeciesList(uniqueSpecies)
      })
      .catch((err) => console.error(" Error chargind data from the filter:", err))
  }, [API_URL])

  //  Manejador del campo de búsqueda y los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  //  Función que construye la query y llama a la API
  const handleSearch = async () => {
    try {
      const params = []

      //  Búsqueda por nombre parcial
      if (query) params.push(`name_like=${query}`)

      //  Filtro por universo 
      if (filters.universe) params.push(`universe=${filters.universe}`)

      //  Filtro por especie
      if (filters.species) params.push(`species=${filters.species}`)

      //  Filtro por héroe o villano
      if (filters.alignment) params.push(`alignment=${filters.alignment}`)

      //  Unimos todos los filtros
      const queryString = params.length > 0 ? `?${params.join("&")}` : ""

      const res = await axios.get(`${API_URL}/characters${queryString}`)
      setResults(res.data)
    } catch (err) {
      console.error(" Error searching or filtering:", err)
    }
  }

  //  Al cambiar filtros o texto, se actualiza automáticamente
  useEffect(() => {
    handleSearch()
  }, [query, filters]) 

  return (
    <div className="search-page">
      <h1> search characters</h1>

      {/*  CONTROLES DE BÚSQUEDA Y FILTRO  */}
      <div className="search-controls">

        {/* NOMBRE */}
        <input
          type="text"
          value={query}
          placeholder="search by name..."
          onChange={(e) => setQuery(e.target.value)}
        />

        {/*  FILTRO DE UNIVERSO */}
        <select name="universe" value={filters.universe} onChange={handleFilterChange}>
          <option value="">All the universes</option>
          {universes.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        {/*  FILTRO DE ESPECIE */}
        <select name="species" value={filters.species} onChange={handleFilterChange}>
          <option value="">all the species</option>
          {speciesList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/*  FILTRO DE rol */}
        <select name="alignment" value={filters.alignment} onChange={handleFilterChange}>
          <option value="">all</option>
          <option value="Hero">Heroes</option>
          <option value="Villain">Villains</option>
        </select>

        {/*  BOTÓN DE BÚSQUEDA  */}
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/*  RESULTADOS  */}
      <div className="search-results">
        {results.length === 0 ? (
          <p>any character with that name</p>
        ) : (
          results.map((char) => <CharacterCard key={char.id} character={char} />)
        )}
      </div>
    </div>
  )
}
