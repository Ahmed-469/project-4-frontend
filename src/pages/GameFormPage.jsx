import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import GameForm from '../components/GameForm';

function GameFormPage({ user }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(gameId ? true : false);
  const [error, setError] = useState(null);

  // Fetch game data if editing
  useEffect(() => {
    if (!gameId) return;

    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:3000/games/${gameId}`);
        if (!response.ok) throw new Error('Game not found');
        const data = await response.json();

        // Check if user is the owner
        if (user && data.author._id === user._id) {
          setGame(data);
        } else {
          setError('Not authorized to edit this game');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId, user]);

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const url = gameId
        ? `http://localhost:3000/games/${gameId}`
        : 'http://localhost:3000/games';

      const method = gameId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save game');

      const savedGame = await response.json();
      navigate(`/games/${savedGame._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    if (gameId) {
      navigate(`/games/${gameId}`);
    } else {
      navigate('/games');
    }
  };

  if (!user) {
    return <div>Please sign in to create or edit games</div>;
  }

  if (user.role !== 'owner') {
    return <div>Only owners can create or edit games</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="game-form-page">
      <h1>{gameId ? 'Edit Game' : 'Create New Game'}</h1>
      <GameForm
        game={game}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default GameFormPage;