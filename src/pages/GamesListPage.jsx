import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function GamesListPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`)
        setGames(response.data)
      } catch (err) {
        setError('Failed to load games. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  if (loading) {
    return <div>Loading games...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='games-list-page'>
      <h1>All Games</h1>

      {games.length === 0 ? (
        <p>No games available.</p>
      ) : (
        <div className='games-grid'>
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}

export default GamesListPage