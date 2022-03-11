import express from "express";
import Objection from "objection";
import { Review } from "../../../models/index.js";
const { ValidationError } = Objection;

const reviewRouter = new express.Router();

reviewRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reviews = await Review.query().where("movieId", "=", `${id}`);
    //   const idData = JSON.parse(reviews)
    return res.set({ "Content-Type": "application/json" }).status(200).json({ reviews: reviews });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: error });
  }
});

reviewRouter.post("/", async (req, res) => {
  const formInput = req.body;
  console.log(req.body);
  const { title, rating, body, userId, movieId, movieTitle } = formInput;
  try {
    const newReview = await Review.query().insertAndFetch({
      title,
      rating,
      body,
      userId,
      movieId,
      movieTitle,
    });
    return res.status(201).json({ reviews: newReview });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default reviewRouter;
