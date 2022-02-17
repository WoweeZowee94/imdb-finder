import React, { useState, useEffect } from 'react' 

const MovieShow = (props) => {
const [movie, setMovie] = useState(undefined)

const movieId = props.match.params.id

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

useEffect(() => {
  getMovie();
}, [])

console.log(movie)
return (
  <div className="movie-tile">
    <div className="movie-tile-contents">
    <h3> {movie?.fullTitle} </h3>
    <h4>{movie?.runtimeStr} - {movie?.contentRating}</h4>
    <img src={movie?.image} width="300" height="400"></img>
    <h4> Directed by: {movie?.directors} </h4>
    <h4> Rating: {movie?.imDbRating} </h4>
    <h4> Genres: {movie?.genres} </h4>
    <h4> Starring: {movie?.stars} </h4>
    <h5> {movie?.plot} </h5>
    </div>
  </div>
)
}

export default MovieShow