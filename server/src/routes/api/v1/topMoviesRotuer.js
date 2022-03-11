import express from "express";
import ImdbAPIClient from "../../../apiClient/ImdbClient.js";

const topMoviesRouter = new express.Router();

topMoviesRouter.get("/", async (req, res) => {
  try {
    const topMoviesResponse = await ImdbAPIClient.getTopMovies();
    const topMovieData = JSON.parse(topMoviesResponse);
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ topMovies: topMovieData });
  } catch (error) {
    return res.status(401).json({ errors: error });
  }
});

export default topMoviesRouter;
