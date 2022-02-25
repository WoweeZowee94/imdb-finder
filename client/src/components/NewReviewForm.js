import React, { useState } from "react";

const NewReviewForm = ({ user, movieId, postReview, movieTitle }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    body: "",
    rating: "",
    userId: user.id,
    movieId: movieId,
    movieTitle: movieTitle
  });

  console.log(newReview);
  newReview.movieTitle = movieTitle

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    setNewReview({
      title: "",
      rating: "",
      body: "",
      userId: user.id,
      movieId: movieId,
      movieTitle: movieTitle
    })
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    postReview(newReview)
    clearForm()
  }

  return (
    <div className="review-form">
      <h3 className="review-form-title"> Add a Review: </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>
            Title:
            <input 
            type="text" 
            name="title" 
            onChange={handleInputChange} 
            value={newReview.title} />
          </label>

          <label>
            Body:
            <input
              type="text"
              className="review-body"
              name="body"
              onChange={handleInputChange}
              value={newReview.body}
            />
          </label>

          <label>
            Rating (1 - 10):
            <input
              className="number-field"
              type="number"
              name="rating"
              onChange={handleInputChange}
              value={newReview.rating}
              min="1"
              max="10"
            />
          </label>

          <div className="button">
            <input className="button" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReviewForm;
