//styles

import "./Create.css"
import Select from 'react-select'
import React, { useEffect, useState } from 'react'
import { useCollection } from "../../hooks/useCollection"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from "react-router-dom"

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]



const Create = () => {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const [ users, setUsers] = useState([])

const [ name, setName] = useState('')
const [ details, setDetails] = useState('')
const [ dueDate, setDueDate] = useState('')
const [ category, setCategory] = useState('')
const [ assignedUsers, setAssignedUsers] = useState([])
const [ formError, setFormError] = useState(null)
const { user} = useAuthContext()


useEffect(() => {
if(documents){
  const options = documents.map((user) => {
    return { value: user, label: user.displayName}
  })
  setUsers(options)
}
}, [documents])


const handleSubmit = async (e) => {
  e.preventDefault()
 setFormError(null)
 if(!category ) {
  setFormError('Please select a project caegory')
  return
 }
 if(assignedUsers.length < 1){
  setFormError('please assin the project to atleast 1 user')
  return 
 }

const createdBy = {
  displayName: user.displayName,
  photoURL : user.photoURL,
 id: user.uid
}

const assignedUsersList = assignedUsers.map((user) => {
  return {
    displayName: user.value.displayName,
    photoURL: user.value.photoURL,
    id: user.value.id
  }
})

const project = {
  name, 
  details,
  category: category.value,
  dueDate: timestamp.fromDate(new Date(dueDate)), 
  comment: [],
  createdBy: createdBy, 
  assignedUsersList
}

  await addDocument(project)
  if(!response.error){
  history.push('/')
  }
}


  return (
    <div className="create-form">
    <h1 className="page-title"> create new project </h1>
 <form onSubmit={handleSubmit}>
<label>
<span> roject Name </span>
<input
required
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value) }
   />
</label>
<label>
<span> roject details  </span>
<textarea
required
 type="text"
 value={details}
 onChange={(e) => setDetails(e.target.value) }>
 </textarea>
</label>
<label>
<span> Set Due Date </span>
<input
required
 type="date"
 value={dueDate}
 onChange={(e) => setDueDate(e.target.value) }
   />
</label>
<label>
  <span> Project Category: </span>
   <Select
   onChange={(option) => setCategory(option) }
   options={categories}
  />
</label>
<label>
  <span> Assined To  </span>
 <Select
 onChange={(option) => setAssignedUsers(option)}
 options={users}
 isMulti
 />
</label>
<button className="btn"> Add Project</button>
{formError && <p className="error">{formError}</p>}
 </form>
 


    </div>
  )
}

export default Create