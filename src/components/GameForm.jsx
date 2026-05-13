import { useState, useEffect } from 'react';

function GameForm({ game, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gameUrl: '',
    image: '',
  });

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || '',
        description: game.description || '',
        gameUrl: game.gameUrl || '',
        image: game.image || '',
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Game Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="gameUrl">Game URL:</label>
        <input
          type="url"
          id="gameUrl"
          name="gameUrl"
          value={formData.gameUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="image">Game Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="e.g., /images/game.jpg"
          required
        />
      </div>

      <div>
        <button type="submit">
          {game ? 'Save Changes' : 'Create Game'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default GameForm;
