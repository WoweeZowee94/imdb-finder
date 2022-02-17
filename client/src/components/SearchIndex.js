import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const SearchIndex= (props) => {
  const [movies, setMovies] = useState(undefined);
  const [parameter, setParameter] = useState({ 
    title: "" 
  })
  
  const getMovies = async () => {
    try {
      const response = await fetch(`/api/v1/movies?title=${parameter.title}}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setMovies(body.movies);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  
  const handleInputChange = (event) => {
    console.log(parameter.title)
    setParameter({
      ...parameter,
      [event.currentTarget.name]: event.currentTarget.value 
    })
  }
  
  const handleSubmit = async (event) => {
    getMovies()
    event.preventDefault();
  }

  let moviesList = movies?.results.map((movie) => {
    return (
      <div className="movie-tile" key={movie.id}>
        <div className="movie-tile-contents">
          <h2> <Link to={`/movies/${movie.id}`}> {movie.title} </Link> </h2>
          <h3> {movie.description} - {movie.runtimeStr} </h3>
          <img src={movie.image} width="300" height="400" className="movie-image"/>
          <h3> <b>Rating:</b> {movie.imDbRating} </h3>
          <h4> <b>Genres:</b> {movie.genres} </h4>
          <h4> <b>Cast:</b> {movie.stars} </h4>
          <h5> {movie.plot} </h5>
        </div>
      </div>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
        <label>
          Search:
          <input type="text" name="title" onChange={handleInputChange} value={parameter.title} />
        </label>
        <div className="button">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
      <h2 className="movie-results">Total Results: {movies?.results.length} of 50 </h2>
      <ul className="movies-list">{moviesList}</ul>
    </div>
  );
};

export default SearchIndex;