import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getCurrentUser from "../services/getCurrentUser.js";

const Profile = () => {
  
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  let trueWatchList
  let watchListMessage
  if (user?.watchLists.length === 0) {
    watchListMessage = <Link to="/search"> <a className="add-film"> Click here to add a film! </a> </Link>
  } else {
    trueWatchList = user?.watchLists.map((list) => {
      return (
        <ul key={list.id}>
          {" "}
          <Link to={`/movies/${list.id}`} key={list.id}>
            {" "}
            <img src={list.image} width="300" height="400" className="filmsList"></img>{" "}
          </Link>
        </ul>
      );
    });
  }

  let trueFilmsList
  let filmListMessage
  if (user?.filmLists.length === 0) {
    filmListMessage = <Link to="/search"> <a className="add-film"> Click here to add a film! </a> </Link>
  } else {
    trueFilmsList = user?.filmLists.map((list) => {
      return (
        <ul key={list.id}>
          <Link to={`/movies/${list.id}`} key={list.id}>
            {" "}
            <img src={list.image} width="300" height="400" className="filmsList"></img>{" "}
          </Link>
        </ul>
      );
    });
  }

  let trueReviews
  let reviewsMessage
  if (user?.reviews.length === 0) {
    reviewsMessage = <h5> Submit a review to see it here! </h5>
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
        <h3 className="user-tag">User:<br/>{user?.email}</h3>
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
        <p className="reviews-profile">  {reviewsMessage} </p>
        <div className="movie-reviews"> {trueReviews} </div>
        </div>
   
  );
};

export default Profile;
