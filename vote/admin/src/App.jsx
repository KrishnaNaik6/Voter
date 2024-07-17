import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Candidates from './components/Candidates'
import Register from './components/Register/register'
import Votes from './components/votes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element = { <Login /> } />
          <Route path='login' element = { <Login /> } />
          <Route path='register' element = { <Register/>}/>
          <Route path='dashboard' element = { <Dashboard /> } />
          <Route path='candidates' element = { <Candidates/> } />
          <Route path='votes' element = { <Votes/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
