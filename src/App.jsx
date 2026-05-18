import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import GamesListPage from './pages/GamesListPage';
import GameDetailsPage from './pages/GameDetailsPage';
import GameFormPage from './pages/GameFormPage';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
        setUser(userInfo);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/games" element={<GamesListPage />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to='/'/>} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to='/'/>} />
        <Route path="/games/new" element={<GameFormPage user={user} />} />
        <Route path="/games/:gameId" element={<GameDetailsPage user={user} />} />
        <Route path="/games/:gameId/edit" element={<GameFormPage user={user} />} />
      </Routes>
    </div>
  );
}

export default App;