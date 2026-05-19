import { Link } from 'react-router'

function Navbar({ user, setUser }) {


  function logOut(){
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <div>
      {/* Routes seen by everyone */}
      <Link className='nav-item' to='/'>HomePage</Link>

      <Link className='nav-item' to='/games'>Games</Link>
      
      <Link className='nav-item' to='/favorites'>Favorites</Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>

        {user.role === 'owner' && (
            <Link className='nav-item' to='/games/new'>Add Game</Link>
          )}

        <span className='nav-item'>{user.username}</span>
       
        <button className='nav-item' onClick={logOut}>Log Out</button>


        </>
      ) :
      (
        // links for not logged in users
        <>
        <Link className='nav-item' to='/sign-up'>Sign up</Link>
        <Link className='nav-item' to='/sign-in'>Sign in</Link>

        </>
      )
      }
    </div>
  )
}

export default Navbar