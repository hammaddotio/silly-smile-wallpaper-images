import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './app/Pages/HomeScreen'

const App = () => {
  return (
    <Routes>
      <Route path='' Component={HomeScreen} />
    </Routes>
  )
}

export default App