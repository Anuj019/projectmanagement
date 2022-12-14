import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import './App.css'

// pages & componenet 
import Dashbord from "./pages/dashboard/Dashboard"
import Create from "./pages/create/Create"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Project from './pages/project/Project'
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import OnlineUsers from "./components/OnlineUsers"


function App() {
  const { user, authIsReady} = useAuthContext()
  return (
    <div className="App">
      { authIsReady && (
      <BrowserRouter>
      {user && <Sidebar/>}
      <div className="container">
     
        <Navbar/>
       <Switch>
     <Route  exact path="/">
      { !user && <Redirect to="/login"/>}
     {user &&  <Dashbord/>}
      </Route>
      <Route   path="/create">
      { !user && <Redirect to="/login"/>}
      {user && <Create/>}
      </Route>
      <Route  exact path="/projects/:id">
      { !user && <Redirect to="/login"/>}
      {user&& <Project/>}
      </Route>
      
      <Route  exact path="/login">
      { user && <Redirect to="/"/>}
      {!user && <Login/>}
      </Route>
      
      <Route  exact path="/signup">
      { user && <Redirect to="/"/>}
      {!user && <Signup/>}
      </Route>

        </Switch>

      </div>
      {user && <OnlineUsers/>}
      </BrowserRouter>
   )}
    </div>
  );
}

export default App
