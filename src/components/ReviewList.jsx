function ReviewList({ reviews, user, handleDeleteReview }) {

  return (
    <div>
      <h2>Reviews</h2>

      {reviews.map((review) => (
        <div key={review._id} className='review-card'>

          <h4>{review.author.username}</h4>

          <p>{review.text}</p>

          <p>{review.starRating}</p>

          {user && user._id === review.author._id && (
            <div>

              <button>Edit Review</button>

              <button onClick={() => handleDeleteReview(review._id)}>
                Delete Review
              </button>

            </div>
          )}

        </div>
      ))}

    </div>
  )
}

export default ReviewList