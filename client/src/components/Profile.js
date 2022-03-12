import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getCurrentUser from "../services/getCurrentUser.js";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [filmList, setFilmList] = useState(null);
  const [watchList, setWatchList] = useState(null);
  const [reviews, setReviews] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setFilmList(currentUser.filmLists);
      setWatchList(currentUser.watchLists);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  let handleClick = async (props) => {
    let removeItem = props.listId;
    console.log(removeItem);
    await removeFilm(props);
  };

  let handleWatchClick = async (props) => {
    let removeWatchItem = props.watchId;
    console.log(removeWatchItem);
    await removeWatch(props);
  };

  const updateFilms = async (deletedFilm) => {
    let newFilms = [];
    filmList.forEach((film) => {
      if (film.id !== deletedFilm[0].movieId) {
        newFilms.push(film);
      }
    });
    setFilmList(newFilms);
  };

  const updateWatch = async (deletedFilm) => {
    let newWatchList = [];
    watchList.forEach((film) => {
      if (film.id !== deletedFilm[0].movieId) {
        newWatchList.push(film);
      }
    });
    setWatchList(newWatchList);
  };

  const removeFilm = async (id) => {
    try {
      const response = await fetch("/api/v1/films-lists", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      const deletedFilm = body.deletedFilm;
      updateFilms(deletedFilm);
      return true;
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const removeWatch = async (id) => {
    try {
      const response = await fetch("/api/v1/watch-lists", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      const deletedWatch = body.deletedWatch;
      console.log("deletedWatch", deletedWatch);
      updateWatch(deletedWatch);
      return true;
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let trueWatchList;
  let watchListMessage;
  if (watchList?.length === 0) {
    watchListMessage = (
      <Link to="/search">
        {" "}
        <a className="add-film"> Click here to add a film! </a>{" "}
      </Link>
    );
  } else {
    trueWatchList = watchList?.map((list) => {
      return (
        <ul key={list.id}>
          {" "}
          <Link to={`/movies/${list.id}`} key={list.id}>
            {" "}
            <img src={list.image} width="300" height="400" className="filmsList"></img>{" "}
          </Link>
          <div>
            <p
              className="remove"
              onClick={() => {
                handleWatchClick({ watchId: list.id });
              }}
            >
              Remove
            </p>
          </div>
        </ul>
      );
    });
  }

  let trueFilmsList;
  let filmListMessage;
  if (filmList?.length === 0) {
    filmListMessage = (
      <Link to="/search">
        {" "}
        <a className="add-film"> Click here to add a film! </a>{" "}
      </Link>
    );
  } else {
    trueFilmsList = filmList?.map((list) => {
      return (
        <ul key={list.id}>
          <div>
            <Link to={`/movies/${list.id}`} key={list.id}>
              {" "}
              <img src={list.image} width="300" height="400" className="filmsList"></img>{" "}
            </Link>
            <div>
              <p
                className="remove"
                onClick={() => {
                  handleClick({ listId: list.id });
                }}
              >
                Remove
              </p>
            </div>
          </div>
        </ul>
      );
    });
  }

  let trueReviews;
  let reviewsMessage;
  if (user?.reviews.length === 0) {
    reviewsMessage = <h5> Submit a review to see it here! </h5>;
  } else {
    trueReviews = user?.reviews.map((review) => {
      return (
        <ul className="profile-reviews" key={review.movieId}>
          <Link to={`/movies/${review.movieId}`} key={review.movieId}>
            {" "}
            <h4> {review.movieTitle} </h4>{" "}
          </Link>
          <h4>
            {" "}
            {review.title} - {review.rating}/10 ⭐{" "}
          </h4>
          <h5> {review.body} </h5>
        </ul>
      );
    });
  }

  return (
    <div className="grid-wrapper">
      <div className="profile-page">
        <h3 className="user-tag">
          User:
          <br />
          {user?.email}
        </h3>
        <div className="list-container">
          <h1 className="profile-heading"> Your Films:</h1>
          <p> {filmListMessage} </p>
          <div className="column-grid"> {trueFilmsList} </div>
        </div>
      </div>
      <div className="list-container">
        <h1 className="profile-heading"> Your Watch list:</h1>
        <p> {watchListMessage} </p>
        <div className="column-grid"> {trueWatchList} </div>
      </div>
      <h1 className="reviews-profile"> Your Reviews: </h1>
      <div className="reviews-profile"> {reviewsMessage} </div>
      <div className="review-margins">
        <div className="movie-reviews"> {trueReviews} </div>
      </div>
    </div>
  );
};

export default Profile;
