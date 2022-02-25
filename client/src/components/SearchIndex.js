import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const SearchIndex= (props) => {
  const [movies, setMovies] = useState(undefined);
  const [parameter, setParameter] = useState({ 
    title: "" 
  })
  
  const getMovies = async () => {
    try {
      const response = await fetch(`/api/v1/movies?title=${parameter.title}`);
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
          <h2 className="text-styling"> {movie.title} </h2>
          <h3 className="text-styling"> {movie.description} - {movie.runtimeStr} </h3>
          <Link to={`/movies/${movie.id}`}>
            <img src={movie.image} width="300" height="300" className="movie-image"/>
          </Link>
          <h3 className="text-styling"> <b>Rating:</b> {movie.imDbRating} </h3>
        </div>
      </div>
      
    );
  });

  let totalResults = 0
  if (movies?.results.length > 0) {
    totalResults = movies?.results.length
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
        <label className="search-label">
          <h4>Search:</h4>
          <input type="text" name="title" onChange={handleInputChange} value={parameter.title} />
        </label>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
      <h2 className="movie-results">Total Results: {totalResults} of 50 </h2>
      <div className="grid-container">
      <ul className="movies-list">{moviesList}</ul>
      </div>
      </div>
  );
};

export default SearchIndex;