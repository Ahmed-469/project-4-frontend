import { useState, useEffect } from 'react';

function ReviewForm({ review, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    text: '',
    starRating: 5,
  });

  useEffect(() => {
    if (review) {
      setFormData({
        text: review.text || '',
        starRating: review.starRating || 5,
      });
    }
  }, [review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'starRating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Your Review:</label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Share your thoughts about this game..."
          required
        />
      </div>

      <div>
        <label htmlFor="starRating">Rating:</label>
        <select
          id="starRating"
          name="starRating"
          value={formData.starRating}
          onChange={handleChange}
        >
          <option value={1}>⭐  </option>
          <option value={2}>⭐⭐ </option>
          <option value={3}>⭐⭐⭐ </option>
          <option value={4}>⭐⭐⭐⭐ </option>
          <option value={5}>⭐⭐⭐⭐⭐ </option>
        </select>
      </div>

      <div>
        <button type="submit">
          {review ? 'Update Review' : 'Submit Review'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
