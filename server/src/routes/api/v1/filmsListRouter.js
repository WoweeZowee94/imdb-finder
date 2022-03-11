import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { FilmsList } from "../../../models/index.js";
import { User } from "../../../models/index.js";

const filmsListRouter = new express.Router();

filmsListRouter.post("/", async (req, res) => {
  const listInput = req.body;
  const { movieId, userId } = listInput;
  try {
    const newList = await FilmsList.query().insertAndFetch({ userId, movieId });
    return res.status(201).json({ filmsList: newList });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

filmsListRouter.delete("/", async (req, res) => {
  const id = req.body.listId;
  try {
    const deletedFilmInfo = await FilmsList.query()
      .where("movieId", "=", `${id}`)
      .andWhere("userId", "=", req.user.id);
    await FilmsList.query().delete().where("movieId", "=", `${id}`);
    return res.status(200).json({ deletedFilm: deletedFilmInfo });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default filmsListRouter;
