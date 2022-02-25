import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Homepage = ({ user }) => {

  let trueSignUp
  if (!user) {
    trueSignUp = <Link to="/users/new" className="button"> Sign Up </Link>
  } else {
    trueSignUp = ''
  }

return (
<div className='homepage-content'>
<h1 className="title-homepage"> MyIMDb </h1>
<p> Welcome! MyIMDb allows users to seamlessly search, track, and review thousands of films and television shows pulled from the IMDb API. To get started, sign up for a free account and check out our Top 250 page for inspiration!</p>
{/* <Link to="/users/new" className="button">
        Sign Up
      </Link> */}
      {trueSignUp}
</div>
)
}

export default Homepage 