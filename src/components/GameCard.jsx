import { Link } from 'react-router'

function GameCard({ game }) {
  return (
    <div className='game-card'>

      <Link to={`/games/${game._id}`}>
        <img 
          src={game.image} 
          alt={game.title} 
          className='game-image'
        />
      </Link>

      <h3>{game.title}</h3>

    </div>
  )
}

export default GameCard