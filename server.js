const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Cache em memória: { [pokemonId]: { data, timestamp } }
const cache = new Map()
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 horas

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// Busca Pokémon por ID, com cache
async function fetchPokemon(id) {
  const cached = cache.get(id)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  ])

  if (!pokemonRes.ok || !speciesRes.ok) {
    throw new Error(`Pokémon #${id} não encontrado`)
  }

  const [pokemon, species] = await Promise.all([
    pokemonRes.json(),
    speciesRes.json()
  ])

  // Extrai só o que o quiz precisa (não guarda o JSON gigante inteiro)
  const flavorEntry = species.flavor_text_entries.find(e => e.language.name === 'pt-BR')
    || species.flavor_text_entries.find(e => e.language.name === 'en')

  const data = {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map(t => t.type.name),
    image: pokemon.sprites.other['official-artwork'].front_default,
    stats: pokemon.stats.slice(0, 4).map(s => ({
      name: s.stat.name,
      value: s.base_stat
    })),
    description: flavorEntry
      ? flavorEntry.flavor_text.replace(/\f/g, ' ')
      : 'Um Pokémon misterioso.'
  }

  cache.set(id, { data, timestamp: Date.now() })
  return data
}

// GET /api/pokemon/:id
app.get('/api/pokemon/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id) || id < 1 || id > 1025) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    const data = await fetchPokemon(id)
    res.json(data)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: 'Erro ao buscar Pokémon' })
  }
})

// GET /api/cache/stats — utilitário pra ver o cache
app.get('/api/cache/stats', (req, res) => {
  res.json({ cached: cache.size, ids: [...cache.keys()] })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
