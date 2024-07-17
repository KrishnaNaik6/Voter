import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login'
import Home from './components/Home/Home'
import './App.css'
import Register from './components/Register/register'
import Vote from './components/Vote/Vote'
import Forgot from './components/Forgot/login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element ={ <Login />} />
          <Route path='login' element ={ <Login />} />
          <Route path='register' element ={<Register/>} />
          <Route path='home' element={ <Home />} />
          <Route path='vote' element={ <Vote/> } />
          <Route path='forgot' element={ <Forgot/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
