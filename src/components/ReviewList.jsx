function ReviewList({ reviews, currentUserId, onEdit, onDelete }) {
  const renderStars = (rating) => {
    const filledStars = '⭐'.repeat(Math.max(0, Math.min(5, rating)));
    const emptyStars = '☆'.repeat(5 - Math.max(0, Math.min(5, rating)));
    return `${filledStars}${emptyStars}`;
  };

  return (
    <div className="reviews-list">
      {reviews.length === 0 && <p className="muted">No reviews yet — be the first to write one.</p>}
      {reviews.map((review) => (
        <div key={review._id} className='review-card'>
          <div className='review-head'>
            <h4>{review.author.username}</h4>
            <div className='muted'>{renderStars(review.starRating)}</div>
          </div>
          <p className='review-text'>{review.text}</p>

          {currentUserId === review.author._id && (
            <div className='review-actions'>
              <button className='btn ghost' onClick={() => onEdit(review._id)}>Edit</button>
              <button className='btn ghost' onClick={() => onDelete(review._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ReviewList