import { Link } from 'react-router'
import { useState, useEffect } from 'react'

function GameCard({ game }) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('favoriteGames') || '[]')
      setIsFav(favs.includes(game._id))
    } catch (err) {
      setIsFav(false)
    }
  }, [game._id])

  function toggleFavorite(e) {
    e.preventDefault()
    try {
      const raw = localStorage.getItem('favoriteGames') || '[]'
      const favs = JSON.parse(raw)
      let next = []
      if (favs.includes(game._id)) {
        next = favs.filter(id => id !== game._id)
        setIsFav(false)
      } else {
        next = [...favs, game._id]
        setIsFav(true)
      }
      localStorage.setItem('favoriteGames', JSON.stringify(next))
    } catch (err) {
      console.error('Failed to update favorites', err)
    }
  }

  return (
    <div className='game-card'>

      <Link to={`/games/${game._id}`}>
        <img 
          src={game.image} 
          alt={game.title} 
          className='game-image'
        />
      </Link>

      <div className='game-card-header'>
        <h3>{game.title}</h3>
        <button
          className={isFav ? 'heart fav' : 'heart'}
          onClick={toggleFavorite}
          aria-label='toggle favorite'
          aria-pressed={isFav}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>

    </div>
  )
}

export default GameCard