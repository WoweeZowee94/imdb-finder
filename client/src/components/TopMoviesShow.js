import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TopMovies = (props) => {
  const [topMovies, setTopMovies] = useState(null)
  
  const getTopMovies = async () => {
    try {
      const response = await fetch(`api/v1/top-250`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setTopMovies(body.topMovies)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTopMovies()
  }, [])

  const topMoviesList = topMovies?.items.map((movie) => {
    return (
      <div className="movie-tile" key={movie.id}>
        <div className="movie-tile-contents">
          <h2 className="text-styling"> #{movie.rank} - {movie.title} </h2>
          <h3 className="text-styling"> {movie.year}</h3>
          <Link to={`/movies/${movie.id}`}>
            <img src={movie.image} width="300" height="300" className="movie-image"/>
          </Link>
          <h3 className="text-styling"> <b>Rating:</b> {movie.imDbRating} </h3>
        </div>
      </div>
    )
  })

  console.log(topMovies)
  return (
    <div>
    <h1 className='profile-heading'> Top 250 Films: </h1>
    <p> {topMoviesList} </p>
    </div>
  )


}

export default TopMovies 