import React from 'react'

const Profile = ({ user }) => {
    console.log(user)
    return (
        <div className='profile-page'>
            <h3 className="user-tag">You're signed in as:</h3>
            <h4 className="user-email"> {user?.email} </h4>
            <h3> Your Films: </h3>
        </div>
    )
}

export default Profile