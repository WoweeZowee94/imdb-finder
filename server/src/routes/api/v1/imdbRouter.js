import express from "express"

import ImdbAPIClient from "../../../apiClient/ImdbClient.js"

const imdbRouter = new express.Router()

imdbRouter.get("/", async (req, res) => {
  console.log(req.query)
  const title = req.query.title 
  try {
    const imdbTitleResponse = await ImdbAPIClient.getMovies(title)
    const movieData = JSON.parse(imdbTitleResponse)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ movies: movieData })
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

imdbRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    console.log("IN THE ROUTER")
    console.log(ImdbAPIClient)
    const imdbMovieResponse = await ImdbAPIClient.getTitle(id)
    const idData = JSON.parse(imdbMovieResponse)
    return res
    .set({ "Content-Type": "application/json" })
    .status(200)
    .json({ movie: idData })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ errors: error })
  }
})

export default imdbRouter