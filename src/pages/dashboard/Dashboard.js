import  { useState } from 'react'
import { useCollection } from "../../hooks/useCollection"
import { useAuthContext } from "../../hooks/useAuthContext"
//styles

import "./Dashboard.css"

import React from 'react'
import ProjectList from "../../components/ProjectList"
import ProjectFilter from "./ProjectFilter"

function Dashboard() {
const {user } = useAuthContext()
const { documents, error } = useCollection('projects')
const [ currentFilter, setCurrentFilter ] = useState('all')

const changeFilter = (newFilter) => {
  setCurrentFilter(newFilter)
}

const projects = documents ? documents.filter((document) => {
switch (currentFilter) {
case "all":
  return true
case "mine" : 
  let assingedToMe = false
  document.assignedUsersList.forEach((u) => {
  if (user.uid === u.id){
    assingedToMe = true
  }
  })
  return assingedToMe
case 'development':
case "design":
case "marketing":
case "sale": 
  console.log(document.category, currentFilter)
  return document.category === changeFilter
default: 
 return true
}
}) : null;



  return (
    <div>
     <h2 className="page-title">Dashboard </h2>
     {error && <p className="error">{error}</p> }
     {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
     {projects && <ProjectList projects={projects}/>}
    </div>
  )
}

export default Dashboard