import { Link } from 'react-router'

function HomePage({ user }) {

  return (
    <div className='home-page'>

      <h1>Games Hub</h1>

      <p>"Games Hub is a platform that allows users to discover and play a collection of Omar Class games in one place. Users can browse games, play them, and leave their own reviews and ratings."</p>

      <Link to='/games'> <button>Browse Games</button> </Link>

    </div>
  )
}

export default HomePage