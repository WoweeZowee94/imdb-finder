import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  let id = req.user.id 
  try {
    const user = await User.query()
    user.filmLists = user.$relatedQuery("filmslists")
    return res.status(201).json({user: user})
  } catch (error) {
    return res.status(422).json({ errors: error })
  }
})

export default usersRouter;
