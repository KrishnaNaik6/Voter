import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login'
import Home from './components/Home/Home'
import './App.css'
import Time_table from './components/Time_table/Time_table'
import Attendence from './components/Attendence/Attendence'
import Marks from './components/Marks/Marks'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element ={ <Login />} />
          <Route path='login' element ={ <Login />} />
          <Route path='home' element={ <Home />} />
          <Route path='time-table' element={ <Time_table/> } />
          <Route path='attendence' element={ <Attendence/> } />
          <Route path='marks' element={ <Marks/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
