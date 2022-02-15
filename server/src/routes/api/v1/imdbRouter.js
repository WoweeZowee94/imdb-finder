import express from "express"

import ImdbAPIClient from "../../../../apiClient/ImdbClient.js"

const imdbRouter = new express.Router()

imdbRouter.get("/", async (req, res) => {
  const parameter = "Avengers"

  try {
    const imdbResponse = await ImdbAPIClient.getMovies(parameter)
    const movieData = JSON.parse(imdbResponse)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ movies: movieData })
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default imdbRouter