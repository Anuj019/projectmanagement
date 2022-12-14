import React from 'react'
import Avatar from "../../components/Avatar"
import "./Project.css"
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useHistory } from 'react-router-dom'

export const ProjectSummary = ({project}) => {
    const { deleteDocument} = useFirestore('projects')
    const { user } = useAuthContext()
    const history = useHistory()

const handleClick = (e) => {
   deleteDocument(project.id)
   history.push('/')

}


  return (
    <div>
        <div className="project-summary">
            <h2 className='page-title'>{project.title}</h2>
            <p className='due-date'>
                Project Due by : {project.dueDate.toDate().toDateString()}
            </p>
            <p className="details">
                {project.details}
            </p>
            <h4> Project is Assiend to:  </h4>
            <div className='assigned-users'>
            {project.assignedUsersList.map((user) =>  (
                <div key={user.id}>
                    <Avatar src={user.photoURL}/>
                </div>
                ))}
            </div>
           
        </div>
        {user.uid === project.createdBy.id && (
           <button className='btn' onClick={handleClick}> Mark as Complete </button>)}
    </div>
  )
}
