import { Link } from 'react-router'

function GameCard({ game }) {
  const avg = game.avgRating ?? (game.reviews && game.reviews.length
    ? game.reviews.reduce((s, r) => s + (r.starRating || 0), 0) / game.reviews.length
    : 0)

  return (
    <div className='game-card card'>
      <Link to={`/games/${game._id}`} className='thumb'>
        {game.image ? (
          <img src={game.image} alt={game.title} className='game-image' />
        ) : (
          <div className='thumb-fallback' />
        )}
      </Link>

      <div className='body'>
        <h3>{game.title}</h3>
        <div className='flex' style={{justifyContent:'space-between'}}>
          <small className='muted'>{game.author?.username || ''}</small>
          <div className='rating'>{avg ? avg.toFixed(1) : '—'}</div>
        </div>
      </div>
    </div>
  )
}

export default GameCard