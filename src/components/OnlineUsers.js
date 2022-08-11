import "./OnlineUsers.css"
import {useCollection} from "../hooks/useCollection"

import React from 'react'
import Avatar from "./Avatar"

const OnlineUsers = () => {
    const { error, documents} = useCollection('users')
  return (
     
    <div className="user-list">
        <h2> All Users </h2>
        {error && <div className={error}>{error} </div>} 
        {documents && documents.map((user) => {
      return <div key={user.id} className="user-list-item"> 
      {console.log(user.online)}
     {user.online && <span className="online-user"></span>}
     <span>{user.displayName}</span>
     <Avatar src={user.photoURL}/>


      </div>
        })}
    </div>
  )
}

export default OnlineUsers