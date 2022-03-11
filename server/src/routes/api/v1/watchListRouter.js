import express from "express";
import objection from "objection";
import { WatchList } from "../../../models/index.js";
const { ValidationError } = objection;

const watchListRouter = new express.Router();

watchListRouter.post("/", async (req, res) => {
  const listInput = req.body;
  const { movieId, userId } = listInput;
  try {
    const newList = await WatchList.query().insertAndFetch({ userId, movieId });
    return res.status(201).json({ watchList: newList });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

watchListRouter.delete("/", async (req, res) => {
  const id = req.body.watchId;
  try {
    const deletedWatchInfo = await WatchList.query()
      .where("movieId", "=", `${id}`)
      .andWhere("userId", "=", req.user.id);
    await WatchList.query().delete().where("movieId", "=", `${id}`);
    return res.status(200).json({ deletedWatch: deletedWatchInfo });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default watchListRouter;
