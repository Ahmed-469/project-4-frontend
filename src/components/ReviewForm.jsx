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
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-row">
        <label htmlFor="text">Your review</label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Share your thoughts about this game..."
          required
          rows={5}
        />
      </div>

      <div className="form-row" style={{display:'flex',gap:12,alignItems:'center'}}>
        <div style={{flex:'0 0 180px'}}>
          <label htmlFor="starRating">Rating</label>
          <select
            id="starRating"
            name="starRating"
            value={formData.starRating}
            onChange={handleChange}
          >
            <option value={1}>1 — ⭐</option>
            <option value={2}>2 — ⭐⭐</option>
            <option value={3}>3 — ⭐⭐⭐</option>
            <option value={4}>4 — ⭐⭐⭐⭐</option>
            <option value={5}>5 — ⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          <button type="submit" className="btn">{review ? 'Update' : 'Submit'}</button>
          <button type="button" onClick={onCancel} className="btn ghost">Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
