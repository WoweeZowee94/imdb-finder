import express from "express";
import passport from "passport";
import ImdbAPIClient from "../../../apiClient/ImdbClient.js";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json(undefined);
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    const watchLists = await req.user.$relatedQuery("watchlists")
    const filmLists = await req.user.$relatedQuery("filmslists")
    const reviews = await req.user.$relatedQuery("reviews")
    console.log(filmLists)

      const getTitleCall = async (id) => {
        const film = await ImdbAPIClient.getTitle(id)
        return film
      }
      
      let queryFilmList = await Promise.all(
          filmLists.map( async (film) => {
            try{
            const returnedFilm =  await getTitleCall(film.movieId)
            console.log(returnedFilm)
            const parsedFilm = JSON.parse(returnedFilm)
            console.log(parsedFilm)
            return parsedFilm
          }  catch (error) {
            throw error 
          }
          })
        )

        let queryWatchList = await Promise.all(
          watchLists.map( async (film) => {
            try{
            const returnedFilm =  await getTitleCall(film.movieId)
            console.log(returnedFilm)
            const parsedFilm = JSON.parse(returnedFilm)
            console.log(parsedFilm)
            return parsedFilm
          }  catch (error) {
            throw error 
          }
          })
        )

    req.user.filmLists = queryFilmList
    req.user.watchLists = queryWatchList
    req.user.reviews = reviews
    res.status(200).json(req.user);
    console.log(req.user)
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

export default sessionRouter;
