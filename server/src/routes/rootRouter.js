import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import imdbRouter from "./api/v1/imdbRouter.js"
import clientRouter from "./clientRouter.js";
import filmsListRouter from "./api/v1/filmsListRouter.js";
import watchListRouter from "./api/v1/watchListRouter.js";
import reviewRouter from "./api/v1/reviewRouter.js";
import topMoviesRouter from "./api/v1/topMoviesRotuer.js";


const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/movies", imdbRouter)
rootRouter.use("/api/v1/films-lists", filmsListRouter)
rootRouter.use("/api/v1/watch-lists", watchListRouter)
rootRouter.use("/api/v1/reviews", reviewRouter)
rootRouter.use("/api/v1/top-250", topMoviesRouter)

export default rootRouter;
