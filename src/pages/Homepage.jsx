import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function HomePage({ user }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`)
        setGames(res.data)
      } catch (err) {
        console.error('Failed loading games on homepage', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  const withAvg = games.map(g => {
    const avg = g.reviews && g.reviews.length
      ? g.reviews.reduce((s, r) => s + (r.starRating || 0), 0) / g.reviews.length
      : 0
    return { ...g, avgRating: avg }
  })

  const topRated = [...withAvg].sort((a, b) => b.avgRating - a.avgRating).slice(0, 4)

  return (
    <div className='home-page container'>
      <section className='hero card'>
        <div className='hero-inner'>
          <div>
            <h1 className='hero-title'>Games Hub</h1>
            <p className='hero-sub'>Discover the best games, read reviews, and play directly from here.</p>
            <Link to='/games'><button className='btn'>Browse Games</button></Link>
          </div>
          <div className='hero-graphic' aria-hidden />
        </div>
      </section>

      <section className='top-rated'>
        <h2>Top Rated</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='games-grid'>
            {topRated.map(game => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

export default HomePage