import React, { useState, useEffect } from 'react' 
import { withRouter, Redirect } from 'react-router-dom'
import NewReviewForm from './NewReviewForm.js'

const MovieShow = (props) => {
const [movie, setMovie] = useState(undefined)
console.log(movie)
const [filmsList, setFilmsList] = useState({ 
  movieId: "",
  userId: ""
})

const [watchList, setWatchList] = useState({
  movieId: "",
  userId: ""
})

const [reviews, setReviews] = useState([])

const [shouldRedirect, setShouldRedirect] = useState(false)

const [errorMessage, setErrorMessage] = useState([])

const movieId = props.match.params.id
const movieTitle = movie?.title

const getMovie = async () => {
  try {
    const response = await fetch(`/api/v1/movies/${movieId}`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();
    setMovie(body.movie);
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

const getReviews = async () => {
  try {
    const response = await fetch(`/api/v1/reviews/${movieId}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error 
    }
    const body = await response.json()
    setReviews(body.reviews)
    console.log(reviews)
  } catch (error) {
    throw error
  }
}

useEffect(() => {
  getMovie();
  getReviews()
  setFilmsList({
    movieId: props.match.params.id,
    userId: props.user.id
  });
  setWatchList({
    movieId: props.match.params.id,
    userId: props.user.id
  })
}, [])

let ListMessage
let filmsListIdArray = []
props.user.filmLists.map((film) => {
  filmsListIdArray.push(film.id)
})

const handleSubmit = () => {
if (filmsListIdArray.includes(movie.id)) {
  setErrorMessage("This film is already in your list!")
} else {
  postList(filmsList)
}}
  

const handleWatchListSubmit = () => {
  postWatchList(watchList)
  console.log(watchList)
}

const postList = async (newListData) => {
  try {
    const response = await fetch(`/api/v1/films-lists`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newListData),
    });

    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json();
        const newErrors = translateServerErrors(body.errors);
        return setErrors(newErrors);
      } else {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
    } else {
      const body = await response.json();
      console.log(body.filmsList)
      setShouldRedirect(true)
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

const postWatchList = async (newListData) => {
  try {
    const response = await fetch(`/api/v1/watch-lists`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newListData),
    });

    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json();
        const newErrors = translateServerErrors(body.errors);
        return setErrors(newErrors);
      } else {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
    } else {
      const body = await response.json();
      console.log(body.watchList)
      setShouldRedirect(true)
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

const postReview = async (newReviewData) => {
  try {
    const response = await fetch(`/api/v1/reviews`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newReviewData),
    });
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json();
        const newErrors = translateServerErrors(body.errors);
        return setErrors(newErrors);
      } else {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
    } else {
      const body = await response.json();
      const updatedReviews = props.user.reviews.concat(body.reviews)
      props.user.reviews = updatedReviews;
      setShouldRedirect(true)
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

let trueReviewList
let trueReviewMessage
if (reviews?.length === 0) {
trueReviewMessage = <h4 className="message-text">No reviews have been added for this film. </h4>
} else {
  trueReviewList = reviews?.map((review) => {
    return (
      <div className="movie-review">
        <h3> {review.title} </h3> 
        <h5> Rating: {review.rating}/10★ </h5> 
        <p> {review.body} </p>
      </div>
    )
    })
}

if (shouldRedirect) {
  return <Redirect to="/profile" />
}

return (
  <div className="movie-tile">
    <div className="movie-tile-contents">
    <h3 className="text-styling"> {movie?.fullTitle} </h3>
    <h4>{movie?.runtimeStr} - {movie?.contentRating}</h4>
    <img src={movie?.image} width="300" height="400"></img>
    <h4> Directed by: {movie?.directors} </h4>
    <h4> Rating: {movie?.imDbRating} </h4>
    <h4> Genres: {movie?.genres} </h4>
    <h4> Starring: {movie?.stars} </h4>
    <h5 className="body-styling"> <i>{movie?.plot}</i> </h5>
    <div className="container">
    <div  onClick={handleSubmit}>
          <input className="button" type="submit" value="Add to Films" />
        </div>
    <div onClick={handleWatchListSubmit}>
          <input className="button" type="submit" value="Add to Watch list" />
        </div>
    </div>
    <div> {errorMessage} </div>
    </div>
    <NewReviewForm user={props.user} movieId={movieId} postReview={postReview} movieTitle={movieTitle}/>
    <div> 
      <h1 className="title-review"> Reviews:</h1>
      {trueReviewList} {trueReviewMessage}
      </div>
  </div>
)
}

export default withRouter(MovieShow)