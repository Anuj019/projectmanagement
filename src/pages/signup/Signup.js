import { useSignup } from "../../hooks/useSignup"
//styles

import "./Signup.css"

import React, { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ displayName, setDisplayName] = useState('')
  const [ thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const {signup, error, isPending }  = useSignup()
  
const handleSubmit =(e) => {
e.preventDefault()
signup(email, password, displayName, thumbnail)
}

const handleFileChange = (e) => {
setThumbnail(null)
 let selected = e.target.files[0]
 if(!selected){
 setThumbnailError('please select a file ')
 return
 }
 if(!selected.type.includes('image')){
  setThumbnailError("selected file must be image")
  return
 }
 if(selected.size > 100000){
  setThumbnailError('image file size must be less than 100kb')
  return
 }

 setThumbnailError(null)
setThumbnail(selected)
console.log('thumbnail updated')
}

  
  return (
    
    <form className="auth-form" onSubmit={handleSubmit}>
  <h2> Sign Up</h2>
  <label>
    <span> Email:</span>
    <input type="email"
     name="email"
      required
      onChange={(e) => setEmail(e.target.value) }
      value={email} />
  </label>
  <label>
    <span> Pasword:</span>
    <input type="password"
     name="password"
      required
      onChange={(e) => setPassword(e.target.value) }
      value={password} />
  </label>
  <label>
    <span>displayName:</span>
    <input type="text"
     name="displayName"
      required
      onChange={(e) => setDisplayName(e.target.value) }
      value={displayName} />
  </label>
  <label>
    <span> Profile Thumbnail:</span>
    <input type="file"
     name="thumbnail"
      required
      onChange={handleFileChange}
     />
     {thumbnailError && <div className="error"> {thumbnailError}</div>}
  </label>
 {!isPending && <button className="btn"> Sign up</button>}
 {isPending && <button className="btn" disabled> loading</button>}
 {error && <div className="error"> {error} </div>}
    </form>
  )
}

export default Signup