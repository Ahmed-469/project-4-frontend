import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function FavoriteGamesPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true)
      try {
        const favRaw = localStorage.getItem('favoriteGames') || '[]'
        const favIds = JSON.parse(favRaw)
        if (!favIds || favIds.length === 0) {
          setGames([])
          return
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`)
        const all = response.data
        const favGames = all.filter(g => favIds.includes(g._id))
        setGames(favGames)
      } catch (err) {
        console.error(err)
        setError('Failed to load favorite games.')
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  if (loading) return <div>Loading favorites...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='favorites-page'>
        <h1>My Favorites</h1>

      {games.length === 0 ? (
        <p>You have no favorite games yet.</p>
      ) : (
        <div className='games-grid'>
          {games.map(g => (
            <GameCard key={g._id} game={g} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoriteGamesPage
