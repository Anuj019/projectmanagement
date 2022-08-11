// style 
import "./ProjectList.css"

import Avatar from './Avatar'
import React from 'react'
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
  return (
    <div className="project-list">
        {projects.length === 0 && <p> No Projects yet !</p>}
        {projects.map((project) => {
 return <Link key={project.id} to={`/projects/${project.id}`}> 
 <h4> {project.name}</h4>
 <p> Due by {project.dueDate.toDate().toDateString()}</p>
 <div className='assigned-to'>
 <ul>
    {project.assignedUsersList.map(user => (
        <li key={user.photoURL}>
            <Avatar src={user.photoURL}/>
        </li>
    ))}
</ul>
 </div>
 
  </Link>
        })}
    </div>
  )
}

export default ProjectList