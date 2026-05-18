function ReviewList({ reviews, currentUserId, onEdit, onDelete }) {
  const renderStars = (rating) => {
    const filledStars = '⭐'.repeat(Math.max(0, Math.min(5, rating)));
    const emptyStars = '☆'.repeat(5 - Math.max(0, Math.min(5, rating)));
    return `${filledStars}${emptyStars}`;
  };

  return (
    <div>
      <h2>Reviews</h2>

      {reviews.map((review) => (
        <div key={review._id} className='review-card'>
          <h4>{review.author.username}</h4>
          <p>{review.text}</p>
          <p>{renderStars(review.starRating)}</p>

          {currentUserId === review.author._id && (
            <div>
              <button onClick={() => onEdit(review._id)}>Edit Review</button>
              <button onClick={() => onDelete(review._id)}>Delete Review</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ReviewList