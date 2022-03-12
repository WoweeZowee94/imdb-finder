import React from "react";
import { Link, Redirect } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
// <Link to="/user-sessions/new">Sign In</Link>
const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];


  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">MyIMDb</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/profile">Profile</Link>
          </li>
          <li>
          <Link to="/search">Search</Link>
          </li>
          <li>
          <Link to="/top-250">Top 250</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
