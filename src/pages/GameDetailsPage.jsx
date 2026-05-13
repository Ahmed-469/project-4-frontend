import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

function GameDetailsPage({ user }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  const fetchGame = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/games/${gameId}`);
      if (!response.ok) throw new Error('Game not found');
      const data = await response.json();
      setGame(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setGame(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (!game || game.reviews.length === 0) return 0;
    const total = game.reviews.reduce((sum, review) => sum + review.starRating, 0);
    return (total / game.reviews.length).toFixed(1);
  };

  const handleDeleteGame = async () => {
    if (!window.confirm('Are you sure you want to delete this game?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/games/${gameId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete game');
      navigate('/games');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const token = localStorage.getItem('token');

      if (editingReviewId) {
        // Update review
        const response = await fetch(
          `http://localhost:3000/games/${gameId}/reviews/${editingReviewId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reviewData),
          }
        );

        if (!response.ok) throw new Error('Failed to update review');
        setEditingReviewId(null);
      } else {
        // Create review
        const response = await fetch(`http://localhost:3000/games/${gameId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        });

        if (!response.ok) throw new Error('Failed to add review');
      }

      fetchGame();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/games/${gameId}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete review');
      fetchGame();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!game) return <div>Game not found</div>;

  const isOwner = user && user._id === game.author._id;

  return (
    <div className="game-details">
      {/* Game Info Section */}
      <section className="game-info">
        <h1>{game.title}</h1>
        <img src={game.image} alt={game.title} className="game-image" />

        {/* Rating */}
        <div className="rating">
          <p>
            Average Rating: <strong>⭐ {calculateAverageRating()}</strong> (
            {game.reviews.length} reviews)
          </p>
        </div>

        {/* Author */}
        <p className="author">By: <strong>{game.author.username}</strong></p>

        {/* Description */}
        <div className="description">
          <h3>About this game:</h3>
          <p>{game.description}</p>
        </div>

        {/* Game Iframe */}
        <div className="game-player">
          <iframe
            src={game.gameUrl}
            title={game.title}
            width="100%"
            height="600px"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="owner-actions">
            <button onClick={() => navigate(`/games/${gameId}/edit`)}>
              Edit Game
            </button>
            <button onClick={handleDeleteGame} className="delete-btn">
              Delete Game
            </button>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Reviews</h2>

        {user ? (
          <ReviewForm
            review={editingReviewId ? game.reviews.find(r => r._id === editingReviewId) : null}
            onSubmit={handleReviewSubmit}
            onCancel={() => setEditingReviewId(null)}
          />
        ) : (
          <p>
            <a href="/sign-in">Sign in</a> to leave a review
          </p>
        )}

        <ReviewList
          reviews={game.reviews}
          currentUserId={user?._id}
          onEdit={setEditingReviewId}
          onDelete={handleReviewDelete}
        />
      </section>
    </div>
  );
}

export default GameDetailsPage;